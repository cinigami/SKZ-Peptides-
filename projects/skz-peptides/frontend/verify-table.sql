-- Run this in Supabase SQL Editor to verify table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;

-- Also check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'orders';