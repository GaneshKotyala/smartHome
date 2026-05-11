import type { Device } from '@ganesh-home-hub/shared-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

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

  const response = await fetch(url, config);

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
