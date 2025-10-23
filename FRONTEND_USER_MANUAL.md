# Financial Scorecard System - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Businesses](#managing-businesses)
4. [Trading Accounts](#trading-accounts)
5. [Inventory Management](#inventory-management)
6. [Risk Factors](#risk-factors)
7. [Scorecards](#scorecards)
8. [Tips & Best Practices](#tips--best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Backend server running on port 8000
- Frontend server running on port 3000

### Accessing the System
1. Open your web browser
2. Navigate to `http://localhost:3000`
3. The Financial Scorecard System dashboard will load automatically

---

## Dashboard Overview

The main dashboard provides a comprehensive overview of your financial data with the following tabs:

### Navigation Tabs
- **Overview**: Summary statistics and quick insights
- **Trading Accounts**: Manage business trading accounts
- **Risk Factors**: Configure risk assessment criteria  
- **Inventory**: Track inventory items and values
- **Scorecards**: View calculated risk scorecards

### Key Features
- **Real-time Data**: All data updates automatically
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional Interface**: Clean, modern design for efficient workflow

---

## Managing Businesses

### What are Businesses?
Businesses (also called "Borrowers") are the companies or entities you're tracking in the system. Each business can have multiple trading accounts associated with it.

### Creating a New Business
When creating a trading account, you can add new businesses on-the-fly:

1. **Navigate to Trading Accounts tab**
2. **Click "Add New Account"**
3. **In the Business Name field:**
   - Type the name of the business
   - If it exists, select it from the dropdown
   - If it doesn't exist, click "Create new business: [Name]"
4. **The business is automatically created and selected**

### Business Search Features
- **Live Search**: Type to filter existing businesses
- **Auto-complete**: Shows matching businesses as you type
- **Create New**: Add businesses without leaving the form
- **Visual Selection**: Clear indication of selected business

---

## Trading Accounts

### Overview
Trading accounts contain financial data for businesses over specific time periods. This is where you track sales, purchases, assets, liabilities, and inventory.

### Creating a Trading Account

1. **Navigate to Trading Accounts tab**
2. **Click "Add New Account"**
3. **Fill in the form:**

   **Business Selection:**
   - **Business Name**: Use the searchable dropdown
     - Type to search existing businesses
     - Select from the list or create new
     - Business name will be displayed prominently

   **Financial Data:**
   - **Sales**: Total sales for the period
   - **Purchases**: Total purchases made
   - **Total Assets**: Current total assets
   - **Total Liabilities**: Current total liabilities  
   - **Inventory**: Current inventory value

   **Time Period:**
   - **Period Start Date**: Beginning of the reporting period
   - **Period End Date**: End of the reporting period

4. **Click "Create Account"**

### Viewing Trading Accounts

The trading accounts table displays:
- **ID**: Unique account identifier
- **Business Name**: Company name (prominently displayed)
  - Business ID shown as secondary information
- **Sales**: Total sales amount
- **Assets**: Total assets value
- **Liabilities**: Total liabilities amount
- **Period**: Date range for the account
- **Actions**: Delete option

### Managing Trading Accounts
- **Edit**: Click on any account to modify details
- **Delete**: Use the delete button (requires confirmation)
- **Filter**: Use browser search (Ctrl+F) to find specific accounts
- **Sort**: Click column headers to sort data

---

## Inventory Management

### Overview
Track individual inventory items with quantities, prices, and locations.

### Adding Inventory Items

1. **Navigate to Inventory tab**
2. **Click "Add New Item"**
3. **Fill in the details:**
   - **Item Name**: Product or item description
   - **Quantity**: Number of items in stock
   - **Unit Price**: Price per individual item
   - **Location**: Where the item is stored (optional)
4. **Click "Create Item"**

### Inventory Features
- **Automatic Calculations**: Total value calculated automatically
- **Location Tracking**: Optional field for warehouse/storage locations
- **Real-time Updates**: Changes reflect immediately

---

## Risk Factors

### Overview
Define criteria used to assess business risk. Risk factors can be financial ratios or qualitative assessments.

### Creating Risk Factors

1. **Navigate to Risk Factors tab**
2. **Click "Add New Factor"**
3. **Configure the factor:**
   - **Name**: Descriptive name for the risk factor
   - **Description**: Detailed explanation
   - **Factor Type**: Choose Financial or Non-Financial
   - **Formula**: Calculation method (if applicable)
   - **Weight**: Importance in overall risk calculation
   - **Rating Scale**: Define scoring criteria
4. **Click "Create Factor"**

### Risk Factor Types
- **Financial**: Based on numerical data (ratios, percentages)
- **Non-Financial**: Qualitative assessments (management quality, market position)

---

## Scorecards

### Overview
Scorecards combine trading account data with risk factors to produce risk assessments for businesses.

### Generating Scorecards

1. **Navigate to Scorecards tab**
2. **Click "Calculate New Scorecard"**
3. **Select:**
   - **Business**: Choose the business to assess
   - **Trading Account**: Select the relevant account period
4. **Click "Calculate"**

### Understanding Scorecard Results
- **Overall Score**: Composite risk rating
- **Factor Breakdown**: Individual risk factor scores
- **Trend Analysis**: Historical score comparisons
- **Risk Level**: High/Medium/Low risk classification

---

## Tips & Best Practices

### Data Entry
- **Consistent Naming**: Use consistent business name formats
- **Regular Updates**: Keep trading accounts current
- **Complete Data**: Fill all required fields for accurate calculations
- **Date Accuracy**: Ensure period dates are correct

### Navigation
- **Use Tabs**: Switch between different data types efficiently
- **Search Function**: Use browser search (Ctrl+F) to find specific data
- **Refresh Data**: Page automatically updates, but refresh if needed

### Business Management
- **Unique Names**: Use distinctive business names to avoid confusion
- **Search First**: Always search before creating new businesses
- **Logical Grouping**: Consider how businesses relate to each other

### Performance
- **Regular Cleanup**: Remove outdated or incorrect data
- **Monitor Loading**: Large datasets may take time to load
- **Browser Cache**: Clear cache if experiencing display issues

---

## Troubleshooting

### Common Issues

**Problem**: "Failed to create trading account"
- **Solution**: Ensure all required fields are filled
- **Check**: Business is properly selected
- **Verify**: Dates are in correct format (YYYY-MM-DD)

**Problem**: Business dropdown not loading
- **Solution**: Check backend server is running
- **Verify**: Network connection is stable
- **Try**: Refresh the page

**Problem**: Data not displaying
- **Solution**: Verify backend API is accessible
- **Check**: Browser console for errors (F12)
- **Try**: Hard refresh (Ctrl+Shift+R)

**Problem**: Slow performance
- **Solution**: Check for large datasets
- **Try**: Filter or paginate results
- **Consider**: Archiving old data

### Error Messages

**"Business name is required"**
- Select a business from the dropdown or create a new one

**"Invalid date format"**
- Use YYYY-MM-DD format for dates

**"Server connection failed"**
- Check that backend server is running on port 8000

### Getting Help

**Contact Information:**
- System Administrator: [Your IT Support]
- Documentation: Available in system help section
- Technical Support: [Your Support Channel]

**Self-Help Resources:**
- Browser Developer Tools (F12) for error details
- System logs available to administrators
- User community forums (if available)

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search page | Ctrl+F |
| Refresh page | F5 or Ctrl+R |
| Hard refresh | Ctrl+Shift+R |
| Open developer tools | F12 |
| Navigate tabs | Ctrl+Tab |

---

## System Status Indicators

### Visual Cues
- **Green indicators**: Successful operations
- **Yellow indicators**: Warnings or partial success
- **Red indicators**: Errors or failures
- **Loading spinners**: Operations in progress

### Data States
- **Loading...**: Data is being fetched
- **No data found**: Empty result sets
- **Error messages**: Specific problem descriptions

---

*Last Updated: October 2025*
*Version: 2.0 - Includes Business Name Features*

---

## Quick Reference Card

### Essential Workflows

**Create New Business Account:**
1. Trading Accounts → Add New Account
2. Type business name → Select or Create New
3. Fill financial data and dates
4. Create Account

**View Business Performance:**
1. Trading Accounts → Find business name
2. Review sales, assets, liabilities
3. Check period dates for context

**Generate Risk Assessment:**
1. Scorecards → Calculate New Scorecard
2. Select business and account
3. Calculate → Review results

**Add Inventory Item:**
1. Inventory → Add New Item
2. Enter name, quantity, price
3. Optional: Add location
4. Create Item