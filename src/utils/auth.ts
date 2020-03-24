const { parse } = JSON;
const { stringify } = JSON;

interface IAuth {
  clear(key: string): void;
  clearAppStorage(): void;
  get(key: string): JSON;
  setToken(token: string): void;
  setUserInfo(userInfo: JSON): void;
  getToken(): any;
  getUserInfo(): any;
}

export interface IUser {
  photo: Array<string>;
  _id: string;
  idx: number;
  username: string;
  name: string;
  userType: string;
  gender: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  class: number;
  grade: number;
  number: number;
  serial: number;
}


const auth: IAuth = {
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }
    return null;
  },

  clearAppStorage() {
    return localStorage.clear();
  },

  get(key) {
    return parse(localStorage.getItem(key) as string);
  },

  setToken(token) {
    return localStorage.setItem('accessToken', token);
  },

  setUserInfo(userInfo) {
    return localStorage.setItem('userInfo', stringify(userInfo));
  },

  getToken() {
    return localStorage.getItem('accessToken');
  },

  getUserInfo() {
    return parse(localStorage.getItem('userInfo') as string);
  },
};

export default auth;
