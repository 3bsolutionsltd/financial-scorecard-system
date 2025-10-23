import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.database import SessionLocal
from models.entities import Borrower
from models.trading_account import TradingAccount
from models.inventory import InventoryItem
from models.risk_factors import RiskFactor
from datetime import date, datetime

def create_sample_data():
    db = SessionLocal()
    try:
        # Create sample borrowers
        borrowers = [
            Borrower(name="ABC Company"),
            Borrower(name="XYZ Industries")
        ]
        db.add_all(borrowers)
        db.commit()

        # Create sample trading accounts
        trading_accounts = [
            TradingAccount(
                borrower_id=1,
                sales=1000000.0,
                purchases=800000.0,
                total_assets=1500000.0,
                total_liabilities=900000.0,
                inventory=300000.0,
                period_start_date=date(2025, 1, 1),
                period_end_date=date(2025, 12, 31)
            ),
            TradingAccount(
                borrower_id=2,
                sales=750000.0,
                purchases=600000.0,
                total_assets=1200000.0,
                total_liabilities=700000.0,
                inventory=250000.0,
                period_start_date=date(2025, 1, 1),
                period_end_date=date(2025, 12, 31)
            )
        ]
        db.add_all(trading_accounts)

        # Create sample inventory items
        inventory_items = [
            InventoryItem(
                item_name="Product A",
                quantity=100,
                unit_price=50.0,
                location="Warehouse 1"
            ),
            InventoryItem(
                item_name="Product B",
                quantity=150,
                unit_price=75.0,
                location="Warehouse 2"
            )
        ]
        db.add_all(inventory_items)

        # Create sample risk factors
        risk_factors = [
            RiskFactor(
                name="Current Ratio",
                factor_type="financial",
                formula="total_assets / total_liabilities",
                weight=0.3,
                rating_scale={
                    "high_risk": {"min": 0, "max": 1.0, "score": 0.3},
                    "medium_risk": {"min": 1.0, "max": 2.0, "score": 0.6},
                    "low_risk": {"min": 2.0, "max": 999, "score": 1.0}
                }
            ),
            RiskFactor(
                name="Inventory Turnover",
                factor_type="financial",
                formula="sales / inventory",
                weight=0.2,
                rating_scale={
                    "high_risk": {"min": 0, "max": 3.0, "score": 0.3},
                    "medium_risk": {"min": 3.0, "max": 6.0, "score": 0.6},
                    "low_risk": {"min": 6.0, "max": 999, "score": 1.0}
                }
            )
        ]
        db.add_all(risk_factors)
        db.commit()
        print("Sample data created successfully!")

    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
