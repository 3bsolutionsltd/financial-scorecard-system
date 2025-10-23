from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.types import JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Scorecard(Base):
    __tablename__ = 'scorecards'

    id = Column(Integer, primary_key=True)
    borrower_id = Column(Integer, ForeignKey('borrowers.id'), nullable=False)
    final_score = Column(Float, nullable=False)
    score_breakdown = Column(JSON, nullable=True)
    risk_classification = Column(String, nullable=True)
    generated_at = Column(DateTime, default=func.now())
