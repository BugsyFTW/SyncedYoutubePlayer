export const PLAYER_ID = 'Synced-YouTube-Player';
export const ID_REGEX = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
export const TIME_CHANGE_EVENT = 'onPlayerTimeChange';

// Event names

export enum SocketEvent {
  // Connection
  CONNECTION = 'connect',
  USER_CONNECTED = 'user_connection',
  CONNECTION_ERROR = 'connect_error',
  // Video loading
  LOADING_VIDEO = 'loading_video',
  LOAD_VIDEO = 'load_video',
  // Video state change
  STATE_CHANGE = 'state_change',
}

//export const ON_USER_CONNECTION = 'user_connection';
export const ON_OWNER_VIDEO_CHANGED = 'owner_video_changed';
export const ON_VIDEO_CHANGED = 'video_changed';