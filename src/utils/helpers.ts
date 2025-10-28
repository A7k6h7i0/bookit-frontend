// Format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random booking reference
export const generateBookingRef = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Calculate discount
export const calculateDiscount = (
  subtotal: number,
  promoCode: string
): number => {
  if (promoCode === 'SAVE10') {
    return Math.round(subtotal * 0.10);
  } else if (promoCode === 'FLAT100') {
    return 100;
  }
  return 0;
};

// Check if slot is available
export const isSlotAvailable = (availableSlots: number): boolean => {
  return availableSlots > 0;
};

// Get availability status text
export const getAvailabilityText = (availableSlots: number): string => {
  if (availableSlots === 0) {
    return 'Sold out';
  } else if (availableSlots <= 5) {
    return `${availableSlots} left`;
  }
  return 'Available';
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
