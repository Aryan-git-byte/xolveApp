-- =====================================================
-- Post-Order Form: Orders Table Schema
-- =====================================================
-- This migration creates the orders table for storing
-- customer orders with all required fields
-- =====================================================

-- Drop table if exists (use with caution in production)
-- DROP TABLE IF EXISTS orders;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  -- Primary identifiers
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer information
  name TEXT NOT NULL,
  contact TEXT NOT NULL CHECK (LENGTH(contact) = 10),
  address TEXT NOT NULL CHECK (LENGTH(address) >= 10),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  pincode TEXT NOT NULL CHECK (LENGTH(pincode) = 6),
  
  -- Order details
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount > 0),
  order_type TEXT NOT NULL DEFAULT 'product',
  cart_items JSONB NOT NULL,
  shipping_details TEXT,
  
  -- Payment information
  payment_method TEXT CHECK (payment_method IN ('partial_cod', 'full_online')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'partial')),
  is_partial_cod BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Order status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')
  ),
  
  -- Future fields for payment gateway integration
  webhook_data JSONB,
  cf_order_id TEXT,
  transaction_id TEXT,
  payment_gateway TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_contact ON orders(contact);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders (by email)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Users can insert their own orders
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = email);

-- Policy: Admins can view all orders
-- Note: Create a custom claim 'role' in your Supabase auth
-- or modify this policy based on your auth setup
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Policy: Admins can update all orders
CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- =====================================================
-- Comments for documentation
-- =====================================================

COMMENT ON TABLE orders IS 'Stores customer orders with delivery and payment details';
COMMENT ON COLUMN orders.id IS 'Unique order identifier (UUID)';
COMMENT ON COLUMN orders.created_at IS 'Order creation timestamp';
COMMENT ON COLUMN orders.name IS 'Customer full name';
COMMENT ON COLUMN orders.contact IS '10-digit mobile number';
COMMENT ON COLUMN orders.email IS 'Customer email address';
COMMENT ON COLUMN orders.address IS 'Delivery address';
COMMENT ON COLUMN orders.pincode IS '6-digit Indian pincode';
COMMENT ON COLUMN orders.total_amount IS 'Total order value in rupees';
COMMENT ON COLUMN orders.order_type IS 'Type of order (product/service)';
COMMENT ON COLUMN orders.cart_items IS 'JSON array of cart items with product details';
COMMENT ON COLUMN orders.payment_method IS 'Selected payment method';
COMMENT ON COLUMN orders.payment_status IS 'Current payment status';
COMMENT ON COLUMN orders.is_partial_cod IS 'True if partial COD payment selected';
COMMENT ON COLUMN orders.status IS 'Current order status';
COMMENT ON COLUMN orders.webhook_data IS 'Payment gateway webhook response data';
COMMENT ON COLUMN orders.cf_order_id IS 'Cashfree order ID (if using Cashfree)';
COMMENT ON COLUMN orders.transaction_id IS 'Payment transaction ID';

-- =====================================================
-- Sample Query Examples
-- =====================================================

-- Get all pending orders
-- SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at DESC;

-- Get orders by email
-- SELECT * FROM orders WHERE email = 'customer@example.com';

-- Get partial COD orders
-- SELECT * FROM orders WHERE is_partial_cod = TRUE;

-- Get total revenue
-- SELECT SUM(total_amount) as total_revenue FROM orders WHERE payment_status = 'paid';

-- Get order count by status
-- SELECT status, COUNT(*) as count FROM orders GROUP BY status;

-- =====================================================
-- Rollback Script (if needed)
-- =====================================================

-- To rollback this migration:
-- DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- DROP TABLE IF EXISTS orders;
