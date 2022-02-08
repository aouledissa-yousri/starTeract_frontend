export class Video{
    constructor(
        public id: number,
        public title: string,
        public user: number,
        public talent: number,
        public video: File
    ){}
}