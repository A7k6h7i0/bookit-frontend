export interface Experience {
  _id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  basePrice: number;
  slots: Slot[];
  about: string;
  minAge: number;
}

export interface Slot {
  _id?: string;
  date: string;
  time: string;
  availableSlots: number;
  totalSlots: number;
  price: number;
}

export interface Booking {
  _id?: string;
  experienceId: string;
  experienceName: string;
  fullName: string;
  email: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  promoCode?: string;
  bookingRefId: string;
  status: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  discountType: string;
}
