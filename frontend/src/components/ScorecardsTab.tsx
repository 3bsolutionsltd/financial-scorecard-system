'use client';

import { useState } from 'react';
import { ApiClient } from '../api/client';
import { Scorecard, TradingAccount } from '../api/types';

interface Props {
    scorecards: Scorecard[];
    accounts: TradingAccount[];
    onRefresh: () => void;
}

export default function ScorecardsTab({ scorecards, accounts, onRefresh }: Props) {
    const [loading, setLoading] = useState(false);
    const [selectedBorrower, setSelectedBorrower] = useState<number | ''>('');
    const [selectedAccount, setSelectedAccount] = useState<number | ''>('');

    const handleCalculateScore = async () => {
        if (!selectedBorrower || !selectedAccount) {
            alert('Please select both a borrower and trading account');
            return;
        }

        setLoading(true);
        try {
            await ApiClient.calculateScorecard({
                borrower_id: Number(selectedBorrower),
                trading_account_id: Number(selectedAccount)
            });
            setSelectedBorrower('');
            setSelectedAccount('');
            onRefresh();
        } catch (error) {
            console.error('Error calculating scorecard:', error);
            alert('Failed to calculate scorecard');
        } finally {
            setLoading(false);
        }
    };

    // Get unique borrower IDs from accounts
    const uniqueBorrowerIds = Array.from(new Set(accounts.map(acc => acc.borrower_id)));
    
    // Filter accounts by selected borrower
    const filteredAccounts = selectedBorrower 
        ? accounts.filter(acc => acc.borrower_id === Number(selectedBorrower))
        : [];

    const averageScore = scorecards.length > 0 
        ? (scorecards.reduce((sum, card) => sum + card.score, 0) / scorecards.length)
        : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Scorecards</h2>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Scorecards</h3>
                    <p className="text-3xl font-bold text-primary-600">{scorecards.length}</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Average Score</h3>
                    <p className="text-3xl font-bold text-green-600">{averageScore.toFixed(2)}</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Risk Level</h3>
                    <p className={`text-3xl font-bold ${
                        averageScore >= 70 ? 'text-green-600' :
                        averageScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                        {averageScore >= 70 ? 'Low' : averageScore >= 40 ? 'Medium' : 'High'}
                    </p>
                </div>
            </div>

            {/* Calculate New Scorecard */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">Generate New Scorecard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Borrower ID
                        </label>
                        <select
                            value={selectedBorrower}
                            onChange={(e) => {
                                setSelectedBorrower(e.target.value ? Number(e.target.value) : '');
                                setSelectedAccount('');
                            }}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Select Borrower...</option>
                            {uniqueBorrowerIds.map(id => (
                                <option key={id} value={id}>Borrower {id}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trading Account
                        </label>
                        <select
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value ? Number(e.target.value) : '')}
                            className="w-full border rounded-lg px-3 py-2"
                            disabled={!selectedBorrower}
                        >
                            <option value="">Select Account...</option>
                            {filteredAccounts.map(account => (
                                <option key={account.id} value={account.id}>
                                    Account {account.id} (Assets: ${account.total_assets.toLocaleString()})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleCalculateScore}
                            disabled={loading || !selectedBorrower || !selectedAccount}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? 'Calculating...' : 'Calculate Scorecard'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Scorecards List */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">All Scorecards ({scorecards.length})</h3>
                {scorecards.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrower</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Factor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {scorecards
                                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                    .map((scorecard) => {
                                        const riskLevel = scorecard.score >= 70 ? 'Low' : 
                                                        scorecard.score >= 40 ? 'Medium' : 'High';
                                        const riskColor = scorecard.score >= 70 ? 'text-green-600' :
                                                        scorecard.score >= 40 ? 'text-yellow-600' : 'text-red-600';
                                        
                                        return (
                                            <tr key={scorecard.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900">{scorecard.id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{scorecard.borrower_id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{scorecard.trading_account_id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{scorecard.risk_factor_id}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-primary-600">
                                                    {scorecard.score.toFixed(2)}
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-medium ${riskColor}`}>
                                                    {riskLevel}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(scorecard.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No scorecards generated yet.</p>
                        <p className="text-sm text-gray-400">
                            Create some trading accounts and risk factors, then generate your first scorecard above.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}