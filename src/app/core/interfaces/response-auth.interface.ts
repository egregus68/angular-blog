export interface ResponseAuthInterface {
  tokenValue: string;
  issuedAt: string;
  expiresAt: string;
  headers: {
    alg: string;
  };
  claims: {
    login: string;
    exp: string;
  };
  id: string;
  subject: string;
  notBefore: string;
  issuer: string;
  audience: string;
}
