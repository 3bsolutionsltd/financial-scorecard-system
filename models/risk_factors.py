from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.types import JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class RiskFactor(Base):
    __tablename__ = 'risk_factors'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    factor_type = Column(String, nullable=False)
    formula = Column(String, nullable=True)
    weight = Column(Float, nullable=False)
    rating_scale = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
