import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useGetNotify } from "./notify"

const { instance } = require("./api")
const notify = useGetNotify();
// ----------------- Get video ---------------
const getVideo = async () => {
    const response = await instance.get('/api/video')
    return response.data
}

export const useGetVideo = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['video'],
        queryFn: getVideo
    })
    return { data, isLoading, error }
}

// ----------------- Post video ---------------
const setVideo = async (videodata) => {
    const response = await instance.post('/api/video', videodata);
    return response.data
}

export const usesetVideo = () => {
    const quericlient = useQueryClient()
    const setVideoMutation = useMutation({
        mutationFn: setVideo,
        mutationKey: ['video'],
        onSuccess: (data) => {
            notify('ok', "Video mofaqiyatli qo'shildi")
            quericlient.invalidateQueries(['video'])

        },
        onError: (err) => {
            notify('err', err?.response?.data?.error || "Xatolik yuz berdi")
        }
    })
    return setVideoMutation
}

// ----------------- Post video ---------------
const deleteVideo = async (id) => {
    const response = await instance.delete(`/api/video/${id}`);
    return response.data
}

export const usedeleteVideo = () => {
    const quericlient = useQueryClient()
    const deleteVideoMutation = useMutation({
        mutationFn: deleteVideo,
        mutationKey: ['video'],
        onSuccess: (data) => {
            notify('ok', "Video o'chirildi")
            quericlient.invalidateQueries(['video'])

        },
        onError: (err) => {
            notify('err', err?.response?.data?.error || "Xatolik yuz berdi")
        }
    })
    return deleteVideoMutation
}

// ----------------- Like video ---------------
const likeVideo = async (id) => {
    const response = await instance.post(`/api/video/${id}/like`);
    return response.data
}

export const uselikeVideo = () => {
    const quericlient = useQueryClient()
    const likeVideoMutation = useMutation({
        mutationFn: likeVideo,
        mutationKey: ['video'],
        onSuccess: (data) => {
            quericlient.invalidateQueries(['video'])
        },
        onError: (err) => {
            notify('err', err?.response?.data?.error || "Xatolik yuz berdi")
        }
    })
    return likeVideoMutation
}

