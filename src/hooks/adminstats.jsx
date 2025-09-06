import { useQuery } from "@tanstack/react-query"
import { instance } from "./api"

const getVideo = async () => {
    const response = await instance.get('/api/statistics')
    return response.data    
}

export const usegetStats = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stats'],
        queryFn: getVideo
    })
    return { data, isLoading, error }
}
