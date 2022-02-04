export class Activity{
    constructor(
        public id: number,
        public user: number,
        public talent: number,
        public task: string,
        public image: string,
        public name?: string
    ){}
}