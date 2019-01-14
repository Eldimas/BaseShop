export class ShoppingCart {
    id: string;
    productId: string;
    productCount: number;
    userId: number;
    
    constructor(shoppingCart?) {
        shoppingCart = shoppingCart || {};
        this.id = shoppingCart.id || '';
        this.productId = shoppingCart.productId || '';
        this.productCount = shoppingCart.productCount || 0;
        this.userId = shoppingCart.userId || 0;

    }
}
