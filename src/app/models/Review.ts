export class Review{
    constructor(
        public comment: string, 
        public rating: number, 
        public user: number,
        public talent: number
    ){}
}

export class ReviewDisplay{
    constructor(
        public comment: string,
        public rating: number, 
        public user: number,
        public userImage: string,
        public username: string
    ){}
}


export class Reviews{
    constructor(public reviewNum: number, public content: ReviewDisplay[]){}
}