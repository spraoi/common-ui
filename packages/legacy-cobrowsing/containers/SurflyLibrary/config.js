import { CONFIG } from './constants';

export const INIT_SETTINGS = {
  allow_original_file_download: CONFIG.ALLOW_FILE_DOWNLOAD,
  agent_can_take_control: CONFIG.ALLOW_TAKE_CONTROL,
};

export const START_SESSION_CONFIG = {
  docked_only: CONFIG.DOCKED_ONLY,
  dock_position: CONFIG.DOCKED_POSITION,
};
