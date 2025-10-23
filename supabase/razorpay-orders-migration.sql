-- Migration: Add Razorpay payment fields to orders table
-- Run this if you want to store Razorpay transaction details in your database

-- Add columns to existing orders table (if it exists)
-- Uncomment and run if needed:

/*
ALTER TABLE orders
ADD COLUMN razorpay_order_id VARCHAR(50),
ADD COLUMN razorpay_payment_id VARCHAR(50),
ADD COLUMN razorpay_signature TEXT;

-- Create indexes for faster lookups
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_razorpay_payment_id ON orders(razorpay_payment_id);
*/

-- OR, if creating orders table from scratch, use this structure:

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Customer Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  
  -- Order Details
  order_type VARCHAR(50) NOT NULL DEFAULT 'product',
  cart_items JSONB,
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- Payment Info
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  is_partial_cod BOOLEAN DEFAULT FALSE,
  
  -- Razorpay Integration
  razorpay_order_id VARCHAR(50),
  razorpay_payment_id VARCHAR(50),
  razorpay_signature TEXT,
  
  -- Order Status
  status VARCHAR(50) DEFAULT 'pending',
  
  -- Timestamps
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create useful indexes
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_contact ON orders(contact);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX idx_orders_razorpay_payment_id ON orders(razorpay_payment_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
