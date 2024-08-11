export type Environment = 'local' | 'prod';

interface EnvironmentConfig {
  apiBaseUrl: string;
}

const configs: Record<Environment, EnvironmentConfig> = {
  local: {
    apiBaseUrl: 'http://localhost:8080',
  },
  prod: {
    apiBaseUrl: process.env.REACT_APP_BACKEND_PROD_IP || '',
  },
};

const getEnvironment = (): Environment => {
  const env = process.env.REACT_APP_ENV as Environment;
  if (env !== 'local' && env !== 'prod') {
    throw new Error(`Invalid environment: ${env}. Must be either 'local' or 'prod'.`);
  }
  return env;
};

export const getConfig = (): EnvironmentConfig => {
  const env = getEnvironment();
  const config = configs[env];

  if (env === 'prod' && !config.apiBaseUrl) {
    throw new Error('REACT_APP_BACKEND_PROD_IP is not set for production environment');
  }

  return config;
};