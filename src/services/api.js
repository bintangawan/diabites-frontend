import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://diabitesapi.bintangin.com/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

const authRuntime = {
  getAccessToken: () => null,
  getRefreshToken: () => null,
  onTokensUpdated: () => {},
  onUnauthorized: () => {},
};

let refreshPromise = null;

const shouldSkipRefresh = (config) => {
  const url = config?.url || '';
  return url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
};

const refreshAccessToken = async () => {
  const refreshToken = authRuntime.getRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token tidak tersedia');
  }

  const response = await axios.post(
    `${API_BASE_URL}/auth/refresh`,
    { refreshToken },
    { timeout: 120000 },
  );

  const tokens = response.data?.data;

  if (!tokens?.accessToken || !tokens?.refreshToken) {
    throw new Error('Respons refresh token tidak valid');
  }

  authRuntime.onTokensUpdated(tokens);
  return tokens.accessToken;
};

api.interceptors.request.use((config) => {
  const accessToken = authRuntime.getAccessToken();

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest)
    ) {
      throw error;
    }

    originalRequest._retry = true;

    try {
      refreshPromise ||= refreshAccessToken();
      const nextAccessToken = await refreshPromise;
      refreshPromise = null;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;
      authRuntime.onUnauthorized();
      throw refreshError;
    }
  },
);

const unwrapResponse = (response) => response.data;

export const configureApiAuth = ({
  getAccessToken,
  getRefreshToken,
  onTokensUpdated,
  onUnauthorized,
}) => {
  authRuntime.getAccessToken = getAccessToken;
  authRuntime.getRefreshToken = getRefreshToken;
  authRuntime.onTokensUpdated = onTokensUpdated;
  authRuntime.onUnauthorized = onUnauthorized;
};

export const extractErrorMessage = (error) => (
  error?.response?.data?.message ||
  error?.response?.data?.errors?.[0]?.message ||
  error?.message ||
  'Terjadi kesalahan. Coba lagi.'
);

export const getBackendOrigin = () => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return 'https://diabitesapi.bintangin.com';
  }
};

export const buildAssetUrl = (path) => {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${getBackendOrigin()}/${String(path).replace(/^\/+/, '')}`;
};

export const authApi = {
  register: async (payload) => unwrapResponse(await api.post('/auth/register', payload)).data,
  login: async (payload) => unwrapResponse(await api.post('/auth/login', payload)).data,
  logout: async (refreshToken) => unwrapResponse(await api.post('/auth/logout', { refreshToken })),
};

export const userApi = {
  getMe: async () => unwrapResponse(await api.get('/users/me')).data,
  getDashboard: async () => unwrapResponse(await api.get('/users/me/dashboard')).data,
  updateMe: async ({ name, photo }) => {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }

    if (photo) {
      formData.append('photo', photo);
    }

    return unwrapResponse(await api.put('/users/me', formData)).data;
  },
  changePassword: async (payload) => unwrapResponse(await api.put('/users/me/password', payload)).data,
  upsertHealthProfile: async (payload) => unwrapResponse(await api.post('/users/me/health', payload)).data,
};

export const scanApi = {
  analyze: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return unwrapResponse(await api.post('/scans/analyze', formData)).data;
  },
  save: async (payload) => unwrapResponse(await api.post('/scans', payload)).data,
  getHistory: async (params = {}) => {
    const response = unwrapResponse(await api.get('/scans', { params }));
    return {
      items: response.data || [],
      pagination: response.pagination || null,
    };
  },
  getById: async (id) => unwrapResponse(await api.get(`/scans/${id}`)).data,
};

export const communityApi = {
  getPosts: async (params = {}) => {
    const response = unwrapResponse(await api.get('/community/posts', { params }));
    return {
      items: response.data || [],
      pagination: response.pagination || null,
    };
  },
  createPost: async (payload) => unwrapResponse(await api.post('/community/posts', payload)).data,
  getPostById: async (id) => unwrapResponse(await api.get(`/community/posts/${id}`)).data,
  deletePost: async (id) => unwrapResponse(await api.delete(`/community/posts/${id}`)),
  togglePostLike: async (id) => unwrapResponse(await api.post(`/community/posts/${id}/like`)).data,
  createComment: async (postId, payload) => unwrapResponse(await api.post(`/community/posts/${postId}/comments`, payload)).data,
  deleteComment: async (commentId) => unwrapResponse(await api.delete(`/community/comments/${commentId}`)),
  toggleCommentLike: async (commentId) => unwrapResponse(await api.post(`/community/comments/${commentId}/like`)).data,
};

export default api;
