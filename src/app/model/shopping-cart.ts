import { ShoppingCartItems } from "./shopping-cart-items";
import { ProductObject } from './product';

export class ShoppingCart {
    items: ShoppingCartItems[] = [];
    constructor(private itemsMap: {[productId: string]: ShoppingCartItems}){

        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItems({ ...item, $key: productId }));
        }
    }
    get totalItemsCount(){
        let count = 0
        for (let productId in this.items)
            count += this.items[productId].quantity; 
        return count;
    }

    getQuantity(products:ProductObject){
        let item = this.itemsMap[products.$key];
        return item ? item.quantity : 0;
    }

    get totalPrice(){
        let sum = 0;
        for(let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    
    
}