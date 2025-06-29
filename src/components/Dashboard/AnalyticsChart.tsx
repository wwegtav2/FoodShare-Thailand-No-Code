import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

interface AnalyticsChartProps {
  type: 'listings' | 'sales' | 'foodWaste';
  title: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ type, title }) => {
  const { language, theme } = useApp();

  // Generate dummy data based on chart type
  const generateData = () => {
    const months = language === 'en' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      : ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'];

    switch (type) {
      case 'listings':
        return months.map((month, index) => ({
          month,
          value: Math.floor(Math.random() * 10) + index * 2 + 1
        }));
      case 'sales':
        return months.map((month, index) => ({
          month,
          value: Math.floor(Math.random() * 30) + index * 5 + 10
        }));
      case 'foodWaste':
        return months.map((month, index) => ({
          month,
          value: Math.floor(Math.random() * 20) + index * 3 + 5
        }));
      default:
        return [];
    }
  };

  const data = generateData();
  const isDark = theme === 'dark';

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    if (type === 'listings') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: isDark ? '#f9fafb' : '#111827'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: isDark ? '#f9fafb' : '#111827'
            }}
          />
          <Bar 
            dataKey="value" 
            fill={type === 'sales' ? '#3b82f6' : '#8b5cf6'}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default AnalyticsChart;