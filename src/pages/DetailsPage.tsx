import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SlotSelector from '../components/SlotSelector';
import BookingSummary from '../components/BookingSummary';
import Footer from '../components/Footer';
import { getExperienceById } from '../services/api';
import { Experience } from '../types';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await getExperienceById(id!);
      setExperience(data);
      
      // Auto-select first date
      if (data.slots.length > 0) {
        const firstDate = data.slots[0].date;
        setSelectedDate(firstDate);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch experience');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedSlot = () => {
    if (!experience || !selectedDate || !selectedTime) return null;
    return experience.slots.find(
      slot => slot.date === selectedDate && slot.time === selectedTime
    );
  };

  const calculatePricing = () => {
    const slot = getSelectedSlot();
    if (!slot) return { subtotal: 0, taxes: 0, total: 0 };

    const subtotal = slot.price * quantity;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + taxes;

    return { subtotal, taxes, total };
  };

  const handleConfirm = () => {
    const slot = getSelectedSlot();
    if (!slot || !experience) return;

    if (slot.availableSlots < quantity) {
      alert(`Only ${slot.availableSlots} slots available!`);
      return;
    }

    const { subtotal, taxes, total } = calculatePricing();

    // Pass booking data to checkout
    navigate('/checkout', {
      state: {
        experienceId: experience._id,
        experienceName: experience.name,
        date: selectedDate,
        time: selectedTime,
        quantity,
        subtotal,
        taxes,
        total,
        price: slot.price
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || 'Experience not found'}</p>
        </div>
      </div>
    );
  }

  const { subtotal, taxes, total } = calculatePricing();
  const selectedSlot = getSelectedSlot();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-secondary hover:text-primary mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Experiences
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Experience Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Image */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={experience.image}
                alt={experience.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Experience Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-secondary">{experience.name}</h1>
                <span className="bg-gray-200 px-3 py-1 rounded text-secondary">
                  {experience.location}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{experience.description}</p>
            </div>

            {/* Slot Selector */}
            <SlotSelector
              slots={experience.slots}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />

            {/* About Section */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-secondary">About</h3>
              <p className="text-gray-700">{experience.about}</p>
              <p className="text-gray-600 mt-2 text-sm">
                Minimum age: {experience.minAge} years
              </p>
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-secondary">Booking Details</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-gray-500">Starts at</span>
                  <p className="text-2xl font-bold text-secondary">₹{experience.basePrice}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 text-secondary">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => {
                        const maxAvailable = selectedSlot?.availableSlots || 10;
                        setQuantity(Math.min(maxAvailable, quantity + 1));
                      }}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                {selectedSlot && (
                  <div className="space-y-2 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes (5%)</span>
                      <span className="font-semibold">₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                )}

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    selectedDate && selectedTime
                      ? 'bg-primary text-secondary hover:bg-yellow-500'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedDate && selectedTime ? 'Confirm' : 'Select Date & Time'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsPage;
