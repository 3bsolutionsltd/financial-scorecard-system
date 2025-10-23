'use client';

import { useState, useEffect, useRef } from 'react';
import { Borrower } from '../api/types';

interface Props {
    borrowers: Borrower[];
    selectedBorrower: Borrower | null;
    onSelect: (borrower: Borrower | null) => void;
    onCreateNew: (name: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function BorrowerSearchDropdown({ 
    borrowers, 
    selectedBorrower, 
    onSelect, 
    onCreateNew,
    placeholder = "Search or select a business...",
    disabled = false 
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayValue, setDisplayValue] = useState(selectedBorrower?.name || '');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter borrowers based on search term
    const filteredBorrowers = borrowers.filter(borrower =>
        borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle selection
    const handleSelect = (borrower: Borrower) => {
        onSelect(borrower);
        setDisplayValue(borrower.name);
        setSearchTerm('');
        setIsOpen(false);
    };

    // Handle input change
    const handleInputChange = (value: string) => {
        setDisplayValue(value);
        setSearchTerm(value);
        setIsOpen(true);
        
        // If the input is cleared, clear selection
        if (!value) {
            onSelect(null);
        }
    };

    // Handle create new business
    const handleCreateNew = () => {
        if (searchTerm.trim()) {
            onCreateNew(searchTerm.trim());
            setSearchTerm('');
            setIsOpen(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                // Reset display value if no selection was made
                if (!selectedBorrower && displayValue) {
                    setDisplayValue('');
                    setSearchTerm('');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedBorrower, displayValue]);

    // Update display value when selectedBorrower changes
    useEffect(() => {
        setDisplayValue(selectedBorrower?.name || '');
    }, [selectedBorrower]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={displayValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredBorrowers.length > 0 ? (
                        <div>
                            {filteredBorrowers.map((borrower) => (
                                <div
                                    key={borrower.id}
                                    onClick={() => handleSelect(borrower)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center justify-between ${
                                        selectedBorrower?.id === borrower.id ? 'bg-blue-100' : ''
                                    }`}
                                >
                                    <span className="font-medium">{borrower.name}</span>
                                    <span className="text-sm text-gray-500">ID: {borrower.id}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-2 text-gray-500">
                            No businesses found
                        </div>
                    )}
                    
                    {/* Create new option */}
                    {searchTerm && !filteredBorrowers.some(b => b.name.toLowerCase() === searchTerm.toLowerCase()) && (
                        <div className="border-t border-gray-200">
                            <div
                                onClick={handleCreateNew}
                                className="px-4 py-2 cursor-pointer hover:bg-green-50 flex items-center text-green-700"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create new business: "{searchTerm}"
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}