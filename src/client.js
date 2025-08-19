import { createClient } from "@supabase/supabase-js";
const URL = 'https://gkkemadulcdnqgvhruvh.supabase.co'
const API_KEY = 'sb_publishable_TacpRdQFXMshhujoaPchLQ_kU19hG7j'

export const supabase = createClient(URL, API_KEY);