"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2025-09-10

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create borrowers table
    op.create_table('borrowers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create trading_accounts table
    op.create_table('trading_accounts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('borrower_id', sa.Integer(), nullable=False),
        sa.Column('sales', sa.Float(), nullable=False),
        sa.Column('purchases', sa.Float(), nullable=False),
        sa.Column('total_assets', sa.Float(), nullable=False),
        sa.Column('total_liabilities', sa.Float(), nullable=False),
        sa.Column('inventory', sa.Float(), nullable=False),
        sa.Column('period_start_date', sa.Date(), nullable=False),
        sa.Column('period_end_date', sa.Date(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['borrower_id'], ['borrowers.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create inventory_items table
    op.create_table('inventory_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('item_name', sa.String(), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('unit_price', sa.Float(), nullable=False),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Create risk_factors table
    op.create_table('risk_factors',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('factor_type', sa.String(), nullable=False),
        sa.Column('formula', sa.String(), nullable=True),
        sa.Column('weight', sa.Float(), nullable=False),
        sa.Column('rating_scale', sa.JSON(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Create scorecards table
    op.create_table('scorecards',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('borrower_id', sa.Integer(), nullable=False),
        sa.Column('final_score', sa.Float(), nullable=False),
        sa.Column('score_breakdown', sa.JSON(), nullable=True),
        sa.Column('risk_classification', sa.String(), nullable=True),
        sa.Column('generated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['borrower_id'], ['borrowers.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('scorecards')
    op.drop_table('risk_factors')
    op.drop_table('inventory_items')
    op.drop_table('trading_accounts')
    op.drop_table('borrowers')
