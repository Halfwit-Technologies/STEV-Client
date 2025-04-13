// Types for Google OAuth data

/**
 * Complete Google OAuth user profile
 * Contains all fields from Google's OAuth response
 */
export interface GoogleOAuthProfile {
  // Standard OpenID Connect fields
  sub: string; // Unique identifier for the user
  name?: string; // Full name
  given_name?: string; // First name
  family_name?: string; // Last name
  email?: string; // Email address
  email_verified?: boolean; // Whether email is verified
  picture?: string; // Profile picture URL
  hd?: string; // Hosted domain (for Google Workspace accounts)

  // Authentication metadata
  iss?: string; // Issuer (who created the token)
  aud?: string; // Audience (intended recipient)
  iat?: number; // Issued at (unix timestamp)
  exp?: number; // Expiration time (unix timestamp)
  azp?: string; // Authorized party
  at_hash?: string; // Access token hash (for validation)

  // Token fields (added by NextAuth)
  access_token?: string; // OAuth access token
  refresh_token?: string; // OAuth refresh token
  id_token?: string; // ID token
  expires_in?: number; // Token expiration time in seconds
  refresh_expires_in?: number; // Refresh token expiration in seconds
  scope?: string; // Granted scopes
  token_type?: string; // Type of token (usually "Bearer")
}
