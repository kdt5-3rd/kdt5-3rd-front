export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface InitialErrors {
  email: string;
  password: string;
}

export interface RegisterErrors extends InitialErrors {
  username: string;
  verifyPassword: string;
}
