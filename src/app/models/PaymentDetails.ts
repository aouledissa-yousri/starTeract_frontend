export class PaymentDetails{
    constructor(
        public wallet: string, 
        public cost: number, 
        public token: string
    ){}
}