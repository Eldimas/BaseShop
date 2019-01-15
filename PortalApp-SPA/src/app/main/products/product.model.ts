export class Product {
    id: string;
    title: string;
    price: number;


    constructor(product?) {
        product = product || {};
        this.id = product.id || '';
        this.title = product.title || '';
        this.price = product.price || 0.0;
    }
}
