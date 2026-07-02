import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { demandeAPI } from '../api';
import Footer from '../components/Footer';
import { 
  ArrowLeft, FileText, Calendar, Clock, User, 
  MapPin, Phone, Download, AlertCircle, CheckCircle, 
  XCircle, Clock3, MessageSquare, Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DetailDemande = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemande();
  }, [id]);

  const fetchDemande = async () => {
    try {
      const res = await demandeAPI.getOne(id);
      if (!res.data.demande) {
        throw new Error('Not found');
      }
      setDemande(res.data.demande);
    } catch (err) {
      toast.error('Demande non trouvée');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': return { label: 'En attente', color: 'bg-amber-100 text-amber-700', icon: Clock3 };
      case 'approved': return { label: 'Approuvée', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle };
      case 'rejected': return { label: 'Rejetée', color: 'bg-red-100 text-red-700', icon: XCircle };
      default: return { label: status || 'Inconnu', color: 'bg-gray-100 text-gray-700', icon: AlertCircle };
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const status = getStatusInfo(demande.status);
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{demande._id?.substring(0, 8)}</span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1 font-['Poppins']">
                      {demande.title}
                    </h1>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${status.color}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="font-bold">{status.label}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Description de la demande</h3>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {demande.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Pièces jointes</h3>
                    {!demande.attachmentUrl ? (
                      <p className="text-sm text-gray-400 italic">Aucun document joint.</p>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors shadow-sm group">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <div className="max-w-[220px]">
                            <p className="text-xs font-semibold text-gray-700 truncate">{demande.attachmentUrl.split('/').pop()}</p>
                            <p className="text-[10px] text-gray-400">Pièce jointe disponible</p>
                          </div>
                        </div>
                        <a 
                          href={demande.attachmentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Informations du dossier
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Date de dépôt</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {format(new Date(demande.createdAt), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Demandeur</p>
                    <p className="text-sm font-semibold text-gray-800">Vous</p>
                    <p className="text-xs text-gray-500">{demande.citizenId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Type de demande</p>
                    <p className="text-sm font-semibold text-gray-800">{demande.type}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50">
                <p className="text-[11px] text-gray-400 leading-relaxed text-center">
                  Pour toute question concernant ce dossier, veuillez contacter le service compétent muni de votre numéro de dossier : <strong>{demande._id?.substring(0, 8)}</strong>
                </p>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-6 text-white shadow-xl">
              <h4 className="font-bold mb-2">Suivi en temps réel</h4>
              <p className="text-blue-100 text-sm mb-4">
                Vous recevrez une notification par email dès que le statut de votre demande sera mis à jour.
              </p>
              <Link 
                to="/reclamations"
                className="block text-center py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              >
                Poser une question
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetailDemande;
