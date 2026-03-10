from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Shipment(Base):
    """Tracks Customs Submissions for audit logs"""
    __tablename__ = "shipments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_description = Column(Text)
    hs_code = Column(String)
    confidence_score = Column(Float)
    quantity = Column(Integer)
    weight_kg = Column(Float)
    value_usd = Column(Float)
    incoterms = Column(String)
    origin_country = Column(String)
    destination_country = Column(String)
    risk_score = Column(String) # Low, Medium, High
    compliance_issues = Column(JSON) # List of flags
    status = Column(String, default="Pending") # Pending, Approved, Rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Feedback(Base):
    """Stores user corrections to improve the ML model"""
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    predicted_hs_code = Column(String)
    actual_hs_code = Column(String)
    product_description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
