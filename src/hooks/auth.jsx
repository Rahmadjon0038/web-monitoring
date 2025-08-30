import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const { instance } = require("./api")

const register = async (registerdata) => {
    const response = await instance.post('/auth/register', registerdata);
    return response.data
}

export const useRegister = () => {
    const registerMutation = useMutation({
        mutationFn: register,
        mutationKey: ['register'],
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return registerMutation
}

// ------------------ LOGIN -----------------

const login = async (logindata) => {
    const response = await instance.post('/auth/login', logindata);
    return response.data
}

export const uselogin = () => {
    const loginMutation = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: (data) => {
            console.log(data)
            Cookies.set('tpken', data?.token)
            Cookies.set('role', data?.user?.role)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return loginMutation
}