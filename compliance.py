import json
import os
from typing import Dict, Any

class ComplianceEngine:
    def __init__(self):
        rules_path = os.path.join(os.path.dirname(__file__), "rules.json")
        try:
            with open(rules_path, "r") as f:
                self.rules = json.load(f)
        except Exception as e:
            print(f"Failed to load rules: {e}")
            self.rules = {
                "embargoed_countries": [],
                "restricted_goods": [],
                "value_thresholds": {"High": 100000, "Medium": 50000},
                "quantity_thresholds": {"High": 10000, "Medium": 5000}
            }

    def evaluate_shipment(self, data: Dict[str, Any]) -> Dict[str, Any]:
        issues = []
        risk_score = "Low"

        # 1. Check Embargoed Countries
        dest_country = data.get("destination_country", "")
        if dest_country in self.rules.get("embargoed_countries", []):
            issues.append({"flag": "Embargoed Destination", "description": f"Shipment to restricted country: {dest_country}"})
            risk_score = "High"

        # 2. Check Restricted Goods by HS Code
        hs_code = data.get("hs_code", "")
        for restricted in self.rules.get("restricted_goods", []):
            if hs_code.startswith(restricted["hs_prefix"]):
                issues.append({"flag": "Restricted Good", "description": f"Potential dual-use or restricted item: {restricted['description']}"})
                if risk_score != "High":
                    risk_score = "Medium"

        # 3. Value Thresholds
        value_usd = data.get("value_usd", 0)
        thresholds = self.rules.get("value_thresholds", {})
        if value_usd > thresholds.get("High", 50000):
            issues.append({"flag": "High Value", "description": f"Shipment value ${value_usd} requires secondary review."})
            if risk_score != "High":
                risk_score = "Medium"

        return {
            "risk_score": risk_score,
            "issues": issues
        }

compliance_engine = ComplianceEngine()
