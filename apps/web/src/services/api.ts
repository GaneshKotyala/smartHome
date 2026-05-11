import type { Device, Routine } from '@ganesh-home-hub/shared-types';

// We now use the Next.js rewrite proxy. The browser hits Port 3000, and Next.js forwards it to 4000 internally.
const API_BASE_URL = '/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Base fetch wrapper configured for future expansion (e.g. JWT Auth headers).
 */
async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  // Future: headers.set('Authorization', `Bearer ${getToken()}`);

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Add 5 second timeout so it doesn't hang forever
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'An error occurred during the request.';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Ignore if not JSON
      }
      throw new ApiError(response.status, errorMessage);
    }

    // Handle empty responses
    if (response.status === 204) return {} as T;

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === 'AbortError') {
      throw new Error('Request timed out. The server is unreachable.');
    }
    throw error;
  }
}

/**
 * Devices API Layer
 */
export const devicesApi = {
  getDevices: () => fetchClient<Device[]>('/devices'),
  getDevice: (id: string) => fetchClient<Device>(`/devices/${id}`),
  updateState: (id: string, state: Record<string, any>) =>
    fetchClient<Device>(`/devices/${id}/state`, {
      method: 'PATCH',
      body: JSON.stringify({ state }),
    }),
};

export const routinesApi = {
  getRoutines: () => fetchClient<Routine[]>('/routines'),
  execute: (id: string) =>
    fetchClient<{ success: boolean; executedCount: number }>(`/routines/${id}/execute`, {
      method: 'POST',
    }),
};
