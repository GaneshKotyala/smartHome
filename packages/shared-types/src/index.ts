// ─── Device Types ─────────────────────────────────────────────────────────────

export type DeviceType = 'light' | 'fan' | 'outlet' | 'scene';

export interface DeviceState {
  on?: boolean;
  brightness?: number;  // 0–100
  speed?: number;       // 1–5 (fan)
  active?: boolean;     // scenes
  [key: string]: unknown;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  state: DeviceState;
  isSimulated: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Routine Types ─────────────────────────────────────────────────────────────

export interface ManualTrigger {
  type: 'manual';
}

export interface TimeTrigger {
  type: 'time';
  cron: string; // e.g. "0 22 * * *" = every day at 10pm
}

export interface DeviceStateTrigger {
  type: 'device_state';
  deviceId: string;
  condition: { key: string; value: unknown };
}

export type RoutineTrigger = ManualTrigger | TimeTrigger | DeviceStateTrigger;

export interface RoutineAction {
  deviceId: string;
  stateChange: Partial<DeviceState>;
  delayMs?: number;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  trigger: RoutineTrigger;
  actions: RoutineAction[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Notification Types ────────────────────────────────────────────────────────

export type NotificationType = 'alert' | 'info' | 'routine';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

// ─── AI Assistant Types ────────────────────────────────────────────────────────

export type Language = 'en' | 'te';
export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  language: Language;
  createdAt: string;
}

// ─── API Response Wrappers ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}
