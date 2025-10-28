import React from 'react';
import { Slot } from '../types';

interface SlotSelectorProps {
  slots: Slot[];
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  slots,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {
  // Get unique dates
  const uniqueDates = Array.from(new Set(slots.map(slot => slot.date)));

  // Get time slots for selected date
  const timeSlots = slots.filter(slot => slot.date === selectedDate);

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-secondary">Choose Date</h3>
        <div className="flex flex-wrap gap-2">
          {uniqueDates.map((date) => (
            <button
              key={date}
              onClick={() => onDateSelect(date)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDate === date
                  ? 'bg-primary text-secondary'
                  : 'bg-white border border-gray-300 text-secondary hover:border-primary'
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-secondary">Choose Time</h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={`${slot.date}-${slot.time}`}
                onClick={() => slot.availableSlots > 0 && onTimeSelect(slot.time)}
                disabled={slot.availableSlots === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                  selectedTime === slot.time
                    ? 'bg-primary text-secondary'
                    : slot.availableSlots === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-secondary hover:border-primary'
                }`}
              >
                <span>{slot.time}</span>
                {slot.availableSlots > 0 && slot.availableSlots <= 5 && (
                  <span className="ml-2 text-xs text-red-500">
                    {slot.availableSlots} left
                  </span>
                )}
                {slot.availableSlots === 0 && (
                  <span className="ml-2 text-xs">Sold out</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotSelector;
