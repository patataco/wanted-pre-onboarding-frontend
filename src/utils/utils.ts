import { apiClient } from './axios';
import { paths } from '../routes/paths';

export const jwtDecode = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('access_token');

    window.location.href = paths.auth.login;
  }, timeLeft);
};

export const setLocalStorage = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);

    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem('access_token');

    delete apiClient.defaults.headers.common.Authorization;
  }
};

export const validateEmail = (email: string) => {
  return /@/.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};
