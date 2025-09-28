import React, { useState } from 'react';
import { Calculator, User, Lock, Eye, EyeOff, LogIn, AlertCircle, Users, Shield, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../contexts/AuthContext';

const roleLabels = {
  'expert-comptable': 'Expert-Comptable',
  'assistant': 'Assistant Comptable',
  'stagiaire': 'Stagiaire',
  'admin': 'Administrateur'
};

const roleColors = {
  'expert-comptable': 'bg-blue-100 text-blue-800',
  'assistant': 'bg-green-100 text-green-800',
  'stagiaire': 'bg-orange-100 text-orange-800',
  'admin': 'bg-purple-100 text-purple-800'
};

const roleIcons = {
  'expert-comptable': BookOpen,
  'assistant': Users,
  'stagiaire': User,
  'admin': Shield
};

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CACCompta V3.25
              </h1>
              <p className="text-sm text-gray-600 font-medium">Logiciel de Gestion Comptable</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-600">Accédez à votre espace de travail comptable</p>
          </div>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="votre.email@cabinet.ci"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

        </div>


        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>© 2024 CACCompta V3.25 - Tous droits réservés</p>
          <p>Logiciel conforme aux normes comptables OHADA</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              Aide
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              Support technique
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              À propos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}