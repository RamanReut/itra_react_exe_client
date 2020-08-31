import { OrdersSelector } from './rootSelector'

export class DetailSelector extends OrdersSelector {
    public get isOpen(): boolean {
        return this.detail.isOpen;
    }

    public get id(): number {
        return this.detail.id;
    }

   public get tab(): number {
       return this.detail.tab;
   }
}
