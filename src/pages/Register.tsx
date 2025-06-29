import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, ShoppingBag, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  const { language } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer' as 'buyer' | 'seller'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('fillAllFields', language));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDontMatch', language));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('passwordTooShort', language));
      return;
    }

    const success = await register(formData.email, formData.password, formData.username, formData.userType);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('registrationFailed', language));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {t('register', language)}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {t('alreadyHaveAccount', language)}{' '}
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
              {t('login', language)}
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
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                {t('accountType', language)}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'buyer' })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.userType === 'buyer'
                      ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <ShoppingBag className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{t('buyer', language)}</div>
                  <div className="text-xs text-gray-400 mt-1">{t('buyerDesc', language)}</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'seller' })}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.userType === 'seller'
                      ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <Store className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{t('seller', language)}</div>
                  <div className="text-xs text-gray-400 mt-1">{t('sellerDesc', language)}</div>
                </button>
              </div>
            </div>

            <Input
              label={t('username', language)}
              type="text"
              value={formData.username}
              onChange={(value) => setFormData({ ...formData, username: value })}
              icon={User}
              required
            />

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

            <Input
              label={t('confirmPassword', language)}
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              icon={Lock}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? t('loading', language) : t('signUp', language)}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;