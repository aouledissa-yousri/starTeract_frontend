export class Activity{
    constructor(
        public id: number,
        public emitter: number,
        public receiver: number,
        public task: string,
        public image: string,
        public type: string,
        public name?: string,
    ){}
}