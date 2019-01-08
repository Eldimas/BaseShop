export class CategoryUpdate {
    id: string;
    parentId: string;
    title: string;
    titleEng: string;
    titleKaz: string;
    type: string;
    icon: string;
    url: string;
    children?: CategoryUpdate[];
    expanded: boolean;
    selected: boolean;

    constructor(cat?) {
        cat = cat || {};
        this.id = cat.id || '';
        this.parentId = cat.parentId || '';
        this.title = cat.title || '';
        this.titleEng = cat.titleEng || '';
        this.titleKaz = cat.titleKaz || '';
        this.type = cat.type || '';
        this.icon = cat.icon || '';
        this.url = cat.url || '';
        this.children = cat.children || [];
        this.expanded = cat.expanded || false;
        this.selected = cat.selected || false;
    }
}
