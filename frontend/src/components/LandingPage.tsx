'use client';

import { useState } from 'react';

export default function LandingPage() {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = {
        overview: 'Overview',
        features: 'Features',
        getting_started: 'Getting Started',
        user_guide: 'User Guide',
        help: 'Help & Support'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Financial Scorecard System
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            A comprehensive platform for managing business trading accounts, risk assessments, 
                            and financial scorecards with intelligent business name recognition.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => setActiveSection('getting_started')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Get Started
                            </button>
                            <button 
                                onClick={() => setActiveSection('features')}
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                View Features
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="sticky top-0 bg-white shadow-sm z-10 border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex space-x-8 py-4">
                        {Object.entries(sections).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    activeSection === key 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {activeSection === 'overview' && <OverviewSection />}
                {activeSection === 'features' && <FeaturesSection />}
                {activeSection === 'getting_started' && <GettingStartedSection />}
                {activeSection === 'user_guide' && <UserGuideSection />}
                {activeSection === 'help' && <HelpSection />}
            </div>
        </div>
    );
}

function OverviewSection() {
    return (
        <div className="space-y-12">
            {/* System Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">System Overview</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">What is Financial Scorecard System?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A modern, web-based platform designed to streamline financial analysis and risk assessment 
                            for businesses. Our system provides intuitive tools for managing trading accounts, tracking 
                            inventory, assessing risk factors, and generating comprehensive scorecards.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Benefits</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Streamlined business management
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Intelligent business name recognition
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Real-time financial tracking
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Comprehensive risk assessment
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <div className="text-3xl font-bold">4</div>
                    <div className="text-blue-100">Core Modules</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-green-100">Web-Based</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-purple-100">Availability</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                    <div className="text-3xl font-bold">∞</div>
                    <div className="text-orange-100">Scalability</div>
                </div>
            </div>
        </div>
    );
}

function FeaturesSection() {
    const features = [
        {
            title: "Smart Business Management",
            description: "Searchable business dropdown with auto-complete and create-on-the-fly functionality",
            icon: "🏢",
            highlights: ["Intelligent search", "Auto-complete", "Create new businesses instantly", "Professional display"]
        },
        {
            title: "Trading Accounts",
            description: "Comprehensive financial tracking with business name integration",
            icon: "📊",
            highlights: ["Sales & purchase tracking", "Asset management", "Period-based reporting", "Business relationships"]
        },
        {
            title: "Risk Assessment",
            description: "Configurable risk factors with automated scorecard generation",
            icon: "⚠️",
            highlights: ["Custom risk factors", "Automated calculations", "Trend analysis", "Risk classification"]
        },
        {
            title: "Inventory Management",
            description: "Track inventory items with values, quantities, and locations",
            icon: "📦",
            highlights: ["Item tracking", "Location management", "Value calculations", "Stock monitoring"]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover the comprehensive tools and capabilities that make Financial Scorecard System 
                    the ideal choice for business financial management.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <span className="text-4xl mr-4">{feature.icon}</span>
                            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{feature.description}</p>
                        <ul className="space-y-2">
                            {feature.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Feature Comparison */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Before vs After</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-red-600 mb-4">❌ Old System</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Confusing borrower IDs</li>
                            <li>• Manual business lookup</li>
                            <li>• Error-prone data entry</li>
                            <li>• Poor user experience</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-green-600 mb-4">✅ New System</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Clear business names</li>
                            <li>• Intelligent search & autocomplete</li>
                            <li>• Reduced errors</li>
                            <li>• Professional interface</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GettingStartedSection() {
    return (
        <div className="space-y-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Getting Started</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Follow these simple steps to start using the Financial Scorecard System effectively.
                </p>
            </div>

            {/* Quick Start Steps */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Access the System</h3>
                    <p className="text-gray-600 text-sm">Navigate to the dashboard and familiarize yourself with the interface</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Your First Business</h3>
                    <p className="text-gray-600 text-sm">Create a trading account and add your first business using the smart dropdown</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Explore Features</h3>
                    <p className="text-gray-600 text-sm">Discover inventory management, risk factors, and scorecard generation</p>
                </div>
            </div>

            {/* System Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">System Requirements</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Browser Requirements</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Chrome 90+ (Recommended)
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Firefox 88+
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Safari 14+
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Edge 90+
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">Technical Requirements</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Stable internet connection
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                JavaScript enabled
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Minimum 1024x768 resolution
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                Cookies enabled
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserGuideSection() {
    const [activeGuide, setActiveGuide] = useState('businesses');

    const guides = {
        businesses: 'Managing Businesses',
        accounts: 'Trading Accounts',
        inventory: 'Inventory',
        risk: 'Risk Factors',
        scorecards: 'Scorecards'
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">User Guide</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive guides for each module of the Financial Scorecard System.
                </p>
            </div>

            {/* Guide Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Object.entries(guides).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setActiveGuide(key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeGuide === key 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Guide Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                {activeGuide === 'businesses' && <BusinessGuide />}
                {activeGuide === 'accounts' && <AccountsGuide />}
                {activeGuide === 'inventory' && <InventoryGuide />}
                {activeGuide === 'risk' && <RiskGuide />}
                {activeGuide === 'scorecards' && <ScorecardsGuide />}
            </div>
        </div>
    );
}

function BusinessGuide() {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Managing Businesses</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">✨ New Feature: Smart Business Dropdown</h4>
                <p className="text-blue-700">
                    Our intelligent business selection system makes it easy to find existing businesses or create new ones instantly.
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">How to Add a New Business:</h4>
                <div className="bg-gray-50 rounded-lg p-6">
                    <ol className="space-y-3">
                        <li className="flex">
                            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                            <div>
                                <strong>Navigate to Trading Accounts</strong>
                                <p className="text-gray-600 text-sm">Click on the Trading Accounts tab in the main navigation</p>
                            </div>
                        </li>
                        <li className="flex">
                            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                            <div>
                                <strong>Start Creating an Account</strong>
                                <p className="text-gray-600 text-sm">Click "Add New Account" to open the creation form</p>
                            </div>
                        </li>
                        <li className="flex">
                            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                            <div>
                                <strong>Use the Business Dropdown</strong>
                                <p className="text-gray-600 text-sm">Type the business name in the "Business Name" field. If it doesn't exist, select "Create new business"</p>
                            </div>
                        </li>
                        <li className="flex">
                            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                            <div>
                                <strong>Complete the Form</strong>
                                <p className="text-gray-600 text-sm">Fill in the financial data and create the trading account</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">✅ Best Practices</h5>
                    <ul className="text-green-700 text-sm space-y-1">
                        <li>• Use consistent naming conventions</li>
                        <li>• Search before creating new businesses</li>
                        <li>• Include business type (Co., Ltd., Inc.)</li>
                        <li>• Use full legal names when possible</li>
                    </ul>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-800 mb-2">💡 Pro Tips</h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                        <li>• Type just the first word to filter results</li>
                        <li>• Recent businesses appear first</li>
                        <li>• Business names are case-insensitive</li>
                        <li>• You can edit business names later</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function AccountsGuide() {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Trading Accounts</h3>
            <p className="text-gray-600">
                Trading accounts contain comprehensive financial data for businesses over specific time periods.
            </p>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">Creating a Trading Account:</h4>
                
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Required Fields:</h5>
                            <ul className="space-y-2 text-gray-600">
                                <li><strong>Business Name:</strong> Select from dropdown or create new</li>
                                <li><strong>Sales:</strong> Total sales for the period</li>
                                <li><strong>Purchases:</strong> Total purchases made</li>
                                <li><strong>Total Assets:</strong> Current asset value</li>
                                <li><strong>Total Liabilities:</strong> Current liability amount</li>
                                <li><strong>Inventory:</strong> Current inventory value</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Time Period:</h5>
                            <ul className="space-y-2 text-gray-600">
                                <li><strong>Start Date:</strong> Beginning of reporting period</li>
                                <li><strong>End Date:</strong> End of reporting period</li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                                <p className="text-blue-700 text-sm">
                                    <strong>Tip:</strong> Use standard fiscal periods (quarterly, annually) for better comparisons.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Table View Features:</h4>
                <div className="space-y-3">
                    <div className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                        <div>
                            <strong>Business Names Prominently Displayed:</strong>
                            <p className="text-gray-600 text-sm">Business names are shown clearly with ID as secondary information</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                        <div>
                            <strong>Financial Summary:</strong>
                            <p className="text-gray-600 text-sm">Key metrics displayed in easy-to-read format</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                        <div>
                            <strong>Period Information:</strong>
                            <p className="text-gray-600 text-sm">Date ranges shown for temporal context</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InventoryGuide() {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Inventory Management</h3>
            <p className="text-gray-600">
                Track individual inventory items with quantities, prices, and locations for comprehensive asset management.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Adding Items:</h4>
                    <ol className="space-y-2 text-gray-600">
                        <li>1. Navigate to Inventory tab</li>
                        <li>2. Click "Add New Item"</li>
                        <li>3. Enter item details</li>
                        <li>4. Save the item</li>
                    </ol>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Item Details:</h4>
                    <ul className="space-y-2 text-gray-600">
                        <li>• <strong>Name:</strong> Product description</li>
                        <li>• <strong>Quantity:</strong> Items in stock</li>
                        <li>• <strong>Unit Price:</strong> Price per item</li>
                        <li>• <strong>Location:</strong> Storage location</li>
                    </ul>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Automatic Calculations</h4>
                <p className="text-blue-700">
                    Total values are calculated automatically based on quantity × unit price.
                </p>
            </div>
        </div>
    );
}

function RiskGuide() {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Risk Factors</h3>
            <p className="text-gray-600">
                Configure risk assessment criteria to evaluate business performance and identify potential issues.
            </p>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">Risk Factor Types:</h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">Financial Factors</h5>
                        <ul className="text-green-700 text-sm space-y-1">
                            <li>• Debt-to-equity ratios</li>
                            <li>• Liquidity ratios</li>
                            <li>• Profitability metrics</li>
                            <li>• Cash flow indicators</li>
                        </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-2">Non-Financial Factors</h5>
                        <ul className="text-purple-700 text-sm space-y-1">
                            <li>• Management quality</li>
                            <li>• Market position</li>
                            <li>• Industry trends</li>
                            <li>• Regulatory compliance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScorecardsGuide() {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Scorecards</h3>
            <p className="text-gray-600">
                Generate comprehensive risk assessments by combining trading account data with configured risk factors.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Scorecard Generation Process:</h4>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                        <span>Select business and trading account</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                        <span>System applies configured risk factors</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                        <span>Calculate weighted risk scores</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                        <span>Generate final risk assessment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HelpSection() {
    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Help & Support</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions and get the support you need.
                </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">How do I create a new business?</h4>
                        <p className="text-gray-600">When creating a trading account, simply type the business name in the dropdown. If it doesn't exist, select "Create new business" option.</p>
                    </div>
                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Can I edit business names after creation?</h4>
                        <p className="text-gray-600">Yes, business information can be updated through the API. Contact your system administrator for bulk changes.</p>
                    </div>
                    <div className="border-b pb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">What date format should I use?</h4>
                        <p className="text-gray-600">Use YYYY-MM-DD format for all dates (e.g., 2024-12-31). The system will validate the format automatically.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">How do I troubleshoot loading issues?</h4>
                        <p className="text-gray-600">First, ensure the backend server is running. Try refreshing the page (Ctrl+R) or clearing your browser cache.</p>
                    </div>
                </div>
            </div>

            {/* Contact Support */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8">
                    <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                    <p className="mb-4">Need help with technical issues or system problems?</p>
                    <div className="space-y-2">
                        <p>📧 Email: support@financialscorecard.com</p>
                        <p>📞 Phone: +1 (555) 123-4567</p>
                        <p>🕒 Hours: Mon-Fri 9AM-5PM EST</p>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8">
                    <h3 className="text-xl font-semibold mb-4">User Training</h3>
                    <p className="mb-4">Want to maximize your use of the system?</p>
                    <div className="space-y-2">
                        <p>📚 Documentation: Built-in help system</p>
                        <p>🎓 Training: Available on request</p>
                        <p>💬 Community: User forums and discussions</p>
                    </div>
                </div>
            </div>

            {/* Authentication & Security */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Authentication & Security
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-3">🔒 Secure Access</h4>
                        <p className="text-gray-600 mb-3">
                            Sensitive financial operations require authentication to ensure data security and user accountability.
                        </p>
                        <div className="text-sm text-gray-600">
                            <p><strong>Public Access:</strong> Landing page, documentation, and general information</p>
                            <p><strong>Authenticated Access:</strong> Creating, editing, and deleting financial data</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-3">👤 Demo Accounts</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                                <strong>Admin:</strong> admin / admin123
                                <br /><span className="text-red-700">Full system access</span>
                            </div>
                            <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                                <strong>User:</strong> user / user123
                                <br /><span className="text-blue-700">Standard user access</span>
                            </div>
                            <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                                <strong>Demo:</strong> demo / demo
                                <br /><span className="text-green-700">Quick access for testing</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3">🔐 How Authentication Works</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                                <span className="text-blue-600 font-bold">1</span>
                            </div>
                            <p><strong>Browse Freely</strong><br />Explore the system without login</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                                <span className="text-blue-600 font-bold">2</span>
                            </div>
                            <p><strong>Action Triggered</strong><br />Login required for sensitive actions</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                                <span className="text-blue-600 font-bold">3</span>
                            </div>
                            <p><strong>Secure Access</strong><br />Proceed with authenticated permissions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Keyboard Shortcuts</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Navigation</h4>
                        <div className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                <span>Search page</span>
                                <kbd className="bg-gray-200 px-2 py-1 rounded text-xs">Ctrl+F</kbd>
                            </div>
                            <div className="flex justify-between">
                                <span>Refresh page</span>
                                <kbd className="bg-gray-200 px-2 py-1 rounded text-xs">F5</kbd>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Development</h4>
                        <div className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                <span>Developer tools</span>
                                <kbd className="bg-gray-200 px-2 py-1 rounded text-xs">F12</kbd>
                            </div>
                            <div className="flex justify-between">
                                <span>Hard refresh</span>
                                <kbd className="bg-gray-200 px-2 py-1 rounded text-xs">Ctrl+Shift+R</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}