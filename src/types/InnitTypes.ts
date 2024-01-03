export interface InnitUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  isMinor?: boolean;
  userType: string;
  accessToken?: string;
}
