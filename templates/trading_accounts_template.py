import pandas as pd
from datetime import date

# Create sample data
data = {
    'borrower_id': [1, 2],
    'sales': [1500000.0, 2000000.0],
    'purchases': [1200000.0, 1600000.0],
    'total_assets': [2000000.0, 2500000.0],
    'total_liabilities': [1500000.0, 1800000.0],
    'inventory': [400000.0, 500000.0],
    'period_start_date': [date(2025, 1, 1), date(2025, 1, 1)],
    'period_end_date': [date(2025, 12, 31), date(2025, 12, 31)]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to Excel
df.to_excel('trading_accounts_template.xlsx', index=False)
print("Template created successfully!")
