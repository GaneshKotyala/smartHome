import { create } from 'zustand';
import type { Device } from '@ganesh-home-hub/shared-types';
import { devicesApi } from '../services/api';

interface DeviceState {
  devices: Device[];
  isLoading: boolean;
  error: string | null;
  fetchDevices: () => Promise<void>;
  toggleDevice: (id: string) => Promise<void>;
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
  devices: [],
  isLoading: true,
  error: null,

  fetchDevices: async () => {
    const isFirstLoad = get().devices.length === 0;
    if (isFirstLoad) {
      set({ isLoading: true, error: null });
    } else {
      set({ error: null }); // background refresh
    }

    try {
      const devices = await devicesApi.getDevices();
      set({ devices, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  toggleDevice: async (id: string) => {
    const { devices } = get();
    const device = devices.find((d) => d.id === id);
    if (!device) return;

    const currentState = device.state?.on ?? false;
    const newState = !currentState;

    // 1. Optimistic Update
    set({
      devices: devices.map((d) =>
        d.id === id ? { ...d, state: { ...d.state, on: newState } } : d
      ),
    });

    // 2. API Call
    try {
      await devicesApi.updateState(id, { on: newState });
    } catch (error) {
      // 3. Revert on failure
      set({
        devices: devices.map((d) =>
          d.id === id ? { ...d, state: { ...d.state, on: currentState } } : d
        ),
        error: `Failed to toggle device: ${(error as Error).message}`,
      });
    }
  },
}));
