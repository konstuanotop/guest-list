import { ApiService, UsersResponse } from "../../types"

type UsersServiceMethods = {
    getUsers: ApiService<void, UsersResponse>
}

export const UsersService: UsersServiceMethods = {
    getUsers: async () => {
        const response = await fetch('https://reqres.in/api/users')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        } else {
            return await response.json();
        }
    }
}