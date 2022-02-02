import { Service } from "./Service";

export class ServiceEmitter{
    constructor(
        public name: string,
        public image: string
    ){}
}

export class Task{
    constructor(
        public service: Service, 
        public user: ServiceEmitter
    ){}
}