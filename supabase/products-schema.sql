-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    kit_contents TEXT[] DEFAULT '{}',
    learning_outcomes TEXT[] DEFAULT '{}',
    tools_required TEXT[] DEFAULT '{}',
    assembly_steps TEXT,
    image_urls TEXT[] DEFAULT '{}',
    on_offer BOOLEAN DEFAULT false,
    discount_type TEXT,
    discount_value DECIMAL(10,2),
    discount_expiry_date TIMESTAMP WITH TIME ZONE
);

-- Insert sample product
INSERT INTO products (
    id, created_at, title, description, price, category, 
    kit_contents, learning_outcomes, tools_required, 
    assembly_steps, image_urls, on_offer
) VALUES (
    'aeca5891-6a9c-46b4-8058-c5cd3269b49c',
    '2025-09-21 07:22:35.287192+00',
    'Obstacle Avoiding Car Kit',
    'Create your own smart car that detects and avoids obstacles — no coding required! This plug-and-play kit makes it super easy for beginners to dive into robotics and electronics without any prior experience.',
    999,
    'Robotics & Sensors',
    ARRAY['Arduino UNO', 'Ultrasonic Sensor HC-SR04', 'L298N Motor Driver', 'BO Motors (x2)', 'wheels (x2)', 'Castor Wheel', 'Li-on Battery (3.7v,2000 amh) (x2)', 'Battery Holder', 'Jumper Wires', 'Switch', 'USB Cable', 'Sticker + Badge Pack'],
    ARRAY['Basic robotics concepts', 'Sensor-based automation', 'Plug-and-play wiring skills', 'Intro to obstacle avoidance logic', 'Hands-on building and assembly', 'Confidence in DIY electronics'],
    ARRAY['Scissors / Paper Cutter → To cut cardboard', 'Scale / Ruler → For accurate measurements while cutting or aligning', 'Cardboard → Used to build your car's base or body', 'Double-sided tape or glue → For fixing motors, sensors, or wires in place'],
    'Unpack all components from the kit.

Cut a rectangular cardboard base (around 15–18 cm) for the chassis.

Use tape or glue to fix the Arduino UNO, Motor Driver, and battery holder onto the chassis.

Follow the wiring diagram on the next page to connect all components using jumper wires.

Attach the BO motors and wheels to each side of the cardboard base.

Mount the ultrasonic sensor at the front like a pair of "eyes."

Fix the castor wheel underneath the front section for smooth movement.

Carefully insert the Li-ion batteries into the holder.

Switch ON the power — your car is ready to move and avoid obstacles on its own!',
    ARRAY['https://wzqvcfhjjedtgemqadsf.supabase.co/storage/v1/object/public/product-image//Obstacle-avoiding-car.jpg', 'https://wzqvcfhjjedtgemqadsf.supabase.co/storage/v1/object/public/product-image//Obstacle-wheels.jpg', 'https://wzqvcfhjjedtgemqadsf.supabase.co/storage/v1/object/public/product-image/Obstacle-Avoding-Car.jpg', 'https://wzqvcfhjjedtgemqadsf.supabase.co/storage/v1/object/public/product-image/Obstacle-car.jpg', 'https://wzqvcfhjjedtgemqadsf.supabase.co/storage/v1/object/public/product-image/Stickers.jpg'],
    false
);