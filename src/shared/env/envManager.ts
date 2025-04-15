export type Environment = 'local' | 'prod';

interface EnvironmentConfig {
  apiBaseUrl: string;
  s3BucketName: string;
  s3BucketDomain: string;
  cloudFrontDomain: string;
}

const configs: Record<Environment, EnvironmentConfig> = {
  local: {
    apiBaseUrl: 'http://localhost:8080',
    s3BucketName: process.env.REACT_APP_S3_BUCKET_NAME || '',
    s3BucketDomain: process.env.REACT_APP_BUCKET_DOMAIN || '',
    cloudFrontDomain: process.env.REACT_APP_DOMAIN || '',
  },
  prod: {
    apiBaseUrl: process.env.REACT_APP_BACKEND_PROD_IP || '',
    s3BucketName: process.env.REACT_APP_S3_BUCKET_NAME_PROD || '',
    s3BucketDomain: process.env.REACT_APP_BUCKET_DOMAIN_PROD || '',
    cloudFrontDomain: process.env.REACT_APP_TEST_DOMAIN || '',
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