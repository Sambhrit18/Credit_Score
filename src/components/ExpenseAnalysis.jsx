import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Car, Home, Utensils, Gamepad2, MoreHorizontal } from 'lucide-react';

const ExpenseAnalysis = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      // Mock API call - replace with actual backend endpoint
      const response = await fetch('/api/expenses');
      if (response.ok) {
        const data = await response.json();
        setExpenseData(data.categories);
        setMonthlyData(data.monthly);
        setTotalExpenses(data.total);
      } else {
        // Mock data for demo
        const mockCategories = [
          {
            name: 'Shopping',
            amount: 1250,
            percentage: 28,
            color: '#3b82f6',
            icon: ShoppingCart,
            trend: 'up',
            trendValue: 15,
          },
          {
            name: 'Transportation',
            amount: 890,
            percentage: 20,
            color: '#10b981',
            icon: Car,
            trend: 'down',
            trendValue: -8,
          },
          {
            name: 'Housing',
            amount: 1100,
            percentage: 25,
            color: '#f59e0b',
            icon: Home,
            trend: 'stable',
            trendValue: 2,
          },
          {
            name: 'Food & Dining',
            amount: 680,
            percentage: 15,
            color: '#ef4444',
            icon: Utensils,
            trend: 'up',
            trendValue: 12,
          },
          {
            name: 'Entertainment',
            amount: 340,
            percentage: 8,
            color: '#8b5cf6',
            icon: Gamepad2,
            trend: 'down',
            trendValue: -5,
          },
          {
            name: 'Other',
            amount: 180,
            percentage: 4,
            color: '#6b7280',
            icon: MoreHorizontal,
            trend: 'stable',
            trendValue: 1,
          },
        ];

        const mockMonthly = [
          { month: 'Jan', amount: 4200 },
          { month: 'Feb', amount: 3800 },
          { month: 'Mar', amount: 4100 },
          { month: 'Apr', amount: 4400 },
          { month: 'May', amount: 4600 },
          { month: 'Jun', amount: 4440 },
        ];

        setExpenseData(mockCategories);
        setMonthlyData(mockMonthly);
        setTotalExpenses(4440);
      }
    } catch (error) {
      // Use mock data on error
      const mockCategories = [
        {
          name: 'Shopping',
          amount: 1250,
          percentage: 28,
          color: '#3b82f6',
          icon: ShoppingCart,
          trend: 'up',
          trendValue: 15,
        },
        {
          name: 'Transportation',
          amount: 890,
          percentage: 20,
          color: '#10b981',
          icon: Car,
          trend: 'down',
          trendValue: -8,
        },
        {
          name: 'Housing',
          amount: 1100,
          percentage: 25,
          color: '#f59e0b',
          icon: Home,
          trend: 'stable',
          trendValue: 2,
        },
        {
          name: 'Food & Dining',
          amount: 680,
          percentage: 15,
          color: '#ef4444',
          icon: Utensils,
          trend: 'up',
          trendValue: 12,
        },
        {
          name: 'Entertainment',
          amount: 340,
          percentage: 8,
          color: '#8b5cf6',
          icon: Gamepad2,
          trend: 'down',
          trendValue: -5,
        },
        {
          name: 'Other',
          amount: 180,
          percentage: 4,
          color: '#6b7280',
          icon: MoreHorizontal,
          trend: 'stable',
          trendValue: 1,
        },
      ];

      const mockMonthly = [
        { month: 'Jan', amount: 4200 },
        { month: 'Feb', amount: 3800 },
        { month: 'Mar', amount: 4100 },
        { month: 'Apr', amount: 4400 },
        { month: 'May', amount: 4600 },
        { month: 'Jun', amount: 4440 },
      ];

      setExpenseData(mockCategories);
      setMonthlyData(mockMonthly);
      setTotalExpenses(4440);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Monthly Expenses
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${totalExpenses.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Spending by Category
          </h4>
          
          <div className="space-y-4">
            {expenseData.map((category, index) => {
              const Icon = category.icon;
              const getTrendColor = () => {
                if (category.trend === 'up') return 'text-danger-600';
                if (category.trend === 'down') return 'text-success-600';
                return 'text-gray-500';
              };

              return (
                <div key={index} className="flex items-center space-x-4">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: category.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${category.amount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${category.percentage}%`,
                            backgroundColor: category.color 
                          }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${getTrendColor()}`}>
                        {category.trend === 'up' ? '+' : category.trend === 'down' ? '-' : ''}
                        {Math.abs(category.trendValue)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Expense Distribution
          </h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Spending Trend
        </h4>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Expenses']}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalysis; 