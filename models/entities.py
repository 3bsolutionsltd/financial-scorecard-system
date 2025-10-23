from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, Date
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Borrower(Base):
    __tablename__ = 'borrowers'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    trading_accounts = relationship('TradingAccount', back_populates='borrower')

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

class InventoryItem(Base):
    __tablename__ = 'inventory_items'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    quantity = Column(Integer, default=0)
    value = Column(Float, default=0.0)

class RiskFactor(Base):
    __tablename__ = 'risk_factors'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    score = Column(Float)

class Scorecard(Base):
    __tablename__ = 'scorecards'
    id = Column(Integer, primary_key=True)
    borrower_id = Column(Integer, ForeignKey('borrowers.id'))
    trading_account_id = Column(Integer, ForeignKey('trading_accounts.id'))
    risk_factor_id = Column(Integer, ForeignKey('risk_factors.id'))
    score = Column(Float)
    created_at = Column(DateTime)
    borrower = relationship('Borrower')
    trading_account = relationship('TradingAccount')
    risk_factor = relationship('RiskFactor')
