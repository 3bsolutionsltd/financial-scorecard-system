from sqlalchemy import Column, Integer, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class TradingAccount(Base):
    __tablename__ = 'trading_accounts'

    id = Column(Integer, primary_key=True)
    borrower_id = Column(Integer, ForeignKey('borrowers.id'), nullable=False)
    sales = Column(Float, nullable=False)
    purchases = Column(Float, nullable=False)
    total_assets = Column(Float, nullable=False)
    total_liabilities = Column(Float, nullable=False)
    inventory = Column(Float, nullable=False)
    period_start_date = Column(Date, nullable=False)
    period_end_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    borrower = relationship('Borrower', back_populates='trading_accounts')
