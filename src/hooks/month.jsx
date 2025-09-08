import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./api";
import { useGetNotify } from "./notify";
const notify = useGetNotify();
// -------------- GET GROUPS MONTH ------------------
const getMonth = async ({ queryKey }) => {
    const id = queryKey[1];
    const response = await instance.get(`/api/month/groups/${id}/months`);
    return response.data
}

export const usegetMonth = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['month', id],
        queryFn: getMonth,
    })
    return { data, isLoading, error }
}

// -------------- CREATE GROUPS MONTH ------------------

const createGroupsMonth = async ({ groupId, monthData }) => {
    const response = await instance.post(`/api/month/groups/${groupId}/months`, monthData);
    return response.data
}

export const usecreateGroupsMonth = () => {
    const quericlient = useQueryClient()
    const createGroupsMonthMutation = useMutation({
        mutationFn: createGroupsMonth,
        mutationKey: ['month'],
        onSuccess: (data) => {
            notify('ok', 'Oy mofaqqiyatli yaratildi')
            quericlient.invalidateQueries(['month'])
        },
        onError: (err) => {
            console.log(err)
            notify('err', 'Yaratishda Xatolik')
        }
    })
    return createGroupsMonthMutation
}
// -------------- DELETE GROUPS MONTH ------------------

const deleteMonth = async (monthId) => {
    const response = await instance.delete(`/api/month/${monthId}`);
    return response.data
}

export const usedeleteMonth = () => {
    const quericlient = useQueryClient()
    const deleteMonthMutation = useMutation({
        mutationFn: deleteMonth,
        mutationKey: ['month'],
        onSuccess: (data) => {
            notify('ok', "Oy mofaqqiyatli O'chirildi")
            quericlient.invalidateQueries(['month'])
        },
        onError: (err) => {
            notify('err', "O'chirishda  Xatolik")
        }
    })
    return deleteMonthMutation
}


// -------------- FINISHED  MONTH ------------------

const finishedMonth = async ({ monthId, ...finishedata }) => {
    const response = await instance.put(`/api/month/${monthId}`, finishedata);
    return response.data
}

export const usefinishedMonth = () => {
    const quericlient = useQueryClient()
    const finishedMutation = useMutation({
        mutationFn: finishedMonth,
        mutationKey: ['month'],
        onSuccess: (data) => {
            notify('ok', "Oy mofaqqiyatli Yakunlandi va g'olib aniqlandi")
            quericlient.invalidateQueries(['month'])
        },
        onError: (err) => {
            console.log(err)
            notify('err', 'Oyni yakunlashda Xatolik')
        }
    })
    return finishedMutation
}
// --


















// -------------- GET  MONTH STUDENT ------------------
const getMonthStudents = async ({ queryKey }) => {
    const monthid = queryKey[1];
    const response = await instance.get(`/api/student/${monthid}/students`);
    return response.data
}

export const usegetMonthStudents = (monthid) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['student', monthid],
        queryFn: getMonthStudents,
    })
    return { data, isLoading, error }
}

// -------------- SCORE ADD  MONTH STUDENT ------------------
const scoreMonthStudents = async (data) => {
    const { monhtId, studentId, score } = data
    const response = await instance.put(`/api/student/${monhtId}/students/${studentId}`, { score });
    return response.data
}

export const usescoreMonthStudents = () => {
    const quericlient = useQueryClient()
    const scoreMonthStudentsMutation = useMutation({
        mutationFn: scoreMonthStudents,
        mutationKey: ['month'],
        onSuccess: (data) => {
            notify('ok', "Student baxolandi")
            quericlient.invalidateQueries(['student'])
        },
        onError: (err) => {
            notify('err', "Baxolashda  Xatolik")
        }
    })
    return scoreMonthStudentsMutation
}
