"use client";

import { CheckCircle, Package, ShoppingBag, ArrowRight, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CartItem {
  title?: string;
  name?: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  pincode: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  status: string;
  is_partial_cod?: boolean;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  created_at: string;
  cart_items: CartItem[];
}

interface OrderSuccessProps {
  order: Order;
  onContinueShopping: () => void;
}

export default function OrderSuccess({ 
  order, 
  onContinueShopping 
}: OrderSuccessProps) {
  // Format date to readable string
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', {
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true
    });
  }

  // Generate professional PDF invoice
  const handleDownloadBill = async () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Color palette
      const primaryBlue: [number, number, number] = [37, 99, 235];
      const darkGray: [number, number, number] = [51, 51, 51];
      const mediumGray: [number, number, number] = [128, 128, 128];
      const lightBg: [number, number, number] = [248, 250, 252];
      const white: [number, number, number] = [255, 255, 255];

      // Company Header
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryBlue);
      doc.text("XOLVETECH", margin, yPos);
      yPos += 7;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mediumGray);
      doc.text("Your Technology Partner", margin, yPos);
      yPos += 4;
      doc.text("support@xolvetech.com | www.xolvetech.in", margin, yPos);
      yPos += 10;

      // Horizontal separator
      doc.setDrawColor(...primaryBlue);
      doc.setLineWidth(0.8);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 12;

      // Invoice Title
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkGray);
      doc.text("TAX INVOICE", pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Order Metadata (compact layout)
      doc.setFontSize(10);
      doc.setTextColor(...darkGray);
      
      // Order ID
      doc.setFont("helvetica", "bold");
      doc.text("Order ID:", margin, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(order.id.slice(0, 20).toUpperCase(), margin + 25, yPos);
      yPos += 6;

      // Order Date
      doc.setFont("helvetica", "bold");
      doc.text("Order Date:", margin, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(formatDate(order.created_at), margin + 25, yPos);
      yPos += 6;

      // Payment Status
      doc.setFont("helvetica", "bold");
      doc.text("Status:", margin, yPos);
      
      const paymentStatus = order.payment_status === 'paid' ? 'PAID' : 
                           order.payment_status === 'partial' ? 'PARTIALLY PAID' : 'UNPAID';
      const statusColor: [number, number, number] = order.payment_status === 'paid' ? [34, 197, 94] : 
                         order.payment_status === 'partial' ? [59, 130, 246] : [245, 158, 11];
      
      doc.setFillColor(...statusColor);
      doc.roundedRect(margin + 25, yPos - 4, 35, 6, 1.5, 1.5, 'F');
      doc.setTextColor(...white);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(paymentStatus, margin + 42.5, yPos, { align: 'center' });
      
      yPos += 12;

      // Customer & Payment Details (side by side)
      const boxHeight = 35;
      const boxWidth = (pageWidth - 2 * margin - 6) / 2;
      
      // Customer Details Box
      doc.setFillColor(...lightBg);
      doc.roundedRect(margin, yPos, boxWidth, boxHeight, 2, 2, 'F');
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryBlue);
      doc.text("CUSTOMER DETAILS", margin + 4, yPos + 7);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkGray);
      doc.text(order.name, margin + 4, yPos + 14);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...mediumGray);
      doc.text(order.contact, margin + 4, yPos + 19);
      doc.text(order.email, margin + 4, yPos + 24);
      
      const addressText = doc.splitTextToSize(`${order.address}, ${order.pincode}`, boxWidth - 8);
      doc.text(addressText, margin + 4, yPos + 29);
      
      // Payment Details Box
      const rightBoxX = margin + boxWidth + 6;
      doc.setFillColor(...lightBg);
      doc.roundedRect(rightBoxX, yPos, boxWidth, boxHeight, 2, 2, 'F');
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryBlue);
      doc.text("PAYMENT DETAILS", rightBoxX + 4, yPos + 7);
      
      doc.setFontSize(9);
      doc.setTextColor(...darkGray);
      
      const paymentMethod = order.payment_method === 'partial_cod' ? 'Partial COD' : 'Full Online Payment';
      const transactionId = order.razorpay_payment_id || order.razorpay_order_id || 'N/A';
      
      doc.setFont("helvetica", "bold");
      doc.text("Payment Method:", rightBoxX + 4, yPos + 14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mediumGray);
      doc.text(paymentMethod, rightBoxX + 4, yPos + 19);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...darkGray);
      doc.text("Transaction ID:", rightBoxX + 4, yPos + 24);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...mediumGray);
      const txnText = doc.splitTextToSize(transactionId, boxWidth - 8);
      doc.text(txnText, rightBoxX + 4, yPos + 29);
      
      yPos += boxHeight + 14;

      // Order Items Table
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryBlue);
      doc.text("ORDER ITEMS", margin, yPos);
      yPos += 7;

      // Prepare table data with proper number formatting
      const tableData = order.cart_items.map((item: CartItem) => {
        const itemName = item.title || item.name || 'Unknown Item';
        const qty = item.quantity.toString();
        const price = `₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const total = `₹${(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        return [itemName, qty, price, total];
      });

      const subtotal = order.cart_items.reduce((sum: number, item: CartItem) => 
        sum + (item.price * item.quantity), 0);
      const tax = 0;
      const grandTotal = order.total_amount;

      autoTable(doc, {
        startY: yPos,
        head: [['Item Description', 'Qty', 'Unit Price', 'Amount']],
        body: tableData,
        foot: [
          [
            { content: 'Subtotal:', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, styles: { halign: 'right', fontStyle: 'bold' } }
          ],
          [
            { content: 'Tax (GST):', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: `₹${tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, styles: { halign: 'right', fontStyle: 'bold' } }
          ],
          [
            { content: 'Grand Total:', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fontSize: 11, fillColor: [37, 99, 235], textColor: [255, 255, 255] } },
            { content: `₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, styles: { halign: 'right', fontStyle: 'bold', fontSize: 11, fillColor: [37, 99, 235], textColor: [255, 255, 255] } }
          ]
        ],
        theme: 'striped',
        headStyles: {
          fillColor: primaryBlue,
          textColor: white,
          fontSize: 10,
          fontStyle: 'bold',
          halign: 'left',
          cellPadding: 5
        },
        footStyles: {
          fillColor: lightBg,
          textColor: darkGray,
          fontSize: 10,
          fontStyle: 'bold',
          cellPadding: 4
        },
        bodyStyles: {
          fontSize: 9,
          textColor: darkGray,
          cellPadding: 4
        },
        alternateRowStyles: {
          fillColor: [252, 252, 252]
        },
        columnStyles: {
          0: { cellWidth: 85, halign: 'left' },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 40, halign: 'right' },
          3: { cellWidth: 40, halign: 'right' }
        },
        margin: { left: margin, right: margin }
      });

      // @ts-ignore
      yPos = doc.lastAutoTable.finalY + 15;

      // Terms & Conditions
      if (yPos < pageHeight - 50) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...darkGray);
        doc.text("Terms & Conditions:", margin, yPos);
        yPos += 6;

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mediumGray);
        const terms = [
          "1. All products are covered under manufacturer's warranty.",
          "2. Return and exchange policy applies as per company guidelines.",
          "3. For support, contact us at support@xolvetech.com"
        ];
        terms.forEach(term => {
          doc.text(term, margin, yPos);
          yPos += 5;
        });
      }

      // Footer
      const footerY = pageHeight - 20;
      doc.setDrawColor(...mediumGray);
      doc.setLineWidth(0.3);
      doc.line(margin, footerY, pageWidth - margin, footerY);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...mediumGray);
      doc.text("Thank you for shopping with Xolvetech!", pageWidth / 2, footerY + 5, { align: 'center' });
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, footerY + 10, { align: 'center' });

      // Save PDF
      doc.save(`Xolvetech_Invoice_${order.id.slice(0, 8).toUpperCase()}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF invoice. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 animate-pulse">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-600">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Order Summary
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Order ID:</span>
            <span className="font-bold text-gray-900 dark:text-gray-100 font-mono">{order.id.slice(0, 12).toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Customer Name:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{order.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Contact:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{order.contact}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Email:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-right break-all max-w-[60%]">{order.email}</span>
          </div>
          <div className="pt-3">
            <div className="flex justify-between items-start">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Delivery Address:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-right max-w-[60%]">
                {order.address}, {order.pincode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mb-4">
          💳 Payment Details
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium text-base">Total Amount:</span>
            <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">₹{order.total_amount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-blue-200 dark:border-blue-700">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Payment Method:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {order.payment_method === "partial_cod" ? "Partial COD" : "Full Online Payment"}
            </span>
          </div>
          {order.is_partial_cod && (
            <div className="bg-white dark:bg-gray-700 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-blue-600 dark:text-blue-400">
                <span className="font-medium">Paid Online:</span>
                <span className="font-bold">₹50</span>
              </div>
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span className="font-medium">Pay on Delivery:</span>
                <span className="font-bold">₹{(order.total_amount - 50).toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-t border-blue-200 dark:border-blue-700">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Payment Status:</span>
            <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
              order.payment_status === "paid" 
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300"
                : order.payment_status === "partial"
                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-300"
                : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-300"
            }`}>
              {order.payment_status === "paid" ? "✓ Paid" : order.payment_status === "partial" ? "⚡ Partial" : "⏳ Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20 rounded-xl p-5 mb-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            Order Status
          </h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Your order is currently <span className="font-bold text-purple-600 dark:text-purple-400 uppercase">{order.status}</span>. 
          You will receive updates via email and SMS.
        </p>
      </div>

      {/* Items Summary */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {order.cart_items.length} item{order.cart_items.length !== 1 ? 's' : ''} in this order
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleDownloadBill}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </button>
        <button
          onClick={onContinueShopping}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Info Notice */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-600">
        <p className="text-xs text-yellow-800 dark:text-yellow-300 text-center font-medium">
          💡 <span className="font-bold">Demo Mode:</span> Payment gateway integration is in progress. This is a test order.
        </p>
      </div>
    </div>
  );
}