import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-950 via-green-950 to-emerald-950 text-slate-300 pt-16 pb-8 border-t border-green-800/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold flex items-center space-x-2">
              <span className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-sm">D</span>
              <span>Mairie de Dembéni</span>
            </h3>
            <p className="text-slate-300/80 text-sm">
              Simplifier les démarches administratives et favoriser le développement local pour tous nos citoyens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition-colors text-xl"><FiFacebook /></a>
              <a href="#" className="hover:text-green-300 transition-colors text-xl"><FiTwitter /></a>
              <a href="#" className="hover:text-pink-400 transition-colors text-xl"><FiInstagram /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-white transition-colors">Nos Services</Link></li>
              <li><Link to="/actualites" className="hover:text-white transition-colors">Actualités</Link></li>
              <li><Link to="/demarches" className="hover:text-white transition-colors">Démarches</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">La Commune</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services Publics</h4>
            <ul className="space-y-3">
              <li>Maison France Services</li>
              <li>CADEMA - Déchets</li>
              <li>Épicerie Solidaire</li>
              <li>Aide Sociale</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-green-400" />
                <span>1 Place de la Mairie, 97660 Dembéni</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-green-400" />
                <span>02 69 61 11 11</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-green-400" />
                <span>Dembénimairie@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800/30 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Mairie de Dembéni. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
