#!/usr/bin/env python3
"""
Simple script to add test data directly via API calls
"""
import requests
import json

API_BASE = "http://127.0.0.1:8000/api/v1"

def create_sample_data():
    try:
        # Test API connection
        response = requests.get(f"{API_BASE}/health")
        if response.status_code != 200:
            print(f"API health check failed: {response.status_code}")
            # Try alternative test
            try:
                response = requests.get(f"{API_BASE}/inventory/")
                if response.status_code == 200:
                    print("API connection successful via inventory endpoint!")
                else:
                    print(f"API connection failed: {response.status_code}")
                    return
            except Exception as e:
                print(f"API connection error: {e}")
                return
        else:
            print("API connection successful!")
        
        # Create sample trading accounts
        trading_accounts = [
            {
                "borrower_id": 1,
                "sales": 1000000.0,
                "purchases": 800000.0,
                "total_assets": 1500000.0,
                "total_liabilities": 900000.0,
                "inventory": 300000.0,
                "period_start_date": "2025-01-01",
                "period_end_date": "2025-12-31"
            },
            {
                "borrower_id": 2,
                "sales": 750000.0,
                "purchases": 600000.0,
                "total_assets": 1200000.0,
                "total_liabilities": 700000.0,
                "inventory": 250000.0,
                "period_start_date": "2025-01-01",
                "period_end_date": "2025-12-31"
            }
        ]
        
        for account_data in trading_accounts:
            response = requests.post(
                f"{API_BASE}/trading_accounts/",
                json=account_data,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 201:
                print(f"Created trading account: {response.json()}")
            else:
                print(f"Failed to create trading account: {response.status_code} - {response.text}")
        
        # Create sample inventory items
        inventory_items = [
            {
                "item_name": "Product A",
                "quantity": 100,
                "unit_price": 50.0,
                "location": "Warehouse 1"
            },
            {
                "item_name": "Product B", 
                "quantity": 150,
                "unit_price": 75.0,
                "location": "Warehouse 2"
            }
        ]
        
        for item_data in inventory_items:
            response = requests.post(
                f"{API_BASE}/inventory/",
                json=item_data,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 201:
                print(f"Created inventory item: {response.json()}")
            else:
                print(f"Failed to create inventory item: {response.status_code} - {response.text}")
        
        # Create sample risk factors
        risk_factors = [
            {
                "name": "Current Ratio",
                "description": "Measures liquidity by comparing current assets to current liabilities",
                "factor_type": "financial",
                "formula": "total_assets / total_liabilities",
                "weight": 0.3,
                "rating_scale": {
                    "high_risk": {"min": 0, "max": 1.0, "score": 0.3},
                    "medium_risk": {"min": 1.0, "max": 2.0, "score": 0.6},
                    "low_risk": {"min": 2.0, "max": 999, "score": 1.0}
                }
            },
            {
                "name": "Inventory Turnover",
                "description": "Measures how efficiently inventory is managed",
                "factor_type": "financial",
                "formula": "sales / inventory",
                "weight": 0.2,
                "rating_scale": {
                    "high_risk": {"min": 0, "max": 3.0, "score": 0.3},
                    "medium_risk": {"min": 3.0, "max": 6.0, "score": 0.6},
                    "low_risk": {"min": 6.0, "max": 999, "score": 1.0}
                }
            }
        ]
        
        for risk_data in risk_factors:
            response = requests.post(
                f"{API_BASE}/risk_factors/",
                json=risk_data,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 201:
                print(f"Created risk factor: {response.json()}")
            else:
                print(f"Failed to create risk factor: {response.status_code} - {response.text}")
                
        print("\nSample data creation completed!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_sample_data()