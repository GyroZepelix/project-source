import { KeycloakPromise } from "keycloak-js";

export interface IAuth {
  isLogin: boolean;
  token: any;
  profile: KeycloakPromise<{}, void>;
  updateToken: (minValidity: number) => KeycloakPromise<boolean, boolean>;
  logout: any;
}