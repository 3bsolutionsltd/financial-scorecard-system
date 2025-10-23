from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from models.database import SessionLocal
from models.entities import Borrower

router = APIRouter(prefix="/borrowers", tags=["Borrowers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class BorrowerCreate(BaseModel):
    name: str

class BorrowerResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

@router.post("/", response_model=BorrowerResponse)
def create_borrower(borrower: BorrowerCreate, db: Session = Depends(get_db)):
    db_borrower = Borrower(**borrower.dict())
    db.add(db_borrower)
    db.commit()
    db.refresh(db_borrower)
    return db_borrower

@router.get("/", response_model=List[BorrowerResponse])
def list_borrowers(db: Session = Depends(get_db)):
    borrowers = db.query(Borrower).all()
    return borrowers

@router.get("/{borrower_id}", response_model=BorrowerResponse)
def get_borrower(borrower_id: int, db: Session = Depends(get_db)):
    db_borrower = db.query(Borrower).filter(Borrower.id == borrower_id).first()
    if not db_borrower:
        raise HTTPException(status_code=404, detail="Borrower not found")
    return db_borrower

@router.put("/{borrower_id}", response_model=BorrowerResponse)
def update_borrower(borrower_id: int, borrower: BorrowerCreate, db: Session = Depends(get_db)):
    db_borrower = db.query(Borrower).filter(Borrower.id == borrower_id).first()
    if not db_borrower:
        raise HTTPException(status_code=404, detail="Borrower not found")
    db_borrower.name = borrower.name
    db.commit()
    db.refresh(db_borrower)
    return db_borrower

@router.delete("/{borrower_id}")
def delete_borrower(borrower_id: int, db: Session = Depends(get_db)):
    db_borrower = db.query(Borrower).filter(Borrower.id == borrower_id).first()
    if not db_borrower:
        raise HTTPException(status_code=404, detail="Borrower not found")
    db.delete(db_borrower)
    db.commit()
    return {"detail": "Borrower deleted"}