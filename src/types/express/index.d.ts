export type Language = 'en-US' | 'sl-SI';

declare global {
  namespace Express {
    export interface Request {
      language: Language;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
