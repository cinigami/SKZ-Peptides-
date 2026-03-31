-- Fixed SQL for existing Supabase setup
-- Run this in your Supabase SQL Editor

-- Drop existing policy if it exists, then recreate
DROP POLICY IF EXISTS "Allow all operations for admin" ON orders;

-- Ensure the table exists with all columns
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS id TEXT,
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS total DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Set primary key if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE table_name = 'orders' 
        AND constraint_type = 'PRIMARY KEY'
    ) THEN
        ALTER TABLE orders ADD PRIMARY KEY (id);
    END IF;
END $$;

-- Create indexes (will skip if they already exist)
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Recreate the policy
CREATE POLICY "Allow all operations for admin" ON orders
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add status constraint if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.check_constraints 
        WHERE table_name = 'orders' 
        AND check_clause LIKE '%status%'
    ) THEN
        ALTER TABLE orders ADD CONSTRAINT orders_status_check 
        CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered'));
    END IF;
END $$;

-- Create or replace trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at 
BEFORE UPDATE ON orders 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify table structure
SELECT 'Table setup complete!' as status;