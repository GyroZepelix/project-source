import { useQuery } from '@tanstack/react-query'
import { AxiosError, HttpStatusCode } from 'axios'
import React, { FC, useContext } from 'react'
import { GlobalParametersContext } from '../ApplicationMain'
import CreateUser from '../CreateUser'
import ErrorEncountered from './ErrorEncountered'
import Loading from './Loading'

interface IProps {
  children: React.ReactNode
  redirect: React.ReactNode
}

const CheckIfUserExists:FC<IProps> = ({children, redirect}) => {

  const globalParams = useContext(GlobalParametersContext)
  const userQuery = useQuery(
    {
      queryKey: ['user', 'me'],
      queryFn: globalParams.HANDLER.API.getUser,
      retry: false

    }
  )  
  
  if (userQuery.isLoading) {
    return (
      <Loading />
    )
  }

  if (userQuery.isError) {
    const error = userQuery.error as AxiosError
    switch (error.response?.status) {
      case HttpStatusCode.NotFound:
        return <CreateUser />
      case HttpStatusCode.Unauthorized:
        window.location.reload()
      default:
        return <ErrorEncountered error={error} />
    }
  }

  return (
    <>
      {children}
    </>
  )
}

export default CheckIfUserExists