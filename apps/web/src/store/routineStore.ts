import { create } from 'zustand';
import type { Routine } from '@ganesh-home-hub/shared-types';
import { routinesApi } from '../services/api';
import { useDeviceStore } from './deviceStore';

type ExecutionStatus = 'idle' | 'executing' | 'success' | 'error';

interface RoutineState {
  routines: Routine[];
  isLoading: boolean;
  error: string | null;
  executionStatus: Record<string, ExecutionStatus>; // per-routine status
  fetchRoutines: () => Promise<void>;
  executeRoutine: (id: string) => Promise<void>;
}

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  isLoading: true,
  error: null,
  executionStatus: {},

  fetchRoutines: async () => {
    const isFirstLoad = get().routines.length === 0;
    if (isFirstLoad) {
      set({ isLoading: true, error: null });
    } else {
      set({ error: null }); // background refresh
    }

    try {
      const routines = await routinesApi.getRoutines();
      set({ routines, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  executeRoutine: async (id: string) => {
    // 1. Show executing state with glow animation
    set((s) => ({
      executionStatus: { ...s.executionStatus, [id]: 'executing' },
    }));

    try {
      await routinesApi.execute(id);

      // 2. Show success state
      set((s) => ({
        executionStatus: { ...s.executionStatus, [id]: 'success' },
      }));

      // 3. Refetch devices so dashboard cards update without page reload
      await useDeviceStore.getState().fetchDevices();

      // 4. Reset back to idle after 2 seconds
      setTimeout(() => {
        set((s) => ({
          executionStatus: { ...s.executionStatus, [id]: 'idle' },
        }));
      }, 2000);
    } catch (error) {
      set((s) => ({
        executionStatus: { ...s.executionStatus, [id]: 'error' },
        error: (error as Error).message,
      }));
      setTimeout(() => {
        set((s) => ({
          executionStatus: { ...s.executionStatus, [id]: 'idle' },
        }));
      }, 3000);
    }
  },
}));
