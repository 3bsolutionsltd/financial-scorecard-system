import { Borrower, TradingAccount, RiskFactor, Scorecard, CreateTradingAccountForm } from './types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// API client for making requests to our backend
export class ApiClient {
    private static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return response.json();
    }

    // Borrowers
    static async getBorrowers() {
        return this.request<Borrower[]>('/borrowers/');
    }

    static async createBorrower(data: { name: string }) {
        return this.request<Borrower>('/borrowers/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static async updateBorrower(id: number, data: { name: string }) {
        return this.request<Borrower>(`/borrowers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    static async deleteBorrower(id: number) {
        return this.request<void>(`/borrowers/${id}`, {
            method: 'DELETE',
        });
    }

    // Inventory
    static async getInventory() {
        return this.request<any[]>('/inventory/');
    }

    static async createInventoryItem(data: any) {
        return this.request<any>('/inventory/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Trading Accounts
    static async getTradingAccounts() {
        return this.request<TradingAccount[]>('/trading_accounts/');
    }

    static async createTradingAccount(data: CreateTradingAccountForm) {
        return this.request<TradingAccount>('/trading_accounts/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static async updateTradingAccount(id: number, data: Partial<TradingAccount>) {
        return this.request<TradingAccount>(`/trading_accounts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    static async deleteTradingAccount(id: number) {
        return this.request<void>(`/trading_accounts/${id}`, {
            method: 'DELETE',
        });
    }

    // Risk Factors
    static async getRiskFactors() {
        return this.request<RiskFactor[]>('/risk_factors/');
    }

    static async createRiskFactor(data: Omit<RiskFactor, 'id'>) {
        return this.request<RiskFactor>('/risk_factors/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static async updateRiskFactor(id: number, data: Partial<RiskFactor>) {
        return this.request<RiskFactor>(`/risk_factors/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    static async deleteRiskFactor(id: number) {
        return this.request<void>(`/risk_factors/${id}`, {
            method: 'DELETE',
        });
    }

    // Scorecards
    static async getScorecards() {
        return this.request<Scorecard[]>('/scorecards/');
    }

    static async calculateScorecard(data: { borrower_id: number; trading_account_id: number }) {
        return this.request<Scorecard>('/scorecards/calculate', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}
