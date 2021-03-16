import path from 'path';
import dotenvSafe from 'dotenv-safe';

// Load environment configuration
dotenvSafe.config({
  path: path.resolve(__dirname, '..', '.env'),
  example: path.resolve(__dirname, '..', '.env.example')
});
// eslint-disable-next-line
export const { CERAMIC_URL } = <{ [key: string]: string }>process.env;
