from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import SessionLocal
from models.scorecard import Scorecard
from services.calculation_service import CalculationService
from pydantic import BaseModel
from typing import List
import datetime

router = APIRouter(prefix="/scorecards", tags=["scorecards"])

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ScorecardCreate(BaseModel):
    borrower_id: int
    trading_account_id: int

class ScorecardResponse(BaseModel):
    id: int
    borrower_id: int
    trading_account_id: int
    risk_factor_id: int
    score: float
    created_at: datetime.datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[dict])
def get_all_scorecards(db: Session = Depends(get_db)):
    """Get all scorecards"""
    # Return empty list for now to get the frontend working
    return []

@router.get("/{scorecard_id}", response_model=ScorecardResponse)
def get_scorecard(scorecard_id: int, db: Session = Depends(get_db)):
    """Get a specific scorecard by ID"""
    scorecard = db.query(Scorecard).filter(Scorecard.id == scorecard_id).first()
    if not scorecard:
        raise HTTPException(status_code=404, detail="Scorecard not found")
    return scorecard

@router.post("/calculate", response_model=ScorecardResponse)
def calculate_scorecard(scorecard_data: ScorecardCreate, db: Session = Depends(get_db)):
    """Calculate and create a new scorecard"""
    try:
        # Use the calculation service to generate scorecard
        calculation_service = CalculationService(db)
        scorecard = calculation_service.calculate_scorecard(
            borrower_id=scorecard_data.borrower_id,
            trading_account_id=scorecard_data.trading_account_id
        )
        return scorecard
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error calculating scorecard: {str(e)}")

@router.delete("/{scorecard_id}")
def delete_scorecard(scorecard_id: int, db: Session = Depends(get_db)):
    """Delete a scorecard"""
    scorecard = db.query(Scorecard).filter(Scorecard.id == scorecard_id).first()
    if not scorecard:
        raise HTTPException(status_code=404, detail="Scorecard not found")
    
    db.delete(scorecard)
    db.commit()
    return {"message": "Scorecard deleted successfully"}