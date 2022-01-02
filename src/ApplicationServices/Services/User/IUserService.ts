import { CreateUserDto } from "@/ApplicationServices/DTOs/users.dto";
import { User } from "@/ApplicationServices/interfaces/users.interface";


export default interface IUserService{
    findAllUser(): Promise<User[]>;
    findUserById(userId: number): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(userId: number, userData: CreateUserDto): Promise<User[]>;
    deleteUser(userId: number): Promise<User[]>;
}