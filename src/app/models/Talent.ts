import { Category } from "./Category"
import { User } from "./User"

export class Talent extends User{
    constructor(
        public name: string, 
        public email: string, 
        public password: string, 
        public country: string, 
        public phone: string,
        public rulingSocialNetwork: string,
        public nickname: string,
        public followers: number, 
        public description: string,
        public categories: Category[]
    ){
        super(name,email,password,country,phone)
    }
}