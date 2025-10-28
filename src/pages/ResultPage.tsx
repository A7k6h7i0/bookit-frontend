import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Booking } from '../types';

const ResultPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) fetchBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/bookings/${bookingId}`);
      setBooking(response.data.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  // Booking not found fallback (keep minimal like success)
  if (!booking) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="text-xl font-semibold text-red-500">Booking Not Found</div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="border border-green-400 text-green-700 px-5 py-1.5 rounded bg-transparent transition hover:bg-green-50"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Success case styling
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      {/* Check icon */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {/* Confirmation text */}
      <div className="text-2xl font-semibold mb-2 text-black text-center">Booking Confirmed</div>
      {/* Ref ID */}
      <div className="text-gray-500 mb-6" style={{letterSpacing: '0.5px'}}>{`Ref ID: ${booking.bookingRefId}`}</div>
      {/* Button */}
      <button
        onClick={() => navigate('/')}
        className="border border-green-400 text-green-700 px-4 py-2 rounded bg-transparent transition hover:bg-green-50"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ResultPage;
