import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER", 
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}
function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        open: false,
        guest: false,
    });
    const history = useHistory();

    useEffect(() => { //ComponentDidMount
        auth.getLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn, 
                    errorMessage: payload.errorMessage,
                    open: payload.open,
                    guest: payload.guest,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true, 
                    errorMessage: payload.errorMessage,
                    open: false,
                    guest: payload.guest,
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true, 
                    errorMessage: payload.errorMessage,
                    open: false,
                    guest: payload.guest,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false, 
                    errorMessage: payload.errorMessage,
                    open: false,
                    guest: false,
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user, 
                        errorMessage: null,
                        open: false,
                        guest: auth.guest,
                    }
                });
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: false,
                    user: null, 
                    errorMessage: null,
                    open: false,
                    guest: false,
                }
            });
        }

    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                history.push("/login");
            }
        } catch (err) {
            try {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        user: null, 
                        loggedIn: false,
                        errorMessage: err.response.data.errorMessage,
                        open: true
                    }
                })
            } catch (err) {

            }

        }
    }
    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        guest: false,
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    user: null, 
                    loggedIn: false,
                    errorMessage: err.response.data.errorMessage,
                    open: true
                }
            })
        }

    }
    auth.logoutUser = async function(user) {
        const response = await api.logoutUser(user);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    user: null
                }
            })
        }
        history.push("/");
    }
    auth.handleClose = (event) => {
        event.preventDefault();
        authReducer({
            type: AuthActionType.GET_LOGGED_IN,
            payload: {
                user: null,
                loggedIn: false,
                errorMessage: null,
                open: false
            }
        })
    }
    auth.handleGuest = async function(store) {
        try {
            const response = await api.loginGuest();      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        guest: true,
                    }
                })
                history.push("/");
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    user: null, 
                    loggedIn: false,
                }
            })
        }
    }


    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };