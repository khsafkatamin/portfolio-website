import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  order_index: number;
  created_at: string;
  categories?: Category[];
}
