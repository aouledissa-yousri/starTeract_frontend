export class User{
    constructor(
        public name: string, 
        public email: string, 
        public password: string, 
        public country: string, 
        public phone: string,
        public image: string
    ){}
}