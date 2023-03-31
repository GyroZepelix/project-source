import { IAuth } from "../interfaces/IAuth"

export class ApiWithKeycloak {

  private readonly _auth: IAuth

  constructor (auth: IAuth) {
    this._auth = auth
  }

  public buildConfig = () => {
    const config = {
      headers: {
        authorization: `Bearer ${this._auth.token}`
      }
    }

    return config
  }
}