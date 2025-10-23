# Financial Scorecard System

A comprehensive FastAPI-based system for managing financial scorecards, inventory tracking, trading accounts, and risk assessment. Built with Python, FastAPI, SQLAlchemy ORM, and PostgreSQL.

## Features

- **Inventory Management**: Track items, quantities, and valuations
- **Trading Accounts**: Monitor financial metrics and performance
- **Risk Assessment**: Configure and calculate risk factors
- **Scorecard Generation**: Automated financial health scoring
- **REST API**: Complete API coverage for all features

## Project Structure

```
scorecard/
├── alembic/                 # Database migrations
├── api/                     # API endpoints
│   └── endpoints/          
│       ├── inventory.py     # Inventory management
│       ├── risk_factors.py  # Risk factors
│       └── trading_accounts.py # Trading accounts
├── models/                  # Database models
│   ├── database.py         # Database configuration
│   ├── entities.py         # Core entities
│   ├── inventory.py        # Inventory models
│   ├── risk_factors.py     # Risk factor models
│   ├── scorecard.py        # Scorecard models
│   └── trading_account.py  # Trading account models
├── services/               # Business logic
│   ├── calculation_service.py # Scorecard calculations
│   └── core.py            # Core services
└── scripts/               # Utility scripts
    └── create_sample_data.py # Sample data generation
```

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 15.x
- pip (Python package manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/scorecard.git
   cd scorecard
   ```

2. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure the database:
   - Create a PostgreSQL database
   - Update database connection in `models/database.py`
   - Run migrations:
     ```bash
     alembic upgrade head
     ```

4. Create sample data (optional):
   ```bash
   python scripts/create_sample_data.py
   ```

5. Start the application:
   ```bash
   uvicorn main:app --reload
   ```

## API Documentation

The API documentation is available at `http://localhost:8000/docs` when running the application.

### Key Endpoints

#### Inventory Management
- `GET /inventory/`: List all inventory items
- `POST /inventory/`: Create new inventory item
- `GET /inventory/{item_id}`: Get specific item
- `PUT /inventory/{item_id}`: Update item
- `DELETE /inventory/{item_id}`: Delete item

#### Trading Accounts
- `GET /trading_accounts/`: List all accounts
- `POST /trading_accounts/`: Create new account
- `GET /trading_accounts/{account_id}`: Get specific account
- `PUT /trading_accounts/{account_id}`: Update account
- `DELETE /trading_accounts/{account_id}`: Delete account
- `POST /trading_accounts/upload`: Bulk upload accounts via Excel

#### Risk Factors
- `GET /risk_factors/`: List all risk factors
- `POST /risk_factors/`: Create new risk factor
- `GET /risk_factors/{factor_id}`: Get specific factor
- `PUT /risk_factors/{factor_id}`: Update factor
- `DELETE /risk_factors/{factor_id}`: Delete factor

## Data Models

### Borrower
- `id`: Integer (Primary Key)
- `name`: String
- Relationship: One-to-Many with TradingAccount

### TradingAccount
- `id`: Integer (Primary Key)
- `borrower_id`: Integer (Foreign Key)
- `sales`: Float
- `purchases`: Float
- `total_assets`: Float
- `total_liabilities`: Float
- `inventory`: Float
- `period_start_date`: Date
- `period_end_date`: Date

### RiskFactor
- `id`: Integer (Primary Key)
- `name`: String
- `description`: String
- `factor_type`: String ('financial' or 'non_financial')
- `formula`: String
- `weight`: Float
- `rating_scale`: JSON

### Scorecard
- `id`: Integer (Primary Key)
- `borrower_id`: Integer (Foreign Key)
- `trading_account_id`: Integer (Foreign Key)
- `risk_factor_id`: Integer (Foreign Key)
- `score`: Float
- `created_at`: DateTime

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
