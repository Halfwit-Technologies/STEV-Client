/**
 * User model for application use
 * Contains essential user information and authentication details
 */
export interface User {
  // Core user identity (from OAuth)
  id: string; // OAuth provider's unique ID (sub)
  name: string; // User's full name
  email: string; // User's email address
  avatar_url: string; // Profile image URL

  // For Google Workspace accounts
  workspace_domain?: string; // Google Workspace domain (hd field)

  // Authentication tokens
  access_token: string; // Current OAuth access token
  token_expiry: Date; // When access token expires
  refresh_token?: string; // OAuth refresh token (may not always be provided)
  refresh_expiry?: Date; // When refresh token expires

  // Application-specific user data
  created_at?: Date; // When user was first added to our system
  updated_at?: Date; // When user data was last updated
  last_login?: Date; // Last successful login

  // User preferences & app settings
  preferences?: UserPreferences;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  email_notifications?: boolean;
  default_view?: 'compact' | 'comfortable';
  // Add more user preferences as needed
}
