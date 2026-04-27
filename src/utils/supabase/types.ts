export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          location: string;
          price: number;
          type: 'sale' | 'rent';
          property_type: string | null;
          square_meters: number;
          bedrooms: number;
          bathrooms: number;
          description_sr: string;
          description_en: string;
          description_ru: string;
          description_tr: string;
          images: string[];
          featured: boolean;
          floor: string | null;
          heating: string | null;
          parking: string | null;
          year_renovated: string | null;
          orientation: string | null;
          furnished: string | null;
          distance_to_river: string | null;
          land_location: string | null;
          building_on_land: string | null;
          land_type: string | null;
        };
        Insert: Omit<Database['public']['Tables']['apartments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['apartments']['Insert']>;
      };
      contact_submissions: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          apartment_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
      };
    };
  };
}
