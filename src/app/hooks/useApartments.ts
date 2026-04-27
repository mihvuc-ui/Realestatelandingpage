import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { projectId } from '@/utils/supabase/info';
import { apartments as staticApartments } from '@/data/apartments';
import type { Apartment } from '@/data/apartments';
import type { Database } from '@/utils/supabase/types';

type SupabaseApartment = Database['public']['Tables']['apartments']['Row'];

function convertSupabaseToApartment(apt: SupabaseApartment): Apartment {
  return {
    id: apt.id,
    name: apt.name,
    location: apt.location,
    price: apt.price,
    type: apt.type,
    squareMeters: apt.square_meters,
    bedrooms: apt.bedrooms,
    bathrooms: apt.bathrooms,
    description: apt.description_sr, // Default to Serbian
    descriptions: {
      sr: apt.description_sr,
      en: apt.description_en,
      ru: apt.description_ru,
      tr: apt.description_tr,
    },
    images: apt.images || [],
    featured: apt.featured,
    floor: apt.floor || undefined,
    heating: apt.heating || undefined,
    parking: apt.parking || undefined,
    yearRenovated: apt.year_renovated || undefined,
    orientation: apt.orientation || undefined,
    furnished: apt.furnished || undefined,
    distanceToRiver: apt.distance_to_river || undefined,
  };
}

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>(staticApartments);
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = async () => {
    setLoading(true);

    // Check if Supabase is configured (via Figma Make)
    if (!projectId) {
      console.log('⚠️ Supabase not configured, using static data');
      setApartments(staticApartments);
      setUseSupabase(false);
      setLoading(false);
      return;
    }

    console.log('✅ Supabase configured, loading from database...');

    try {
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error loading apartments from Supabase:', error);
        // Fallback to static data
        setApartments(staticApartments);
        setUseSupabase(false);
      } else {
        console.log(`✅ Loaded ${data?.length || 0} apartments from Supabase`);

        // ALWAYS use Supabase data when connected (even if empty)
        if (data && data.length > 0) {
          const converted = data.map(convertSupabaseToApartment);
          setApartments(converted);
          setUseSupabase(true);
          console.log('✅ Using Supabase data');
        } else {
          // Empty database - show no apartments instead of fallback
          setApartments([]);
          setUseSupabase(true);
          console.log('ℹ️ Supabase database is empty');
        }
      }
    } catch (err) {
      console.error('❌ Error connecting to Supabase:', err);
      setApartments(staticApartments);
      setUseSupabase(false);
    }

    setLoading(false);
  };

  return {
    apartments,
    loading,
    useSupabase,
    reload: loadApartments,
  };
}
