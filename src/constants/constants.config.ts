// Constants for application configurations

export const CONSTANTS = {
  // Path of the environment file
  envFilePath: '.env',

  // Timeout for Docker response in milliseconds (Default: 5 seconds)
  waitForResponseDockerTimeout: 5000,

  // Interval time for checking service status in milliseconds (Default: 5 minutes)
  statusCheckServiceIntervalTimeInterval: 300000,

  // Time limit for token expiration (Default: 12 hours)
  expirationTokens: '12h',

  // Email domain used for users (Default: localhost.net)
  usersEmailDomain: 'localhost.net',
};
