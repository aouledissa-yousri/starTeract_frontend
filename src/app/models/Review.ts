export class Review{
    constructor(public comment: string, public rating: number, public user: string){}
}


export class Reviews{
    constructor(public reviewNum: number, public content: Review[]){}
}