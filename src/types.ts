export interface UserType {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
}

export type ApiService<Params = unknown, Response = unknown> = (params: Params) => Promise<Response>

export type UsersResponse = {
    data: UserType[];
}