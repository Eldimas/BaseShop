export class Product {
    id: string;
    title: string;

    constructor(product?) {
        product = product || {};
        this.id = product.id || '';
        this.title = product.title || '';
    }
}
