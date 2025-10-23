"use client";

import { useState } from "react";
import { OrderFormData } from "@/lib/types/order";
import { User, Phone, Mail, MapPin, Hash } from "lucide-react";

interface OrderDetailsFormProps {
  onSubmit: (data: OrderFormData) => void;
  onCancel: () => void;
  initialData?: Partial<OrderFormData>;
}

export default function OrderDetailsForm({ 
  onSubmit, 
  onCancel, 
  initialData = {} 
}: OrderDetailsFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: initialData.name || "",
    contact: initialData.contact || "",
    address: initialData.address || "",
    email: initialData.email || "",
    pincode: initialData.pincode || "",
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Contact validation (10 digit Indian mobile)
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit mobile number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    // Pincode validation (6 digit Indian pincode)
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Delivery Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                errors.name 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Contact Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                errors.contact 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition`}
              placeholder="9876543210"
            />
          </div>
          {errors.contact && (
            <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                errors.email 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                errors.address 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition resize-none`}
              placeholder="House/Flat No., Street, Area, City, State"
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        {/* Pincode Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                errors.pincode 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition`}
              placeholder="400001"
            />
          </div>
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
