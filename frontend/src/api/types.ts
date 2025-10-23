// API Types that match our backend models
export interface Borrower {
    id: number;
    name: string;
}

export interface InventoryItem {
    id: number;
    item_name: string;
    quantity: number;
    unit_price: number;
    location: string;
    total_value: number;
    created_at: string;
    updated_at: string;
}

export interface TradingAccount {
    id: number;
    borrower_id: number;
    borrower?: Borrower;
    sales: number;
    purchases: number;
    total_assets: number;
    total_liabilities: number;
    inventory: number;
    period_start_date: string;
    period_end_date: string;
    created_at: string;
    updated_at: string;
}

export interface RiskFactor {
    id: number;
    name: string;
    description?: string;
    factor_type: 'financial' | 'non_financial';
    formula?: string;
    weight: number;
    rating_scale: any; // JSON field
}

export interface Scorecard {
    id: number;
    borrower_id: number;
    trading_account_id: number;
    risk_factor_id: number;
    score: number;
    created_at: string;
}

// Form interfaces for creating new records
export interface CreateTradingAccountForm {
    borrower_id: number;
    sales: number;
    purchases: number;
    total_assets: number;
    total_liabilities: number;
    inventory: number;
    period_start_date: string;
    period_end_date: string;
}

export interface CreateRiskFactorForm {
    name: string;
    description: string;
    factor_type: 'financial' | 'non_financial';
    formula: string;
    weight: number;
    rating_scale: any;
}

export interface CreateInventoryItemForm {
    item_name: string;
    quantity: number;
    unit_price: number;
    location?: string;
}
