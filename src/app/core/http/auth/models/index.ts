export interface RegisterUser {
  login: string,
  forName: string,
  lastName: string,
  password: string
}

export interface LoginUser {
  login: string,
  password: string,
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
