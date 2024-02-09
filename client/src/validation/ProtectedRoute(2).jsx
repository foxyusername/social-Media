import React from 'react'
import axios from "axios";
import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { checkToken } from '../serverFunctions/checkToken';

import Loading from '../components/Loading/Loading';

function ProtectedRouteHome() {

//send request to server authenticate endpoint with accesToken of user
//based on response take action
//if response is negative return user to login page
//if response is positive let user acces the home page

const {data,isLoading,isError}=useQuery('checkToken',checkToken,{
    refetchOnWindowFocus: false,
    retry: 0,
});

if(isLoading) return <Loading />

if(data.data.status===1){
    return <Outlet />
}else if(data.data.status===0){
    return <Navigate to={'/signup'} />
}

if (isError) return <div style={{width:'100%',height:'100svh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <h1 style={{fontSize:'50px'}}>Error occured while connecting with server</h1>
</div>

}

export default ProtectedRouteHome;