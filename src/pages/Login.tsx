import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { language } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(t('fillAllFields', language));
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('invalidCredentials', language));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {t('login', language)}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {t('dontHaveAccount', language)}{' '}
            <Link to="/register" className="font-medium text-emerald-400 hover:text-emerald-300">
              {t('register', language)}
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-700">
          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('email', language)}
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              icon={Mail}
              required
            />

            <Input
              label={t('password', language)}
              type="password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              icon={Lock}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? t('loading', language) : t('signIn', language)}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-900/50 border border-blue-700 rounded-lg">
              <h4 className="text-sm font-medium text-blue-300 mb-2">{t('demoAccount', language)} - {t('buyer', language)}</h4>
              <p className="text-sm text-blue-200">
                {t('email', language)}: <code className="bg-blue-800 px-1 rounded">demo@example.com</code><br/>
                {t('password', language)}: <code className="bg-blue-800 px-1 rounded">password</code>
              </p>
            </div>
            
            <div className="p-4 bg-emerald-900/50 border border-emerald-700 rounded-lg">
              <h4 className="text-sm font-medium text-emerald-300 mb-2">{t('demoAccount', language)} - {t('seller', language)}</h4>
              <p className="text-sm text-emerald-200">
                {t('email', language)}: <code className="bg-emerald-800 px-1 rounded">seller@example.com</code><br/>
                {t('password', language)}: <code className="bg-emerald-800 px-1 rounded">password</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;