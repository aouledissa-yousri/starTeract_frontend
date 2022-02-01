export class Notification_{
    constructor(
        public id: number,
        public description: string,
        public checked: boolean,
        public receiver: number,
        public emitter: number,
        public image: string
    ){}
}