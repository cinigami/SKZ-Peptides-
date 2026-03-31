-- SKZ Peptides Orders Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  notes TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON orders(customer_name);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (you can adjust this based on your auth setup)
-- For now, allowing all operations (you may want to restrict this later)
CREATE POLICY "Allow all operations for admin" ON orders
FOR ALL 
USING (true)
WITH CHECK (true);

-- Optional: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
BEFORE UPDATE ON orders 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional, remove if you want to start fresh)
-- INSERT INTO orders (id, customer_name, customer_phone, notes, items, total, status) VALUES
-- ('ORD-sample-001', 'Test Customer', '+60123456789', 'Sample order', '[{"id": "retatrutide-5mg", "name": "Retatrutide 5mg", "price": 199, "qty": 1}]'::jsonb, 199.00, 'Pending');

COMMENT ON TABLE orders IS 'SKZ Peptides customer orders with real-time sync across devices';