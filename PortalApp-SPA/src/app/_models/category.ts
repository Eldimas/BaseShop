export class Category {
    id: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    children?: Category[];
    expanded: boolean;
    selected: boolean;

    constructor(category?) {
        category = category || {};
        this.id = category.id || '';
        this.title = category.title || '';
        this.type = category.type || '';
        this.icon = category.icon || '';
        this.url = category.url || '';
        this.children = category.children || [];
        this.expanded = category.expanded || false;
        this.selected = category.selected || false;
    }
}
