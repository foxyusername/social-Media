import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useQuery } from 'react-query'
import { checkToken } from '../serverFunctions/checkToken.js'

function ProtectedRoute() {
  
const {data,isLoading,isError}=useQuery('checkToken',checkToken,{
    refetchOnWindowFocus: false,
    retry: 0,
});

if(isLoading) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h1 style={{fontSize:'50px'}}>Loading...</h1>
</div>

if(data.data.status === 1){
    return <Navigate to='/home' />
}else if(data.data.status === 0){
   return <Outlet />
}

if (isError) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <h1 style={{fontSize:'50px'}}>Error occured while connecting with server</h1>
</div>

}

export default ProtectedRoute;