'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '../api/client';
import { TradingAccount, CreateTradingAccountForm, Borrower } from '../api/types';
import BorrowerSearchDropdown from './BorrowerSearchDropdown';
import ProtectedAction from './ProtectedAction';

interface Props {
    accounts: TradingAccount[];
    onRefresh: () => void;
}

export default function TradingAccountsTab({ accounts, onRefresh }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [borrowers, setBorrowers] = useState<Borrower[]>([]);
    const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
    const [formData, setFormData] = useState<CreateTradingAccountForm>({
        borrower_id: 0,
        sales: 0,
        purchases: 0,
        total_assets: 0,
        total_liabilities: 0,
        inventory: 0,
        period_start_date: '',
        period_end_date: ''
    });

    // Load borrowers on component mount
    useEffect(() => {
        loadBorrowers();
    }, []);

    const loadBorrowers = async () => {
        try {
            const borrowersData = await ApiClient.getBorrowers();
            setBorrowers(borrowersData);
        } catch (error) {
            console.error('Error loading borrowers:', error);
        }
    };

    const handleBorrowerSelect = (borrower: Borrower | null) => {
        setSelectedBorrower(borrower);
        setFormData({...formData, borrower_id: borrower?.id || 0});
    };

    const handleCreateNewBorrower = async (name: string) => {
        try {
            const newBorrower = await ApiClient.createBorrower({ name });
            setBorrowers([...borrowers, newBorrower]);
            setSelectedBorrower(newBorrower);
            setFormData({...formData, borrower_id: newBorrower.id});
        } catch (error) {
            console.error('Error creating borrower:', error);
            alert('Failed to create new business');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBorrower) {
            alert('Please select a business');
            return;
        }
        
        setLoading(true);
        try {
            await ApiClient.createTradingAccount(formData);
            setShowForm(false);
            setSelectedBorrower(null);
            setFormData({
                borrower_id: 0,
                sales: 0,
                purchases: 0,
                total_assets: 0,
                total_liabilities: 0,
                inventory: 0,
                period_start_date: '',
                period_end_date: ''
            });
            onRefresh();
        } catch (error) {
            console.error('Error creating trading account:', error);
            alert('Failed to create trading account');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this trading account?')) return;
        
        try {
            await ApiClient.deleteTradingAccount(id);
            onRefresh();
        } catch (error) {
            console.error('Error deleting trading account:', error);
            alert('Failed to delete trading account');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Trading Accounts</h2>
                <ProtectedAction action="create trading accounts" requiredRole="user">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn-primary"
                    >
                        {showForm ? 'Cancel' : 'Add New Account'}
                    </button>
                </ProtectedAction>
            </div>

            {/* Add Form */}
            {showForm && (
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Add New Trading Account</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Name <span className="text-red-500">*</span>
                                </label>
                                <BorrowerSearchDropdown
                                    borrowers={borrowers}
                                    selectedBorrower={selectedBorrower}
                                    onSelect={handleBorrowerSelect}
                                    onCreateNew={handleCreateNewBorrower}
                                    placeholder="Search for a business or create new..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sales
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.sales}
                                    onChange={(e) => setFormData({...formData, sales: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Purchases
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.purchases}
                                    onChange={(e) => setFormData({...formData, purchases: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Total Assets
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.total_assets}
                                    onChange={(e) => setFormData({...formData, total_assets: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Total Liabilities
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.total_liabilities}
                                    onChange={(e) => setFormData({...formData, total_liabilities: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Inventory
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.inventory}
                                    onChange={(e) => setFormData({...formData, inventory: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Period Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.period_start_date}
                                    onChange={(e) => setFormData({...formData, period_start_date: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Period End Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.period_end_date}
                                    onChange={(e) => setFormData({...formData, period_end_date: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Accounts List */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">All Trading Accounts ({accounts.length})</h3>
                {accounts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assets</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liabilities</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {accounts.map((account) => (
                                    <tr key={account.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{account.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{account.borrower?.name || 'Unknown Business'}</span>
                                                <span className="text-xs text-gray-500">ID: {account.borrower_id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${account.sales.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${account.total_assets.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${account.total_liabilities.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(account.period_start_date).toLocaleDateString()} - {new Date(account.period_end_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <ProtectedAction action="delete trading accounts" requiredRole="user">
                                                <button
                                                    onClick={() => handleDelete(account.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </ProtectedAction>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No trading accounts found. Create your first account above.</p>
                )}
            </div>
        </div>
    );
}