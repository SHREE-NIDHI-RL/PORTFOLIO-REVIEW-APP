const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Portfolio endpoints
  async createPortfolio(portfolioData) {
    return this.request('/portfolios', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  async getMyPortfolios() {
    return this.request('/portfolios/my-portfolios');
  }

  async getPublicPortfolios() {
    return this.request('/portfolios/public');
  }

  async getExplorePortfolios() {
    return this.request('/portfolios/explore');
  }

  async addPortfolioVersion(portfolioId, content) {
    return this.request(`/portfolios/${portfolioId}/versions`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async updatePortfolioVisibility(portfolioId, versionNumber, publicForReviewers) {
    return this.request(`/portfolios/${portfolioId}/visibility`, {
      method: 'PATCH',
      body: JSON.stringify({ versionNumber, publicForReviewers }),
    });
  }

  // Review endpoints
  async sendReviewRequest(requestData) {
    return this.request('/reviews/request', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getReviewRequests() {
    return this.request('/reviews/requests');
  }

  async getMyReviews() {
    return this.request('/reviews/my-reviews');
  }

  async updateReviewStatus(reviewId, status) {
    return this.request(`/reviews/${reviewId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async submitReview(reviewId, reviewData) {
    return this.request(`/reviews/${reviewId}/submit`, {
      method: 'PATCH',
      body: JSON.stringify(reviewData),
    });
  }

  async getCompletedReviews() {
    return this.request('/reviews/completed');
  }

  async getReviewerHistory() {
    return this.request('/reviews/reviewer-history');
  }

  async sendReviewerRequest(requestData) {
    return this.request('/reviews/reviewer-request', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getReviewerRequests() {
    return this.request('/reviews/reviewer-requests');
  }

  async createPost(reviewId) {
    return this.request(`/reviews/${reviewId}/post`, {
      method: 'POST',
    });
  }

  // User endpoints
  async getReviewers() {
    return this.request('/users/reviewers');
  }

  async getReviewerByEmail(email) {
    return this.request(`/users/reviewer/${email}`);
  }

  async getPosts() {
    return this.request('/users/posts');
  }

  async likePost(postId) {
    return this.request(`/users/posts/${postId}/like`, {
      method: 'PATCH',
    });
  }

  async commentPost(postId) {
    return this.request(`/users/posts/${postId}/comment`, {
      method: 'PATCH',
    });
  }
}

export default new ApiService();