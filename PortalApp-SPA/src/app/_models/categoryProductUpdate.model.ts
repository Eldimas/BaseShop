export class CategoryProductUpdate {
    productId: string;
    categories: string[];

    constructor(categoryProductUpdate?) {
        this.productId = categoryProductUpdate.productId || '000';
        this.categories = categoryProductUpdate.categories || [];
    }
}
