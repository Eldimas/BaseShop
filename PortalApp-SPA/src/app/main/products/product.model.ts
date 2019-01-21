import { Category } from 'app/_models/category';

export class Product {
    id: string;
    title: string;
    price: number;
    categories?: Category[];

    constructor(product?) {
        product = product || {};
        this.id = product.id || '';
        this.title = product.title || '';
        this.price = product.price || 0.0;
        this.categories = product.categories || [];
    }
}
