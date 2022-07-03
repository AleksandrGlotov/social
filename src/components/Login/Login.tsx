import React from "react"
import { connect, useSelector } from 'react-redux';
import { signIn } from "../../Redux/authReducer";
import { Navigate } from 'react-router';
import { AppStateType } from "../../Redux/redux-store";
import { LoginForm } from "../Forms/LoginForm";

export const Login: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    if (isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}
