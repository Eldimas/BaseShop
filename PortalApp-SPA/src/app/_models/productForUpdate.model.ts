import { Category } from './category';


export class ProductForUpdate {
    id: string;
    title: string;
    description: string;
    price: number;
    created: Date;
    createdBy: string;
    categories?: Category[];

    constructor(productForUpdate?) {

        const uuidv1 = require('uuid/v1');
        const myDate = new Date();

        productForUpdate =  productForUpdate || {};
        this.id = productForUpdate.id || uuidv1();
        this.title = productForUpdate.title || '';
        this.description = productForUpdate.description || '';
        this.price = productForUpdate.price || 0.0;
        this.created = productForUpdate.created || myDate;
        this.createdBy = productForUpdate.createdBy || '';
        this.categories = productForUpdate.categories || [];

    }
}
