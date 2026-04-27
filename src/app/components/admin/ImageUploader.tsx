import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `apartments/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('apartment-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('apartment-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    const newImages: string[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validation
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} nije slika. Preskačem...`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`${file.name} je prevelika (max 5MB). Preskačem...`);
        continue;
      }

      const url = await uploadImage(file);
      if (url) {
        newImages.push(url);
      }

      setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
    }

    onChange([...images, ...newImages]);
    setUploading(false);
    setUploadProgress(0);

    // Reset input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
          <Upload className="w-5 h-5" />
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Upload-ujem... {uploadProgress}%</span>
            </>
          ) : (
            <span>Upload Slike</span>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {images.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {images.length} {images.length === 1 ? 'slika' : 'slika'}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={url}
                alt={`Slika ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Number Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Nema upload-ovanih slika
          </p>
          <p className="text-sm text-gray-500">
            Kliknite "Upload Slike" da dodate fotografije stana
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Saveti:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Podržani formati: JPG, PNG, WebP</li>
          <li>Maksimalna veličina: 5MB po slici</li>
          <li>Možete izabrati više slika odjednom</li>
          <li>Prevucite slike da promenite redosled (coming soon)</li>
        </ul>
      </div>
    </div>
  );
}
