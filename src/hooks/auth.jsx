import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useGetNotify } from "./notify";
const notify = useGetNotify();
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

const login = async ({ formData }) => {
    const response = await instance.post('/auth/login', formData);
    return response.data
}

export const uselogin = () => {
    const loginMutation = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: (data, vars) => {
            notify('ok', data?.message)
            Cookies.set('token', data?.token)
            Cookies.set('role', data?.user?.role)
            vars.onSuccess(data)

        },
        onError: (err) => {
            console.log(err)
            notify('err', err?.response?.data?.error)
        }
    })
    return loginMutation
}