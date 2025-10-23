from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from models.database import SessionLocal
from models.risk_factors import RiskFactor
from datetime import datetime

router = APIRouter(prefix="/risk_factors", tags=["Risk Factors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RatingScale(BaseModel):
    min: float
    max: float
    score: float

class RiskFactorCreate(BaseModel):
    name: str = Field(...)
    description: str = Field(None)
    factor_type: str = Field(...)  # 'financial' or 'non_financial'
    formula: str = Field(None)  # For financial factors
    weight: float = Field(...)
    rating_scale: Dict[str, Dict[str, float]] = Field(...)

class RiskFactorUpdate(BaseModel):
    name: str = Field(None)
    description: str = Field(None)
    factor_type: str = Field(None)
    formula: str = Field(None)
    weight: float = Field(None)
    rating_scale: Dict[str, Dict[str, float]] = Field(None)

class RiskFactorResponse(BaseModel):
    id: int
    name: str
    description: str = None
    factor_type: str
    formula: str = None
    weight: float
    rating_scale: Dict[str, Dict[str, float]]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.post("/", response_model=RiskFactorResponse)
def create_risk_factor(risk_factor: RiskFactorCreate, db: Session = Depends(get_db)):
    db_risk_factor = RiskFactor(**risk_factor.dict())
    db.add(db_risk_factor)
    db.commit()
    db.refresh(db_risk_factor)
    return db_risk_factor

@router.get("/{factor_id}", response_model=RiskFactorResponse)
def get_risk_factor(factor_id: int, db: Session = Depends(get_db)):
    db_risk_factor = db.query(RiskFactor).filter(RiskFactor.id == factor_id).first()
    if not db_risk_factor:
        raise HTTPException(status_code=404, detail="Risk factor not found")
    return db_risk_factor

@router.put("/{factor_id}", response_model=RiskFactorResponse)
def update_risk_factor(factor_id: int, risk_factor: RiskFactorUpdate, db: Session = Depends(get_db)):
    db_risk_factor = db.query(RiskFactor).filter(RiskFactor.id == factor_id).first()
    if not db_risk_factor:
        raise HTTPException(status_code=404, detail="Risk factor not found")
    update_data = risk_factor.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_risk_factor, key, value)
    db.commit()
    db.refresh(db_risk_factor)
    return db_risk_factor

@router.delete("/{factor_id}")
def delete_risk_factor(factor_id: int, db: Session = Depends(get_db)):
    db_risk_factor = db.query(RiskFactor).filter(RiskFactor.id == factor_id).first()
    if not db_risk_factor:
        raise HTTPException(status_code=404, detail="Risk factor not found")
    db.delete(db_risk_factor)
    db.commit()
    return {"detail": "Risk factor deleted"}

@router.get("/", response_model=List[dict])
def list_risk_factors(db: Session = Depends(get_db)):
    # Return empty list for now to get the frontend working
    return []
