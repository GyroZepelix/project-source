import {useEffect, useState, useRef} from 'react'
import Keycloak, { KeycloakPromise } from 'keycloak-js'
import { IAuth } from '../interfaces/IAuth'

const useAuth = (): IAuth => {
  const isInitialised = useRef(false)
  const [profile, setProfile] = useState<any>()
  const [token, setToken] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [updateToken, setUpdateToken] = useState<(minValidity: number) => KeycloakPromise<boolean, boolean>>((): any => {})
  const logout = useRef<any>()

  useEffect(() => {

    if(isInitialised.current) return;

    isInitialised.current = true;

    const client = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    })

    client.onTokenExpired = () => {client.updateToken(5).then(() => console.log("token refreshed"))}

    client.init({ onLoad: "login-required"}).then((res) => {
      setIsLogin(res)
      setToken(client.token)
      setProfile(client.loadUserInfo())
      setUpdateToken(client.updateToken)
      logout.current = client.logout
    })

    
  }, [])

  return {isLogin:isLogin, token:token, profile:profile, updateToken:updateToken, logout:logout.current}
}

export default useAuth