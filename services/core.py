from models.database import SessionLocal
from models.entities import InventoryItem, Borrower, TradingAccount, RiskFactor, Scorecard
from sqlalchemy.orm import Session
from typing import List, Optional

# Inventory Services
class InventoryService:
    @staticmethod
    def get_items(db: Session) -> List[InventoryItem]:
        return db.query(InventoryItem).all()

    @staticmethod
    def add_item(db: Session, name: str, quantity: int, value: float) -> InventoryItem:
        item = InventoryItem(name=name, quantity=quantity, value=value)
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

# Borrower Services
class BorrowerService:
    @staticmethod
    def get_borrowers(db: Session) -> List[Borrower]:
        return db.query(Borrower).all()

    @staticmethod
    def add_borrower(db: Session, name: str) -> Borrower:
        borrower = Borrower(name=name)
        db.add(borrower)
        db.commit()
        db.refresh(borrower)
        return borrower

# Trading Account Services
class TradingAccountService:
    @staticmethod
    def get_accounts(db: Session) -> List[TradingAccount]:
        return db.query(TradingAccount).all()

    @staticmethod
    def add_account(db: Session, account_number: str, borrower_id: int) -> TradingAccount:
        account = TradingAccount(account_number=account_number, borrower_id=borrower_id)
        db.add(account)
        db.commit()
        db.refresh(account)
        return account

# Risk Factor Services
class RiskFactorService:
    @staticmethod
    def get_risk_factors(db: Session) -> List[RiskFactor]:
        return db.query(RiskFactor).all()

    @staticmethod
    def add_risk_factor(db: Session, name: str, description: str, score: float) -> RiskFactor:
        risk = RiskFactor(name=name, description=description, score=score)
        db.add(risk)
        db.commit()
        db.refresh(risk)
        return risk

# Scorecard Services
class ScorecardService:
    @staticmethod
    def get_scorecards(db: Session) -> List[Scorecard]:
        return db.query(Scorecard).all()

    @staticmethod
    def add_scorecard(db: Session, borrower_id: int, trading_account_id: int, risk_factor_id: int, score: float, created_at) -> Scorecard:
        scorecard = Scorecard(borrower_id=borrower_id, trading_account_id=trading_account_id, risk_factor_id=risk_factor_id, score=score, created_at=created_at)
        db.add(scorecard)
        db.commit()
        db.refresh(scorecard)
        return scorecard
