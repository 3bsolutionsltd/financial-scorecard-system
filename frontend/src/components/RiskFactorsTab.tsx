'use client';

import { useState } from 'react';
import { ApiClient } from '../api/client';
import { RiskFactor, CreateRiskFactorForm } from '../api/types';

interface Props {
    riskFactors: RiskFactor[];
    onRefresh: () => void;
}

export default function RiskFactorsTab({ riskFactors, onRefresh }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateRiskFactorForm>({
        name: '',
        description: '',
        factor_type: 'financial',
        formula: '',
        weight: 1.0,
        rating_scale: {
            'low': { min: 0, max: 30, score: 10 },
            'medium': { min: 31, max: 70, score: 50 },
            'high': { min: 71, max: 100, score: 90 }
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ApiClient.createRiskFactor(formData);
            setShowForm(false);
            setFormData({
                name: '',
                description: '',
                factor_type: 'financial',
                formula: '',
                weight: 1.0,
                rating_scale: {
                    'low': { min: 0, max: 30, score: 10 },
                    'medium': { min: 31, max: 70, score: 50 },
                    'high': { min: 71, max: 100, score: 90 }
                }
            });
            onRefresh();
        } catch (error) {
            console.error('Error creating risk factor:', error);
            alert('Failed to create risk factor');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this risk factor?')) return;
        
        try {
            await ApiClient.deleteRiskFactor(id);
            onRefresh();
        } catch (error) {
            console.error('Error deleting risk factor:', error);
            alert('Failed to delete risk factor');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Risk Factors</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : 'Add New Risk Factor'}
                </button>
            </div>

            {/* Add Form */}
            {showForm && (
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Add New Risk Factor</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type
                                </label>
                                <select
                                    value={formData.factor_type}
                                    onChange={(e) => setFormData({...formData, factor_type: e.target.value as 'financial' | 'non_financial'})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                >
                                    <option value="financial">Financial</option>
                                    <option value="non_financial">Non-Financial</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full border rounded-lg px-3 py-2"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Formula
                                </label>
                                <input
                                    type="text"
                                    value={formData.formula}
                                    onChange={(e) => setFormData({...formData, formula: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="e.g., total_assets / total_liabilities"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Weight
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="1"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
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
                                {loading ? 'Creating...' : 'Create Risk Factor'}
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

            {/* Risk Factors List */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">All Risk Factors ({riskFactors.length})</h3>
                {riskFactors.length > 0 ? (
                    <div className="grid gap-4">
                        {riskFactors.map((factor) => (
                            <div key={factor.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold">{factor.name}</h4>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                factor.factor_type === 'financial' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {factor.factor_type.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{factor.description}</p>
                                        <div className="text-xs text-gray-500">
                                            <p><strong>Formula:</strong> {factor.formula || 'N/A'}</p>
                                            <p><strong>Weight:</strong> {factor.weight}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(factor.id)}
                                        className="text-red-600 hover:text-red-800 ml-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No risk factors configured. Create your first risk factor above.</p>
                )}
            </div>
        </div>
    );
}