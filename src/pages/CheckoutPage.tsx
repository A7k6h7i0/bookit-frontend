import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { createBooking, validatePromoCode } from '../services/api';

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const { experienceId, experienceName, date, time, quantity, subtotal, taxes } = bookingData;
  const total = subtotal + taxes - discount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    try {
      setPromoError('');
      const result = await validatePromoCode(promoCode, subtotal);
      setDiscount(result.discount);
      setPromoApplied(true);
      setPromoError('');
    } catch (err: any) {
      setPromoError(err.response?.data?.message || 'Invalid promo code');
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    try {
      setLoading(true);
      const booking = await createBooking({
        experienceId,
        fullName,
        email,
        date,
        time,
        quantity,
        promoCode: promoApplied ? promoCode : undefined,
      });

      navigate(`/result/${booking._id}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-secondary hover:text-primary mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h2 className="text-2xl font-bold text-secondary mb-8">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-secondary">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="input-field"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-field"
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-secondary">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoError('');
                    }}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      promoApplied
                        ? 'bg-green-500 text-white'
                        : 'bg-secondary text-white hover:bg-gray-800'
                    }`}
                  >
                    {promoApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-500 text-sm mt-1">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-1">
                    Promo code applied! You saved ₹{discount}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Try: SAVE10 or FLAT100
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 mr-2 h-4 w-4"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and safety policy
                </label>
              </div>
            </form>
          </div>

          {/* Right Section - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
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

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 btn-primary py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
