export interface Product {
    id: string;
    created_at: string;
    title: string;
    description: string;
    price: number;
    category: string;
    kit_contents: string[];
    learning_outcomes: string[];
    tools_required: string[];
    assembly_steps: string;
    image_urls: string[];
    on_offer: boolean;
    discount_type: string | null;
    discount_value: number | null;
    discount_expiry_date: string | null;
}