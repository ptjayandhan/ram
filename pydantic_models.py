from pydantic import BaseModel
from typing import Optional, List, Any

class HSCodePredictionResult(BaseModel):
    predicted_hs_code: str
    confidence_score: float
    top_3_alternatives: List[dict]
    reasoning: str

class ComplianceIssue(BaseModel):
    flag: str
    description: str

class ComplianceResult(BaseModel):
    risk_score: str
    issues: List[ComplianceIssue]

class ShipmentUploadResponse(BaseModel):
    id: int
    product_description: str
    quantity: int
    weight_kg: float
    value_usd: float
    incoterms: str
    origin_country: str
    destination_country: str
    hs_prediction: Optional[HSCodePredictionResult]
    compliance: Optional[ComplianceResult]
