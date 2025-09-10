import { useQuery } from "@tanstack/react-query";
import { instance } from "./api";

// ----------------------- Get all users ----------------
const getProfilestats = async ({ queryKey }) => {
    const userId = queryKey[1]
    const response = await instance.get(`/api/profile/${userId}/stats`);
    return response.data
}

export const usegetProfilestats = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['userstats', id],
        queryFn: getProfilestats,
    })
    return { data, isLoading, error }
}

