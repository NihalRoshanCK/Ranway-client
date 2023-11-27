import { useQuery } from "react-query";

const fetchUsers = async (api, userId) => {
    const response = await api.get(`auths/user/${userId}/`);
    return response.data
}
export const useUserData = (api, userId) => {
    console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

    return useQuery(['user', userId], () => fetchUsers(api, userId));
};