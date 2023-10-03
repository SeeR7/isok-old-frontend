export interface IUser {
    id: number;
    login: string;
    password: string;
    accessGroup: string;
    refreshTokenExpiryTime: string;
}

export interface IGenericResponse {
    status: string;
    message: string;
}