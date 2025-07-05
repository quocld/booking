import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  year: string;
}

interface BookingState {
  clientInfo: ClientInfo;
  vehicleInfo: VehicleInfo;
  step: number;
  _hasHydrated: boolean;
  setClientInfo: (info: ClientInfo) => void;
  setVehicleInfo: (info: VehicleInfo) => void;
  goToNextStep: () => void;
  resetBooking: () => void;
  setStep: (step: number) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
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
  year: '',
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      clientInfo: initialClientInfo,
      vehicleInfo: initialVehicleInfo,
      step: 1,
      _hasHydrated: false,
      setClientInfo: (info) => set({ clientInfo: info }),
      setVehicleInfo: (info) => set({ vehicleInfo: info }),
      goToNextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
      resetBooking: () => set({
        clientInfo: initialClientInfo,
        vehicleInfo: initialVehicleInfo,
        step: 1,
      }),
      setStep: (step) => set({ step }),
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'booking-storage',
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const value = window.sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          window.sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          window.sessionStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);

// Optimized selectors to prevent unnecessary re-renders
export const useClientInfo = () => useBookingStore(
  (state) => state.clientInfo,
);

export const useVehicleInfo = () => useBookingStore(
  (state) => state.vehicleInfo,
);

export const useStep = () => useBookingStore(
  (state) => state.step,
);

export const useHasHydrated = () => useBookingStore(
  (state) => state._hasHydrated,
);

export const useBookingActions = () => useBookingStore(
  (state) => ({
    setClientInfo: state.setClientInfo,
    setVehicleInfo: state.setVehicleInfo,
    goToNextStep: state.goToNextStep,
    resetBooking: state.resetBooking,
    setStep: state.setStep,
    setHasHydrated: state.setHasHydrated,
  }),
);
