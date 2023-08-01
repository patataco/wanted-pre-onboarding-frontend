import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
});
