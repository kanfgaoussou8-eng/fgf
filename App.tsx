import React, { useState } from 'react';
import HorizontalNav from './components/Layout/HorizontalNav';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ClientList from './components/Clients/ClientList';
import PlanComptable from './components/PlanComptable/PlanComptable';
import EcritureList from './components/Ecritures/EcritureList';
import Immobilisations from './components/Immobilisations/Immobilisations';
import Tresorerie from './components/Tresorerie/Tresorerie';
import Facturation from './components/Facturation/Facturation';
import Declarations from './components/Declarations/Declarations';
import Reporting from './components/Reporting/Reporting';
import Parametres from './components/Parametres/Parametres';
import LoginForm from './components/Auth/LoginForm';
import CabinetSetup from './components/Installation/CabinetSetup';
import InstallationManager from './components/Installation/InstallationManager';
import { useAuth } from './contexts/AuthContext';
import { X, RefreshCw } from 'lucide-react';

const sectionTitles = {
  'dashboard': 'Tableau de bord',
  'clients': 'Gestion des clients',
  'plan-comptable': 'Plan comptable OHADA',
  'ecritures': 'Écritures comptables',
  'immobilisations': 'Gestion des immobilisations',
  'tresorerie': 'Gestion de trésorerie',
  'facturation': 'Facturation et honoraires',
  'declarations': 'Déclarations fiscales',
  'reporting': 'Reporting et analyses',
  'parametres': 'Paramètres du cabinet'
};

const sectionDescriptions = {
  'dashboard': 'Vue d\'ensemble de l\'activité du cabinet et indicateurs clés',
  'clients': 'Gestion complète du portefeuille clients et dossiers comptables',
  'plan-comptable': 'Plan comptable général selon le référentiel OHADA',
  'ecritures': 'Saisie et validation des écritures comptables',
  'immobilisations': 'Suivi du patrimoine immobilisé et calcul des amortissements',
  'tresorerie': 'Gestion des flux de trésorerie et comptes bancaires',
  'facturation': 'Émission des factures d\'honoraires et suivi des paiements',
  'declarations': 'Suivi des obligations fiscales et déclarations',
  'reporting': 'Analyses financières et génération de rapports',
  'parametres': 'Configuration générale du cabinet et préférences',
  'installation': 'Installation et gestion multi-cabinets',
  'setup': 'Configuration d\'un nouveau cabinet'
};

export default function App() {
  const { isAuthenticated, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showConditions, setShowConditions] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);

  const handleSectionChange = (section: string) => {
    console.log('App: Changing section to:', section);
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientList />;
      case 'plan-comptable':
        return <PlanComptable />;
      case 'ecritures':
        return <EcritureList />;
      case 'immobilisations':
        return <Immobilisations />;
      case 'tresorerie':
        return <Tresorerie />;
      case 'facturation':
        return <Facturation />;
      case 'declarations':
        return <Declarations />;
      case 'reporting':
        return <Reporting />;
      case 'parametres':
        return <Parametres />;
      case 'installation':
        return <InstallationManager />;
      case 'setup':
        return <CabinetSetup />;
      default:
        return <Dashboard />;
    }
  };

  const handleConditionsClick = () => {
    setShowConditions(true);
  };

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleSystemStatusClick = () => {
    setShowSystemStatus(true);
  };

  // Afficher l'écran de connexion si non authentifié
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Afficher le loader pendant la vérification d'authentification
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HorizontalNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <div className="flex flex-col">
        <Header title={sectionTitles[activeSection as keyof typeof sectionTitles]} />
        
        {/* Breadcrumb et description */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <span className="font-semibold text-blue-600">CACCompta V3.25</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-700 font-medium">
                    {sectionTitles[activeSection as keyof typeof sectionTitles]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {sectionDescriptions[activeSection as keyof typeof sectionDescriptions]}
                </p>
              </div>
              
              {/* Actions rapides contextuelles */}
              <div className="hidden lg:flex items-center space-x-2">
                {activeSection === 'clients' && (
                  <button className="text-sm text-green-600 hover:text-green-800 font-medium px-3 py-1 rounded-lg hover:bg-green-50 transition-colors">
                    Import clients
                  </button>
                )}
                {activeSection === 'reporting' && (
                  <button className="text-sm text-purple-600 hover:text-purple-800 font-medium px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors">
                    Planifier rapport
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>© 2024 ComptaOHADA</span>
                <span>•</span>
                <span>Version 1.0.0</span>
                <span>•</span>
                <span>Conforme OHADA</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button 
                  onClick={handleConditionsClick}
                  className="hover:text-gray-700 transition-colors"
                >
                  Conditions d'utilisation
                </button>
                <button 
                  onClick={handleSupportClick}
                  className="hover:text-gray-700 transition-colors"
                >
                  Support technique
                </button>
                <button 
                  onClick={handleSystemStatusClick}
                  className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Tous systèmes opérationnels</span>
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Modals */}
        {showConditions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Conditions d'utilisation</h3>
                  <button
                    onClick={() => setShowConditions(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">CACCompta V3.25 - Conditions Générales d'Utilisation</h4>
                  
                  <h5 className="font-medium text-gray-900 mb-2">1. Objet</h5>
                  <p className="text-sm text-gray-700 mb-4">
                    CACCompta V3.25 est un logiciel de gestion comptable conforme aux normes OHADA, destiné aux cabinets d'expertise comptable et aux entreprises de la zone UEMOA.
                  </p>

                  <h5 className="font-medium text-gray-900 mb-2">2. Licence d'utilisation</h5>
                  <p className="text-sm text-gray-700 mb-4">
                    Le logiciel est fourni sous licence commerciale. L'utilisateur s'engage à respecter les droits de propriété intellectuelle et à ne pas redistribuer le logiciel sans autorisation.
                  </p>

                  <h5 className="font-medium text-gray-900 mb-2">3. Conformité OHADA</h5>
                  <p className="text-sm text-gray-700 mb-4">
                    Le logiciel respecte les dispositions du droit comptable OHADA et les normes IAS/IFRS applicables dans la zone UEMOA. Les utilisateurs sont responsables de la mise à jour de leurs pratiques selon les évolutions réglementaires.
                  </p>

                  <h5 className="font-medium text-gray-900 mb-2">4. Protection des données</h5>
                  <p className="text-sm text-gray-700 mb-4">
                    Les données clients sont stockées de manière sécurisée. L'utilisateur reste propriétaire de ses données et peut les exporter à tout moment. Le cabinet s'engage à respecter la confidentialité des informations traitées.
                  </p>

                  <h5 className="font-medium text-gray-900 mb-2">5. Responsabilités</h5>
                  <p className="text-sm text-gray-700 mb-4">
                    L'utilisateur est responsable de la sauvegarde régulière de ses données et de la vérification de la cohérence des informations saisies. Le cabinet décline toute responsabilité en cas de perte de données due à une mauvaise utilisation.
                  </p>

                  <h5 className="font-medium text-gray-900 mb-2">6. Support et maintenance</h5>
                  <p className="text-sm text-gray-700">
                    Un support technique est disponible pendant les heures ouvrables. Les mises à jour de sécurité et de conformité sont incluses dans la licence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showSupport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Support Technique</h3>
                  <button
                    onClick={() => setShowSupport(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">📞 Support Technique CAGESI</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Cabinet :</strong> Cabinet de gestion et de système d'information CAGESI</p>
                      <p><strong>Téléphone 1 :</strong> +223 90 14 78 57</p>
                      <p><strong>Téléphone 2 :</strong> +223 75 44 74 41</p>
                      <p><strong>Email :</strong> info@cagesicabinet.com</p>
                      <p><strong>Horaires :</strong> Lundi - Vendredi, 8h00 - 18h00</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">🚀 Support Prioritaire</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>WhatsApp :</strong> +223 90 14 78 57</p>
                      <p><strong>Télé-assistance :</strong> Connexion à distance disponible</p>
                      <p><strong>Formation :</strong> Sessions personnalisées sur demande</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">📚 Ressources</h4>
                    <div className="space-y-2 text-sm">
                      <p>• <strong>Manuel utilisateur :</strong> Guide complet PDF disponible</p>
                      <p>• <strong>Vidéos tutoriels :</strong> Formations en ligne</p>
                      <p>• <strong>FAQ :</strong> Questions fréquemment posées</p>
                      <p>• <strong>Mises à jour :</strong> Notes de version et nouveautés</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">⚡ Support d'urgence</h4>
                    <p className="text-sm text-gray-700">
                      En cas de problème critique (perte de données, blocage système), contactez immédiatement notre équipe d'urgence au <strong>+223 90 14 78 57</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showSystemStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">État des Systèmes</h3>
                  <button
                    onClick={() => setShowSystemStatus(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-green-900">Serveurs Principaux</h4>
                        <p className="text-sm text-green-700">Tous les services fonctionnent normalement</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">99.9%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-green-900">Base de Données</h4>
                        <p className="text-sm text-green-700">Performances optimales</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">100%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-green-900">Sauvegardes</h4>
                        <p className="text-sm text-green-700">Dernière sauvegarde : il y a 15 minutes</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">✓</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-green-900">Sécurité</h4>
                        <p className="text-sm text-green-700">Chiffrement SSL actif, pare-feu opérationnel</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">🔒</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3">📊 Statistiques Système</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Temps de réponse moyen :</span>
                        <span className="ml-2 font-medium text-blue-600">45ms</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Utilisateurs connectés :</span>
                        <span className="ml-2 font-medium text-blue-600">127</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Dernière maintenance :</span>
                        <span className="ml-2 font-medium text-blue-600">23/01/2024</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Prochaine maintenance :</span>
                        <span className="ml-2 font-medium text-blue-600">15/02/2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🔄 Mises à jour récentes</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Version 3.25.1 - Corrections mineures</span>
                        <span className="text-gray-500">20/01/2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Version 3.25.0 - Nouvelles fonctionnalités</span>
                        <span className="text-gray-500">15/01/2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patch sécurité 3.24.3</span>
                        <span className="text-gray-500">10/01/2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}