import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/constants/api';

/**
 * Reusable Axios instance with base configuration.
 * Handles automatic API key injection and consistent timeout.
 * 
 * Performance Tip: timeout is crucial to prevent ECONNRESET from hanging 
 * the server-side process during metadata/page generation.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT || 10000, // Default to 10s if not set
  params: API_CONFIG.DEFAULT_PARAMS,
});

/**
 * Request Interceptor: Injects the API Key into every request.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (API_CONFIG.API_KEY) {
      config.params = {
        ...config.params,
        api_key: API_CONFIG.API_KEY,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Standardizes error handling and logging.
 * Prevents noisy console spam in development while providing enough 
 * context for debugging network issues like ECONNRESET.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isNetworkError = error.code === 'ECONNRESET' || !error.response;
    const isTimeout = error.code === 'ECONNABORTED';

    if (process.env.NODE_ENV !== 'production') {
      if (isNetworkError || isTimeout) {
        console.warn(`[API ${isTimeout ? 'Timeout' : 'Network Error'}]: ${error.message}`, {
          url: error.config?.url,
        });
      } else if (error.response?.status !== 404) {
        // Log non-404 errors for debugging
        console.error(`[API Error]: ${error.message}`, {
          status: error.response?.status,
          url: error.config?.url,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
