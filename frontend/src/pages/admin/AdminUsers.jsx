import { useState, useEffect } from 'react';
import { adminAPI } from '../../api';
import { 
  Users, Search, Shield, Trash2, 
  ToggleLeft, ToggleRight, Mail, Ban, 
  MapPin, Phone, User as UserIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      setUsers(res.data.data);
    } catch (err) {
      toast.error('Erreur chargement utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateUser = async (id) => {
    try {
      await adminAPI.validateUser(id);
      toast.success('Utilisateur approuvé');
      fetchUsers();
    } catch (err) {
      toast.error('Erreur lors de la validation');
    }
  };

  const handleRejectUser = async (id) => {
    try {
      await adminAPI.rejectUser(id);
      toast.success('Utilisateur rejeté');
      fetchUsers();
    } catch (err) {
      toast.error('Erreur lors du rejet');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet utilisateur définitivement ?')) {
      try {
        await adminAPI.deleteUser(id);
        toast.success('Utilisateur supprimé');
        fetchUsers();
      } catch (err) {
        toast.error('Erreur suppression');
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const fullName = `${u.firstname || ''} ${u.lastname || ''}`.trim().toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-['Poppins']">Base des Citoyens</h1>
           <p className="text-gray-500">Gérez les comptes utilisateurs et les droits d'accès.</p>
        </div>
        <div className="relative w-full sm:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder="Nom, Email..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse"></div>)
        ) : (
          filteredUsers.map(u => (
            <div key={u._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
               <div className={`h-24 ${u.role === 'admin' ? 'gradient-blue' : 'bg-gray-100'} p-6 flex justify-end items-start`}>
                  {u.role === 'admin' && <Shield className="w-6 h-6 text-white/50" />}
               </div>
               <div className="px-8 pb-8 relative">
                  <div className="w-20 h-20 rounded-3xl border-4 border-white bg-white shadow-xl -mt-10 mb-6 flex items-center justify-center text-blue-600 text-3xl font-bold">
                    {( `${u.firstname || ''} ${u.lastname || ''}`.trim().charAt(0) || 'U').toUpperCase()}
                  </div>
                  
                  <div className="mb-6">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{`${u.firstname || ''} ${u.lastname || ''}`.trim() || 'Utilisateur'}</h3>
                        {u.status !== 'approved' && <Ban className="w-4 h-4 text-red-500" />}
                     </div>
                     <p className="text-sm text-gray-500 flex items-center gap-2 italic">
                        <Mail className="w-3.5 h-3.5" /> {u.email}
                     </p>
                  </div>

                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3 text-xs text-gray-500">
                        <Phone className="w-3.5 h-3.5 text-blue-500" /> 
                        {u.phone || 'Non spécifié'}
                     </div>
                     <div className="flex items-center gap-3 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> 
                        <span className="truncate">{u.address || u.quartier || 'Aucune adresse'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                           {u.role}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${u.status === 'approved' ? 'text-emerald-500' : 'text-red-500'}`}>
                           ● {u.status === 'approved' ? 'Approuvé' : u.status === 'pending' ? 'En attente' : 'Refusé'}
                        </span>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleValidateUser(u._id)}
                       className="flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100"
                     >
                       Approuver
                     </button>
                     <button 
                       onClick={() => handleRejectUser(u._id)}
                       className="flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100"
                     >
                       Rejeter
                     </button>
                     <button 
                       onClick={() => handleDelete(u._id)}
                       className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center border border-red-100"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
