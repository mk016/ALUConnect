export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
  UPLOAD_PHOTO: `${API_BASE_URL}/auth/upload-photo`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  HIRE_FREELANCER: `${API_BASE_URL}/freelancer/hire`,
  GET_FREELANCERS: `${API_BASE_URL}/freelancer/list`,
  GET_NOTIFICATIONS: `${API_BASE_URL}/notifications`,
  GET_OPPORTUNITIES: `${API_BASE_URL}/opportunities`,
  POST_OPPORTUNITY: `${API_BASE_URL}/opportunities`,
  RESPOND_TO_APPLICATION: `${API_BASE_URL}/opportunities/applications`,
  APPLY_TO_OPPORTUNITY: `${API_BASE_URL}/opportunities/apply`,
}; 