import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useGetNotify } from "./notify";
const notify = useGetNotify();
const { instance } = require("./api")

const register = async (registerdata) => {
    const response = await instance.post('/api/auth/register', registerdata);
    return response.data
}

export const useRegister = () => {
    const registerMutation = useMutation({
        mutationFn: register,
        mutationKey: ['register'],
        onSuccess: (data) => {
            notify('ok', data?.message)
        },
        onError: (err) => {
            notify('err', err?.response?.data?.error)
        }
    })
    return registerMutation
}

// ------------------ LOGIN -----------------

const login = async ({ formData }) => {
    const response = await instance.post('/api/auth/login', formData);
    return response.data
}

export const uselogin = () => {
    const loginMutation = useMutation({
        mutationFn: login,
        mutationKey: ['login'],
        onSuccess: (data, vars) => {
            notify('ok', data?.message)
            Cookies.set('token', data?.token)
            Cookies.set('role', data?.role)
            vars.onSuccess(data)

        },
        onError: (err) => {
            console.log(err)
            notify('err', err?.response?.data?.error)
        }
    })
    return loginMutation
}

// ----------------------- User me ----------------
const userMe = async () => {
    const response = await instance.get('/api/auth/me');
    return response.data
}

export const useUserMe = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: userMe,
    })
    return { data, isLoading, error }
}
// ------------------ AVATAR -----------------

const avatar = async (data) => {
    const { id, formData } = data
    const response = await instance.post(`/api/uploads/${id}/avatar`, formData);
    return response.data
}

export const useavatar = () => {
    const avatarMutation = useMutation({
        mutationFn: avatar,
        mutationKey: ['user'],
        onSuccess: (data) => {
            console.log(data)
            notify('ok', data?.message)
        },
        onError: (err) => {
            console.log(err)
            notify('err', err?.response?.data?.error)
        }
    })
    return avatarMutation
}


// ----------------------- Get all users ----------------
const getAllusers = async () => {
    const response = await instance.get('/api/auth/users');
    return response.data
}

export const usegetAllusers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getAllusers,
    })
    return { data, isLoading, error }
}


