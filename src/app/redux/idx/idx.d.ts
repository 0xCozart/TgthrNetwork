export interface AuthorizeIDXPayload {
  connect: boolean;
}

export interface IDXState {
  isAuth: boolean;
  basicProfile: any;
  tgthr: any;
  error: string | null;
}
