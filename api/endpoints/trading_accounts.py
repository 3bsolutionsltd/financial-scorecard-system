from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel, Field
from models.database import SessionLocal
from models.entities import TradingAccount, Borrower
import pandas as pd
from io import BytesIO
from datetime import datetime, date

router = APIRouter(prefix="/trading_accounts", tags=["Trading Accounts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class TradingAccountCreate(BaseModel):
    borrower_id: int
    sales: float
    purchases: float
    total_assets: float
    total_liabilities: float
    inventory: float
    period_start_date: date
    period_end_date: date

class TradingAccountUpdate(BaseModel):
    sales: float = None
    purchases: float = None
    total_assets: float = None
    total_liabilities: float = None
    inventory: float = None
    period_start_date: date = None
    period_end_date: date = None

class BorrowerInfo(BaseModel):
    id: int
    name: str

class TradingAccountResponse(BaseModel):
    id: int
    borrower_id: int
    borrower: Optional[BorrowerInfo] = None
    sales: float
    purchases: float
    total_assets: float
    total_liabilities: float
    inventory: float
    period_start_date: date
    period_end_date: date
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.post("/", response_model=TradingAccountResponse)
def create_trading_account(account: TradingAccountCreate, db: Session = Depends(get_db)):
    db_account = TradingAccount(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@router.get("/", response_model=List[TradingAccountResponse])
def list_trading_accounts(db: Session = Depends(get_db)):
    accounts = db.query(TradingAccount).options(joinedload(TradingAccount.borrower)).all()
    return accounts

@router.get("/{account_id}", response_model=TradingAccountResponse)
def get_trading_account(account_id: int, db: Session = Depends(get_db)):
    db_account = db.query(TradingAccount).options(joinedload(TradingAccount.borrower)).filter(TradingAccount.id == account_id).first()
    if not db_account:
        raise HTTPException(status_code=404, detail="Trading account not found")
    return db_account

@router.put("/{account_id}", response_model=TradingAccountResponse)
def update_trading_account(account_id: int, account: TradingAccountUpdate, db: Session = Depends(get_db)):
    db_account = db.query(TradingAccount).filter(TradingAccount.id == account_id).first()
    if not db_account:
        raise HTTPException(status_code=404, detail="Trading account not found")
    update_data = account.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_account, key, value)
    db.commit()
    db.refresh(db_account)
    return db_account

@router.delete("/{account_id}")
def delete_trading_account(account_id: int, db: Session = Depends(get_db)):
    db_account = db.query(TradingAccount).filter(TradingAccount.id == account_id).first()
    if not db_account:
        raise HTTPException(status_code=404, detail="Trading account not found")
    db.delete(db_account)
    db.commit()
    return {"detail": "Trading account deleted"}

@router.post("/upload")
def upload_trading_accounts(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an Excel file.")
    try:
        contents = file.file.read()
        df = pd.read_excel(BytesIO(contents))
        required_columns = [
            'borrower_id', 'sales', 'purchases', 'total_assets', 'total_liabilities',
            'inventory', 'period_start_date', 'period_end_date'
        ]
        if not all(col in df.columns for col in required_columns):
            raise HTTPException(status_code=400, detail="Missing required columns in Excel file.")
        created_accounts = []
        for _, row in df.iterrows():
            account = TradingAccount(
                borrower_id=int(row['borrower_id']),
                sales=float(row['sales']),
                purchases=float(row['purchases']),
                total_assets=float(row['total_assets']),
                total_liabilities=float(row['total_liabilities']),
                inventory=float(row['inventory']),
                period_start_date=pd.to_datetime(row['period_start_date']).date(),
                period_end_date=pd.to_datetime(row['period_end_date']).date()
            )
            db.add(account)
            created_accounts.append(account)
        db.commit()
        return {"detail": f"Uploaded {len(created_accounts)} trading accounts."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
