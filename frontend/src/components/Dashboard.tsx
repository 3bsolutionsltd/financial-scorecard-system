'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '../api/client';
import { TradingAccount, RiskFactor, Scorecard, InventoryItem } from '../api/types';
import TradingAccountsTab from './TradingAccountsTab';
import RiskFactorsTab from './RiskFactorsTab';
import InventoryTab from './InventoryTab';
import ScorecardsTab from './ScorecardsTab';
import LandingPage from './LandingPage';
import { AuthProvider } from './AuthContext';
import UserProfile from './UserProfile';
import ProtectedAction from './ProtectedAction';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('home');
    const [accounts, setAccounts] = useState<TradingAccount[]>([]);
    const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
    const [scorecards, setScorecards] = useState<Scorecard[]>([]);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Fetching data from API...');
            
            // Try each endpoint individually and log results
            try {
                const accountsData = await ApiClient.getTradingAccounts();
                console.log('Trading accounts:', accountsData);
                setAccounts(accountsData);
            } catch (e) {
                console.error('Error fetching trading accounts:', e);
                setAccounts([]);
            }
            
            try {
                const riskFactorsData = await ApiClient.getRiskFactors();
                console.log('Risk factors:', riskFactorsData);
                setRiskFactors(riskFactorsData);
            } catch (e) {
                console.error('Error fetching risk factors:', e);
                setRiskFactors([]);
            }
            
            try {
                const scorecardsData = await ApiClient.getScorecards();
                console.log('Scorecards:', scorecardsData);
                setScorecards(scorecardsData);
            } catch (e) {
                console.error('Error fetching scorecards:', e);
                setScorecards([]);
            }
            
            try {
                const inventoryData = await ApiClient.getInventory();
                console.log('Inventory:', inventoryData);
                setInventory(inventoryData);
            } catch (e) {
                console.error('Error fetching inventory:', e);
                setInventory([]);
            }

        } catch (error) {
            console.error('General error fetching data:', error);
            setError('Failed to load data. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch data if not on home tab
        if (activeTab !== 'home') {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [activeTab]);

    const tabs = [
        { id: 'home', name: 'Home', icon: '🏠' },
        { id: 'overview', name: 'Overview', icon: '📊' },
        { id: 'accounts', name: 'Trading Accounts', icon: '💰' },
        { id: 'risks', name: 'Risk Factors', icon: '⚠️' },
        { id: 'inventory', name: 'Inventory', icon: '📦' },
        { id: 'scorecards', name: 'Scorecards', icon: '📈' }
    ];

    if (loading && activeTab !== 'home') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="mt-4 text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error && activeTab !== 'home') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-xl text-red-600 mb-4">{error}</p>
                    <button onClick={fetchData} className="btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Show header only for non-home tabs */}
            {activeTab !== 'home' && (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Financial Scorecard System</h1>
                        <div className="flex items-center space-x-4">
                            <UserProfile />
                            <button onClick={fetchData} className="btn-secondary">
                                Refresh Data
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </>
            )}

            {/* Show floating tabs for home page */}
            {activeTab === 'home' && (
                <>
                    <div className="fixed top-4 right-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
                            <nav className="flex space-x-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`${
                                            activeTab === tab.id
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                        } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors`}
                                    >
                                        <span>{tab.icon}</span>
                                        <span className="hidden md:inline">{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                    
                    {/* User Profile for home page */}
                    <div className="fixed top-4 left-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
                            <UserProfile />
                        </div>
                    </div>
                </>
            )}

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'home' && <LandingPage />}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Trading Accounts</h3>
                                <p className="text-3xl font-bold text-primary-600">{accounts.length}</p>
                            </div>
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Risk Factors</h3>
                                <p className="text-3xl font-bold text-yellow-600">{riskFactors.length}</p>
                            </div>
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Inventory Items</h3>
                                <p className="text-3xl font-bold text-green-600">{inventory.length}</p>
                            </div>
                            <div className="card">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Scorecards</h3>
                                <p className="text-3xl font-bold text-purple-600">{scorecards.length}</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="card">
                            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button 
                                    onClick={() => setActiveTab('accounts')}
                                    className="btn-primary text-center"
                                >
                                    Manage Accounts
                                </button>
                                <button 
                                    onClick={() => setActiveTab('risks')}
                                    className="btn-primary text-center"
                                >
                                    Configure Risks
                                </button>
                                <button 
                                    onClick={() => setActiveTab('inventory')}
                                    className="btn-primary text-center"
                                >
                                    Track Inventory
                                </button>
                                <button 
                                    onClick={() => setActiveTab('scorecards')}
                                    className="btn-primary text-center"
                                >
                                    Generate Scores
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="card">
                            <h3 className="text-xl font-semibold mb-4">Recent Scorecards</h3>
                            {scorecards.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {scorecards.slice(0, 5).map((scorecard) => (
                                                <tr key={scorecard.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{scorecard.id}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-primary-600">
                                                        {scorecard.score.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {new Date(scorecard.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">No scorecards generated yet.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'accounts' && (
                    <TradingAccountsTab accounts={accounts} onRefresh={fetchData} />
                )}

                {activeTab === 'risks' && (
                    <RiskFactorsTab riskFactors={riskFactors} onRefresh={fetchData} />
                )}

                {activeTab === 'inventory' && (
                    <InventoryTab inventory={inventory} onRefresh={fetchData} />
                )}

                {activeTab === 'scorecards' && (
                    <ScorecardsTab scorecards={scorecards} accounts={accounts} onRefresh={fetchData} />
                )}
            </div>
        </div>
    );
}

// Wrapper component with AuthProvider
function DashboardContent() {
    return <Dashboard />;
}

// Main export with authentication context
export default function AuthenticatedDashboard() {
    return (
        <AuthProvider>
            <DashboardContent />
        </AuthProvider>
    );
}
