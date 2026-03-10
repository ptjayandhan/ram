from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models import pydantic_models

router = APIRouter()

@router.post("/upload", response_model=pydantic_models.ShipmentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Mock endpoint for Document Parsing, Classification, and Validation
    """
    # 1. Document Parsing Simulation
    content = await file.read()
    filename = file.filename
    
    # Fake extracted data
    extracted_data = {
        "id": 1,
        "product_description": f"Extracted from {filename}: Wireless Bluetooth Headphones with noise cancellation.",
        "quantity": 500,
        "weight_kg": 150.5,
        "value_usd": 25000.00,
        "incoterms": "FOB",
        "origin_country": "CN",
        "destination_country": "US",
    }
    
    # 2. HS Code Classification Simulation (calls predict.py in production)
    hs_prediction = {
        "predicted_hs_code": "8518.30",
        "confidence_score": 92.5,
        "top_3_alternatives": [
            {"code": "8518.29", "confidence": 4.1},
            {"code": "8517.62", "confidence": 2.2},
            {"code": "8518.90", "confidence": 1.2}
        ],
        "reasoning": "Product description explicitly mentions 'Wireless Bluetooth Headphones' which falls under 'Headphones and earphones' (8518.30)."
    }
    
    # 3. Compliance engine Simulation
    compliance_result = {
        "risk_score": "Low",
        "issues": [
            {"flag": "Value Threshold", "description": "High value shipment, requires additional insurance confirmation."}
        ]
    }
    
    extracted_data["hs_prediction"] = hs_prediction
    extracted_data["compliance"] = compliance_result
    
    return extracted_data

@router.post("/feedback")
async def submit_feedback(data: dict, db: Session = Depends(get_db)):
    """ Endpoint to store HS code corrections for model retraining """
    return {"message": "Feedback stored successfully."}
