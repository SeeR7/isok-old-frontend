import { IDepartment } from "../features/departmentSlice";
import { IUser } from "./IUser";

export interface IEmployee {
    id: number;
    department: IDepartment;
    user: IUser;
    departmentId: number;
    userId: number;
    firstName:string;
    middleName:string;
    lastName:string;
    birthDate:Date;
    photoUrl:string;
    joinDate:Date;
    leftDate:Date;
    isActive:boolean;

}
