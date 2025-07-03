import { create } from 'zustand';

interface ClientInfo {
  contactName: string;
  email: string;
  phone: string;
}

interface VehicleInfo {
  make: string;
  model: string;
  plate: string;
  type: string;
}

interface BookingState {
  clientInfo: ClientInfo;
  vehicleInfo: VehicleInfo;
  step: number;
  setClientInfo: (info: ClientInfo) => void;
  setVehicleInfo: (info: VehicleInfo) => void;
  goToNextStep: () => void;
  resetBooking: () => void;
  setStep: (step: number) => void;
}

const initialClientInfo: ClientInfo = {
  contactName: '',
  email: '',
  phone: '',
};

const initialVehicleInfo: VehicleInfo = {
  make: '',
  model: '',
  plate: '',
  type: '',
};

export const useBookingStore = create<BookingState>((set) => ({
  clientInfo: initialClientInfo,
  vehicleInfo: initialVehicleInfo,
  step: 1,
  setClientInfo: (info) => set({ clientInfo: info }),
  setVehicleInfo: (info) => set({ vehicleInfo: info }),
  goToNextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  resetBooking: () => set({
    clientInfo: initialClientInfo,
    vehicleInfo: initialVehicleInfo,
    step: 1,
  }),
  setStep: (step) => set({ step }),
})); 