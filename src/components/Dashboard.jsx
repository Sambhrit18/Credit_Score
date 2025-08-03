import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import CreditScoreCard from './CreditScoreCard';
import FinancialHealthOverview from './FinancialHealthOverview';
import ExpenseAnalysis from './ExpenseAnalysis';
import CreditScoreAnalysis from './CreditScoreAnalysis';
import CreditScoreForecasting from './CreditScoreForecasting';
import ChatBot from './ChatBot';
import { TrendingUp, DollarSign, PieChart, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock API call - replace with actual backend endpoint
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        // Mock data for demo
        setDashboardData({
          creditScore: 742,
          debtToIncomeRatio: 28,
          creditUtilization: 35,
          monthlyIncome: 6500,
          totalDebt: 18200,
          paymentHistory: 98,
          creditAge: 7.5,
          creditMix: 85,
        });
      }
    } catch (error) {
      // Mock data for demo
      setDashboardData({
        creditScore: 742,
        debtToIncomeRatio: 28,
        creditUtilization: 35,
        monthlyIncome: 6500,
        totalDebt: 18200,
        paymentHistory: 98,
        creditAge: 7.5,
        creditMix: 85,
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'expenses', name: 'Expenses', icon: DollarSign },
    { id: 'analysis', name: 'Analysis', icon: PieChart },
    { id: 'forecast', name: 'Forecast', icon: TrendingUp },
    { id: 'chat', name: 'AI Assistant', icon: MessageCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">Here's your financial health overview</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && dashboardData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <CreditScoreCard score={dashboardData.creditScore} />
                </div>
                <div className="lg:col-span-2">
                  <FinancialHealthOverview data={dashboardData} />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'expenses' && (
            <ExpenseAnalysis />
          )}
          
          {activeTab === 'analysis' && dashboardData && (
            <CreditScoreAnalysis data={dashboardData} />
          )}
          
          {activeTab === 'forecast' && dashboardData && (
            <CreditScoreForecasting currentScore={dashboardData.creditScore} />
          )}
          
          {activeTab === 'chat' && (
            <ChatBot />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 