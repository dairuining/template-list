import service from '@/request';

export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
  data: unknown;
  username: string;
  roles: string[];
  accessToken: string;
};

export function userLogin(data: LoginRequest) {
  return service({
    url: '/login',
    method: 'POST',
    data,
  });
}

//  获取所有的用户
export function getUserList(data: LoginResponse) {
  return service({
    url: '/getUserList',
    method: 'get',
    params: data,
  });
}
