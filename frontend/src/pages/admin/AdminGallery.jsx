import { AlertCircle } from 'lucide-react';

const AdminGallery = () => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 flex items-start gap-4">
        <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-amber-900 text-lg mb-2">Galerie Non Disponible</h3>
          <p className="text-amber-800">La fonctionnalité de galerie photo ne sera disponible que lorsque le backend supportera cette feature.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
 
