// Common constants
export const PROCESS_TERMINATE_CODE = 'SIGTERM';
export const PROCESS_INTERRUPT_CODE = 'SIGINT';

// Route constants
export const AUTH_PATH = '/auth';
export const USER_PATH = '/user';
export const ROOM_PATH = '/room';

export enum SocketEvent {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  USER_CONNECTION = 'user_connection',
  LOADING_VIDEO = 'loading_video',
  LOAD_VIDEO = 'load_video',
  STATE_CHANGE = 'state_change',
}

// Event names
export const ON_USER_CONNECTION = 'user_connection';
export const ON_OWNER_VIDEO_CHANGED = 'owner_video_changed';
export const ON_VIDEO_CHANGED = 'video_changed';