import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, Percent, Award, AlertTriangle } from 'lucide-react';

const FinancialHealthOverview = ({ data }) => {
  const getHealthColor = (value, thresholds) => {
    if (value <= thresholds[0]) return 'text-success-600 bg-success-50 border-success-200';
    if (value <= thresholds[1]) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-danger-600 bg-danger-50 border-danger-200';
  };

  const getHealthStatus = (value, thresholds, labels) => {
    if (value <= thresholds[0]) return labels[0];
    if (value <= thresholds[1]) return labels[1];
    return labels[2];
  };

  const getHealthIcon = (value, thresholds) => {
    if (value <= thresholds[0]) return Award;
    if (value <= thresholds[1]) return TrendingUp;
    return AlertTriangle;
  };

  const metrics = [
    {
      title: 'Debt-to-Income Ratio',
      value: `${data.debtToIncomeRatio}%`,
      status: getHealthStatus(data.debtToIncomeRatio, [20, 35], ['Excellent', 'Good', 'High']),
      color: getHealthColor(data.debtToIncomeRatio, [20, 35]),
      icon: DollarSign,
      trend: data.debtToIncomeRatio <= 20 ? 'up' : 'down',
      description: 'Lower is better for creditworthiness'
    },
    {
      title: 'Credit Utilization',
      value: `${data.creditUtilization}%`,
      status: getHealthStatus(data.creditUtilization, [10, 30], ['Excellent', 'Good', 'High']),
      color: getHealthColor(data.creditUtilization, [10, 30]),
      icon: CreditCard,
      trend: data.creditUtilization <= 10 ? 'up' : 'down',
      description: 'Keep below 30% for optimal scores'
    },
    {
      title: 'Payment History',
      value: `${data.paymentHistory}%`,
      status: getHealthStatus(100 - data.paymentHistory, [5, 15], ['Excellent', 'Good', 'Poor']),
      color: getHealthColor(100 - data.paymentHistory, [5, 15]),
      icon: Calendar,
      trend: data.paymentHistory >= 95 ? 'up' : 'down',
      description: 'Most important factor for credit score'
    },
    {
      title: 'Credit Mix Score',
      value: `${data.creditMix}%`,
      status: getHealthStatus(100 - data.creditMix, [10, 30], ['Excellent', 'Good', 'Poor']),
      color: getHealthColor(100 - data.creditMix, [10, 30]),
      icon: Percent,
      trend: data.creditMix >= 80 ? 'up' : 'down',
      description: 'Variety of credit types helps'
    },
  ];

  return (
    <div className="card p-8 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100">
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Financial Health Overview
          </h3>
          <p className="text-sm text-gray-600">Key metrics affecting your credit score</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const HealthIcon = getHealthIcon(
            metric.title === 'Payment History' ? 100 - data.paymentHistory :
            metric.title === 'Credit Mix Score' ? 100 - data.creditMix :
            metric.title === 'Debt-to-Income Ratio' ? data.debtToIncomeRatio :
            data.creditUtilization,
            [
              metric.title === 'Payment History' || metric.title === 'Credit Mix Score' ? 10 :
              metric.title === 'Debt-to-Income Ratio' ? 20 : 10,
              metric.title === 'Payment History' || metric.title === 'Credit Mix Score' ? 30 :
              metric.title === 'Debt-to-Income Ratio' ? 35 : 30
            ]
          );
          
          return (
            <div key={index} className={`relative overflow-hidden rounded-2xl border-2 ${metric.color} p-6 transform hover:scale-105 transition-all duration-300`}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 opacity-10">
                <div className="w-20 h-20 bg-current rounded-full transform translate-x-6 -translate-y-6"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${metric.color.replace('text-', 'bg-').replace('bg-', 'bg-').replace('-50', '-100')}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <HealthIcon className="h-5 w-5" />
                  </div>
                  <TrendIcon className={`h-5 w-5 ${
                    metric.trend === 'up' ? 'text-success-600' : 'text-danger-600'
                  }`} />
                </div>
                
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {metric.title}
                </h4>
                
                <div className="flex items-end space-x-3 mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${metric.color}`}>
                    {metric.status}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-400 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
          <div className="absolute top-0 right-0 opacity-20">
            <CreditCard className="h-16 w-16 transform rotate-12 translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <h4 className="text-sm font-medium text-green-100 mb-2">
              Monthly Income
            </h4>
            <div className="text-3xl font-bold">
              ${data.monthlyIncome.toLocaleString()}
            </div>
            <p className="text-xs text-green-100 mt-1">Strong earning capacity</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-600 p-6 rounded-2xl text-white shadow-xl">
          <div className="absolute top-0 right-0 opacity-20">
            <AlertTriangle className="h-16 w-16 transform rotate-12 translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <h4 className="text-sm font-medium text-orange-100 mb-2">
              Total Debt
            </h4>
            <div className="text-3xl font-bold">
              ${data.totalDebt.toLocaleString()}
            </div>
            <p className="text-xs text-orange-100 mt-1">Focus on paying down</p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-400 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
          <div className="absolute top-0 right-0 opacity-20">
            <Calendar className="h-16 w-16 transform rotate-12 translate-x-4 -translate-y-4" />
          </div>
          <div className="relative">
            <h4 className="text-sm font-medium text-purple-100 mb-2">
              Average Credit Age
            </h4>
            <div className="text-3xl font-bold">
              {data.creditAge} years
            </div>
            <p className="text-xs text-purple-100 mt-1">Longer history is better</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthOverview; 