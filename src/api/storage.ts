/**
 * Secure Storage Utility
 * Handles secure storage of sensitive data like tokens
 */

class SecureStorage {
  private readonly TOKEN_KEY = 'pure_meat_token';
  private readonly USER_KEY = 'pure_meat_user';
  private readonly CART_KEY = 'pure_meat_cart';
  private readonly LOCATION_KEY = 'pure_meat_location';

  // Token Management
  setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  removeToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  // User Data Management
  setUser(user: any): void {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  getUser(): any {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  removeUser(): void {
    try {
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  }

  // Cart Management
  setCart(cart: any): void {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to store cart data:', error);
    }
  }

  getCart(): any {
    try {
      const cartData = localStorage.getItem(this.CART_KEY);
      return cartData ? JSON.parse(cartData) : null;
    } catch (error) {
      console.error('Failed to retrieve cart data:', error);
      return null;
    }
  }

  removeCart(): void {
    try {
      localStorage.removeItem(this.CART_KEY);
    } catch (error) {
      console.error('Failed to remove cart data:', error);
    }
  }

  // Location Management
  setLocation(location: { lat: string; lng: string; address?: string }): void {
    try {
      localStorage.setItem(this.LOCATION_KEY, JSON.stringify(location));
    } catch (error) {
      console.error('Failed to store location data:', error);
    }
  }

  getLocation(): { lat: string; lng: string; address?: string } | null {
    try {
      const locationData = localStorage.getItem(this.LOCATION_KEY);
      return locationData ? JSON.parse(locationData) : null;
    } catch (error) {
      console.error('Failed to retrieve location data:', error);
      return null;
    }
  }

  removeLocation(): void {
    try {
      localStorage.removeItem(this.LOCATION_KEY);
    } catch (error) {
      console.error('Failed to remove location data:', error);
    }
  }

  // Clear all stored data
  clearAll(): void {
    this.removeToken();
    this.removeUser();
    this.removeCart();
    this.removeLocation();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Get stored session
  getStoredSession(): { token: string; user: any } | null {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      return { token, user };
    }

    return null;
  }

  // Get user ID if available
  getUserId(): number | null {
    const user = this.getUser();
    return user?.id || null;
  }
}

// Export singleton instance
export const secureStorage = new SecureStorage();

// Session manager
export const sessionManager = {
  // Initialize session from storage
  init: () => {
    const session = secureStorage.getStoredSession();
    if (session) {
      console.log('Session restored from storage');
      return session;
    }
    return null;
  },

  // Save session
  save: (token: string, user: any) => {
    secureStorage.setToken(token);
    secureStorage.setUser(user);
  },

  // Clear session
  clear: () => {
    secureStorage.clearAll();
  },

  // Check if session is valid
  isValid: (): boolean => {
    return secureStorage.isAuthenticated();
  },

  // Refresh token (optional - can be implemented later)
  refresh: async () => {
    // TODO: Implement token refresh logic with Pure Meat API
    console.log('Token refresh not implemented yet');
  }
};

export default secureStorage;