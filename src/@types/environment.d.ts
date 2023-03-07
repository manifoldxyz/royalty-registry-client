declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LISTING_CONTRACT_ADDRESS: string;
      NODE_ENV: 'goerli' | 'production' | 'development' | 'test';
    }
  }
}

export {}
