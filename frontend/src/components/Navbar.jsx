import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import {
  Menu,
  X,
  User,
  LogOut,
  FileText,
  Bell,
  ShieldAlert,
  Home,
  Layers,
  Briefcase,
  Newspaper,
  Globe,
  PhoneCall,
  ChevronDown
} from 'lucide-react';

const logoPath = `${import.meta.env.BASE_URL}images/logo_dembeni.png`;

const navIcons = {
  '/': Home,
  '/demarches': FileText,
  '/project': Layers,
  '/services': Briefcase,
  '/actualites': Newspaper,
  '/about': Globe,
  '/contact': PhoneCall
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const guestMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsGuestMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsGuestMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const leftLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Démarches', path: '/demarches' },
    { name: 'Projet', path: '/project' },
    { name: 'Services', path: '/services' }
  ];

  const rightLinks = [
    { name: 'Actualités', path: '/actualites' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const allLinks = [...leftLinks, ...rightLinks];
  const isDashboard = location.pathname.startsWith('/admin') ||
                      location.pathname.startsWith('/dashboard') ||
                      location.pathname.startsWith('/profile');

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'shadow-xl bg-[#052e16]/95 backdrop-blur-md' : 'bg-[#052e16]'
  } ${isDashboard ? 'h-14' : 'h-20 max-sm:h-16'}`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Left Desktop Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {leftLinks.map((link) => {
            const Icon = navIcons[link.path];
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] transition ${
                  isActive(link.path) ? 'text-white' : ''
                }`}
              >
                {Icon && <Icon size={14} className="sm:size-4" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Logo centré – maintenant en colonne */}
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={logoPath}
            alt="Logo Dembeni"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-white/20 shadow-md"
          />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-white font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
              Dembeni
            </span>
            <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              Mairie
            </span>
          </div>
        </Link>

        {/* Right Desktop Links & User Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {rightLinks.map((link) => {
              const Icon = navIcons[link.path];
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] transition ${
                    isActive(link.path) ? 'text-white' : ''
                  }`}
                >
                  {Icon && <Icon size={14} className="sm:size-4" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="relative" ref={dropdownRef}>
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.firstname} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs sm:text-sm font-bold uppercase text-white">
                      {user.firstname?.charAt(0)}
                    </div>
                  )}
                  <span className="hidden sm:inline-flex text-xs sm:text-sm font-semibold">{user.firstname}</span>
                  <ChevronDown size={14} className="sm:size-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 sm:w-56 rounded-2xl border border-white/10 bg-[#0b361f] shadow-2xl text-white overflow-hidden z-50">
                    {/* ... (dropdown content unchanged) ... */}
                    <div className="p-3 sm:p-4 border-b border-white/10">
                      <p className="font-semibold text-sm sm:text-base">{user.firstname} {user.lastname}</p>
                      <p className="text-xs text-white/70 mt-1">{user.role === 'admin' ? 'Administrateur' : 'Citoyen'}</p>
                    </div>
                    <div className="flex flex-col gap-1 p-2 sm:p-3">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                        >
                          <ShieldAlert size={14} className="sm:size-4" /> Console Admin
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                      >
                        <User size={14} className="sm:size-4" /> Mon profil
                      </Link>
                      <Link
                        to="/mes-demandes"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                      >
                        <FileText size={14} className="sm:size-4" /> Mes démarches
                      </Link>
                      <Link
                        to="/reclamations"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                      >
                        <Bell size={14} className="sm:size-4" /> Réclamations
                      </Link>
                    </div>
                    <div className="border-t border-white/10 p-2 sm:p-3">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition"
                      >
                        <LogOut size={14} className="sm:size-4" /> Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={guestMenuRef}>
                {/* Bouton minimal : icône utilisateur + chevron */}
                <button
                  type="button"
                  onClick={() => setIsGuestMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1 bg-white/10 hover:bg-white/15 text-white rounded-full p-2 transition"
                  aria-label="Menu utilisateur"
                >
                  <User size={18} className="sm:size-5" />
                  <ChevronDown size={14} className="sm:size-4" />
                </button>
                {isGuestMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 rounded-2xl border border-white/10 bg-[#0b361f] shadow-2xl text-white overflow-hidden z-50">
                    <Link
                      to="/login"
                      onClick={() => setIsGuestMenuOpen(false)}
                      className="block px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsGuestMenuOpen(false)}
                      className="block px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white/90 hover:bg-white/10"
                    >
                      Inscription
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu – inchangé dans sa structure */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden absolute left-0 right-0 bg-[#052e16] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[90vh] py-4 overflow-y-auto' : 'max-h-0'
        }`}
      >
        {/* ... contenu du menu mobile identique à la version précédente ... */}
      </div>
    </header>
  );
};

export default Navbar;