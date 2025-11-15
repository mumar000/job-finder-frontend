import Cookies from "js-cookie";
import { API_URL, JWT_COOKIE_NAME, ERROR_MESSAGES } from "../constants";

/**
 * API Client for backend communication
 */
class ApiClient {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get auth token from cookies
   * @returns {string|null} JWT token
   */
  getToken() {
    return Cookies.get(JWT_COOKIE_NAME);
  }

  /**
   * Set auth token in cookies
   * @param {string} token - JWT token
   * @param {number} expiryDays - Token expiry in days
   */
  setToken(token, expiryDays = 7) {
    Cookies.set(JWT_COOKIE_NAME, token, {
      expires: expiryDays,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  /**
   * Remove auth token from cookies
   */
  removeToken() {
    Cookies.remove(JWT_COOKIE_NAME);
  }

  /**
   * Build headers for API requests
   * @param {Object} customHeaders - Custom headers to merge
   * @returns {Object} Request headers
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   * @param {Response} response - Fetch response
   * @returns {Promise<any>} Response data
   */
  async handleResponse(response) {
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const error = new Error(data?.message || ERROR_MESSAGES.SERVER_ERROR);
      error.status = response.status;
      error.data = data;

      // Handle 401 Unauthorized - remove token and redirect
      if (response.status === 401) {
        this.removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      throw error;
    }

    return data;
  }

  /**
   * Make API request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      // Network or fetch errors
      if (!error.status) {
        error.message = ERROR_MESSAGES.NETWORK_ERROR;
      }
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Response data
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, { method: "GET" });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise<any>} Response data
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise<any>} Response data
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} Response data
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  /**
   * Upload file
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with file
   * @returns {Promise<any>} Response data
   */
  async upload(endpoint, formData) {
    const headers = {};
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;
