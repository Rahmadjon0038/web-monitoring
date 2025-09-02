import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./api";
import { useGetNotify } from "./notify";
const notify = useGetNotify();

// ----------------------- User me ----------------
const getGroups = async () => {
    const response = await instance.get('/api/groups/all');
    return response.data
}

export const usegetGroups = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['groups'],
        queryFn: getGroups,
    })
    return { data, isLoading, error }
}

// -------------- CREATE GROUPS ------------------
const createGroup = async (data) => {
    const response = await instance.post(`/api/groups/create`, data);
    return response.data
}

export const usecreateGroup = () => {
    const quericlient = useQueryClient()
    const createGroupMutation = useMutation({
        mutationFn: createGroup,
        mutationKey: ['groups'],
        onSuccess: (data) => {
            notify('ok', data?.message)
            quericlient.invalidateQueries(['groups'])

        },
        onError: (err) => {
            notify('err', err?.response?.data?.error)
        }
    })
    return createGroupMutation
}

// ----------------------- User my groups ----------------
const myGroups = async () => {
    const response = await instance.get('/api/groups/my-groups');
    return response.data
}

export const usemyGroups = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['groups'],
        queryFn: myGroups,
    })
    return { data, isLoading, error }
}

// -------------- group add user ------------------
const addGroup = async (data) => {
    const response = await instance.post(`/api/groups/add-user`, data);
    return response.data
}

export const useaddGroup = () => {
    const quericlient = useQueryClient()
    const addGroupMutation = useMutation({
        mutationFn: addGroup,
        mutationKey: ['groups'],
        onSuccess: (data) => {
            notify('ok', data?.message)
            quericlient.invalidateQueries(['groups'])

        },
        onError: (err) => {
            notify('err', err?.response?.data?.error)
        }
    })
    return addGroupMutation
}

// ----------------------- Get all members ----------------
const getGroupMembers = async ({ queryKey }) => {
    const id = queryKey[1]
    const response = await instance.get(`/api/groups/${id}/members`);
    return response.data
}

export const usegetGroupMembers = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['groups', id],
        queryFn: getGroupMembers,
    })
    return { data, isLoading, error }
}
