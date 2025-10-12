import React, { useEffect, useState } from 'react'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import { useLocation, useNavigate } from 'react-router-dom'

function LoginChecker() {

    const navigate = useNavigate()
    const location = useLocation()
    const { name, email } = location.state || { name: "", email: "" }

    useEffect(() => {
        if (name == '' || email == '') {
            navigate("/login")
        }
    }, [])


    return(
        <Chat username={name} useremail={email}/>
    );

}

export default LoginChecker