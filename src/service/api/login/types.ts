export interface ILoginParams {
  username: string;
  password: string | number;
}
export interface IPermissionParams {
  token: string;
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>;
  logout: () => Promise<any>;
  getPermissionList: (params: IPermissionParams) => Promise<any>;
}
