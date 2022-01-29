import { Category } from "./Category";
import { Talent } from "./Talent";

export class Container{
    constructor(
        public header: Category,
        public talents: Talent[]
    ){}
}