import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { X, Plus, Trash2, Edit2, Save } from 'lucide-react';
import type { Database } from '@/utils/supabase/types';
import { ImageUploader } from './ImageUploader';

type Apartment = Database['public']['Tables']['apartments']['Row'];
type ApartmentInsert = Database['public']['Tables']['apartments']['Insert'];

interface ApartmentManagerProps {
  onClose: () => void;
}

export function ApartmentManager({ onClose }: ApartmentManagerProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<ApartmentInsert>>({
    name: '',
    location: '',
    price: 0,
    type: 'sale',
    square_meters: 0,
    bedrooms: 0,
    bathrooms: 0,
    description_sr: '',
    description_en: '',
    description_ru: '',
    description_tr: '',
    images: [],
    featured: false,
  });

  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading apartments:', error);
    } else {
      setApartments(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('apartments')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        console.error('Error updating apartment:', error);
        alert('Greška pri ažuriranju oglasa: ' + error.message);
      } else {
        alert('Oglas uspešno ažuriran!');
        setEditingId(null);
        resetForm();
        loadApartments();
      }
    } else {
      const { error } = await supabase
        .from('apartments')
        .insert([formData as ApartmentInsert]);

      if (error) {
        console.error('Error adding apartment:', error);
        alert('Greška pri dodavanju oglasa: ' + error.message);
      } else {
        alert('Oglas uspešno dodat!');
        setShowAddForm(false);
        resetForm();
        loadApartments();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Da li ste sigurni da želite da obrišete ovaj oglas?')) {
      return;
    }

    const { error } = await supabase
      .from('apartments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting apartment:', error);
      alert('Greška pri brisanju oglasa: ' + error.message);
    } else {
      alert('Oglas uspešno obrisan!');
      loadApartments();
    }
  };

  const handleEdit = (apartment: Apartment) => {
    setFormData({
      name: apartment.name,
      location: apartment.location,
      price: apartment.price,
      type: apartment.type,
      square_meters: apartment.square_meters,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      description_sr: apartment.description_sr,
      description_en: apartment.description_en,
      description_ru: apartment.description_ru,
      description_tr: apartment.description_tr,
      images: apartment.images,
      featured: apartment.featured,
      floor: apartment.floor,
      heating: apartment.heating,
      parking: apartment.parking,
      year_renovated: apartment.year_renovated,
      orientation: apartment.orientation,
      furnished: apartment.furnished,
      distance_to_river: apartment.distance_to_river,
    });
    setEditingId(apartment.id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      price: 0,
      type: 'sale',
      square_meters: 0,
      bedrooms: 0,
      bathrooms: 0,
      description_sr: '',
      description_en: '',
      description_ru: '',
      description_tr: '',
      images: [],
      featured: false,
    });
  };

  const handleImageUrlsChange = (value: string) => {
    const urls = value.split('\n').filter(url => url.trim());
    setFormData({ ...formData, images: urls });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Panel - Upravljanje Oglasima
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add Button */}
          {!showAddForm && (
            <button
              onClick={() => {
                setShowAddForm(true);
                resetForm();
                setEditingId(null);
              }}
              className="mb-6 flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Dodaj Novi Oglas
            </button>
          )}

          {/* Add/Edit Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="text-xl font-bold mb-4">
                {editingId ? 'Izmeni Oglas' : 'Dodaj Novi Oglas'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Naziv</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lokacija</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cena (€)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tip</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sale' | 'rent' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  >
                    <option value="sale">Prodaja</option>
                    <option value="rent">Izdavanje</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Površina (m²)</label>
                  <input
                    type="number"
                    value={formData.square_meters}
                    onChange={(e) => setFormData({ ...formData, square_meters: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Broj Spavaćih Soba</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Broj Kupatila</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sprat</label>
                  <input
                    type="text"
                    value={formData.floor || ''}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Grejanje</label>
                  <input
                    type="text"
                    value={formData.heating || ''}
                    onChange={(e) => setFormData({ ...formData, heating: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Parking</label>
                  <input
                    type="text"
                    value={formData.parking || ''}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Godina Renoviranja</label>
                  <input
                    type="text"
                    value={formData.year_renovated || ''}
                    onChange={(e) => setFormData({ ...formData, year_renovated: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Orijentacija</label>
                  <input
                    type="text"
                    value={formData.orientation || ''}
                    onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nameštaj</label>
                  <input
                    type="text"
                    value={formData.furnished || ''}
                    onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Udaljenost od Reke</label>
                  <input
                    type="text"
                    value={formData.distance_to_river || ''}
                    onChange={(e) => setFormData({ ...formData, distance_to_river: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Istaknuti Oglas (Featured)</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Opis (Srpski)</label>
                <textarea
                  value={formData.description_sr}
                  onChange={(e) => setFormData({ ...formData, description_sr: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Opis (Engleski)</label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Opis (Ruski)</label>
                <textarea
                  value={formData.description_ru}
                  onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Opis (Turski)</label>
                <textarea
                  value={formData.description_tr}
                  onChange={(e) => setFormData({ ...formData, description_tr: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-4">
                  Slike Stana
                </label>
                <ImageUploader
                  images={formData.images || []}
                  onChange={(images) => setFormData({ ...formData, images })}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Sačuvaj Izmene' : 'Dodaj Oglas'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                >
                  Otkaži
                </button>
              </div>
            </form>
          )}

          {/* Apartments List */}
          {loading ? (
            <div className="text-center py-12">Učitavam oglase...</div>
          ) : apartments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Nema oglasa. Dodajte prvi oglas!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {apartments.map((apartment) => (
                <div
                  key={apartment.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-start gap-4"
                >
                  {apartment.images && apartment.images.length > 0 && (
                    <img
                      src={apartment.images[0]}
                      alt={apartment.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{apartment.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {apartment.location}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                        €{apartment.price.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                        {apartment.square_meters}m²
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        {apartment.bedrooms} sobe
                      </span>
                      {apartment.featured && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(apartment)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(apartment.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
