'use client';

import { useState } from 'react';
import { ApiClient } from '../api/client';
import { InventoryItem, CreateInventoryItemForm } from '../api/types';

interface Props {
    inventory: InventoryItem[];
    onRefresh: () => void;
}

export default function InventoryTab({ inventory, onRefresh }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateInventoryItemForm>({
        item_name: '',
        quantity: 0,
        unit_price: 0,
        location: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ApiClient.createInventoryItem(formData);
            setShowForm(false);
            setFormData({
                item_name: '',
                quantity: 0,
                unit_price: 0,
                location: ''
            });
            onRefresh();
        } catch (error) {
            console.error('Error creating inventory item:', error);
            alert('Failed to create inventory item');
        } finally {
            setLoading(false);
        }
    };

    const totalValue = inventory.reduce((sum, item) => sum + item.total_value, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : 'Add New Item'}
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Items</h3>
                    <p className="text-3xl font-bold text-primary-600">{inventory.length}</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Quantity</h3>
                    <p className="text-3xl font-bold text-green-600">
                        {inventory.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Value</h3>
                    <p className="text-3xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
                </div>
            </div>

            {/* Add Form */}
            {showForm && (
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Add New Inventory Item</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.item_name}
                                    onChange={(e) => setFormData({...formData, item_name: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Warehouse, shelf, etc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Unit Price
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.unit_price}
                                    onChange={(e) => setFormData({...formData, unit_price: Number(e.target.value)})}
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
                                {loading ? 'Adding...' : 'Add Item'}
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

            {/* Inventory List */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4">All Inventory Items ({inventory.length})</h3>
                {inventory.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {inventory.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.item_name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.location || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${item.unit_price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-green-600">
                                            ${item.total_value.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(item.updated_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No inventory items found. Add your first item above.</p>
                )}
            </div>
        </div>
    );
}