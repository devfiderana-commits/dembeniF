import { useState, useEffect } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContextData';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Déconnexion réussie');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    authAPI.getMe()
      .then(res => {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { data } = res.data;
    const userData = {
      _id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role,
      status: data.status,
      phone: data.phone || '',
      address: data.address || '',
      quartier: data.quartier || '',
      profileImage: data.profileImage || ''
    };
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    toast.success(`Bienvenue, ${userData.firstname} !`);
    return userData;
  };

  const register = async (data) => {
    const res = await authAPI.register(data);
    const userData = res.data.data;
    toast.success('Compte créé avec succès ! Veuillez vous connecter une fois votre compte validé.');
    return userData;
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
