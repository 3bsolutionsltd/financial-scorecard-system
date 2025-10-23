from models.database import SessionLocal
from models.trading_account import TradingAccount
from models.risk_factors import RiskFactor
from models.entities import Scorecard
from sqlalchemy.orm import Session
import operator
import re
from typing import Any, Dict
from datetime import datetime

class CalculationService:
    def __init__(self, db: Session):
        self.db = db

    def calculate_ratio(self, trading_account_data: Dict[str, Any], formula: str) -> float:
        # Only allow safe variable names and operators
        allowed_names = set(trading_account_data.keys())
        code = formula
        # Replace variable names in formula with their values
        for name in allowed_names:
            code = re.sub(rf'\b{name}\b', str(trading_account_data[name]), code)
        # Only allow safe characters
        if not re.match(r'^[\d\s\+\-\*/\.\(\)]+$', code):
            raise ValueError("Unsafe formula detected")
        try:
            return eval(code, {"__builtins__": None}, {})
        except Exception:
            return 0.0

    def get_rating_for_ratio(self, ratio_name: str, value: float) -> float:
        risk_factor = self.db.query(RiskFactor).filter(RiskFactor.name == ratio_name).first()
        if not risk_factor or not risk_factor.rating_scale:
            return 0.0
        for rating, bounds in risk_factor.rating_scale.items():
            if bounds['min'] <= value <= bounds['max']:
                return bounds.get('score', 0.0)
        return 0.0

    def calculate_final_score(self, borrower_id: int) -> float:
        accounts = self.db.query(TradingAccount).filter(TradingAccount.borrower_id == borrower_id).all()
        risk_factors = self.db.query(RiskFactor).all()
        final_score = 0.0
        for account in accounts:
            account_data = account.__dict__
            for risk in risk_factors:
                if risk.factor_type == 'financial' and risk.formula:
                    ratio = self.calculate_ratio(account_data, risk.formula)
                    rating_score = self.get_rating_for_ratio(risk.name, ratio)
                    final_score += rating_score * risk.weight
        # Dummy non-financial factors (replace with actual table if available)
        non_financial_factors = [
            {'name': 'Management Quality', 'weight': 0.1, 'score': 0.8},
            {'name': 'Market Position', 'weight': 0.1, 'score': 0.7}
        ]
        for nf in non_financial_factors:
            final_score += nf['score'] * nf['weight']
        # Save to Scorecard
        scorecard = Scorecard(
            borrower_id=borrower_id,
            score=final_score,
            created_at=datetime.utcnow()
        )
        self.db.add(scorecard)
        self.db.commit()
        self.db.refresh(scorecard)
        return final_score
