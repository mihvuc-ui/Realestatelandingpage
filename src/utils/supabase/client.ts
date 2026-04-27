import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { projectId, publicAnonKey } from './info';

// Supabase credentials - automatically provided by Figma Make
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
