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

export class PaymentActivity extends Activity{
    constructor(
        public id: number,
        public emitter: number,
        public receiver: number,
        public task: string,
        public image: string,
        public type: string,
        public paymentLink: string,
        public name?: string,
    ){
        super(id,emitter,receiver,task,image,type)
    }
}