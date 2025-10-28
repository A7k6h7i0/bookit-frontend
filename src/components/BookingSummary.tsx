import React from 'react';

interface BookingSummaryProps {
  experienceName: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  experienceName,
  date,
  time,
  quantity,
  subtotal,
  taxes,
  discount,
  total,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-secondary">Booking Summary</h3>
      <div className="space-y-3 mb-6">
        <div>
          <p className="text-xs text-gray-500">Experience</p>
          <p className="font-semibold">{experienceName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="font-semibold">{date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Time</p>
          <p className="font-semibold">{time}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="font-semibold">{quantity}</p>
        </div>
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes</span>
          <span className="font-semibold">₹{taxes}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
