export class NavigUpdate {
    id: string;
    parentId: string;
    title: string;
    titleEng: string;
    titleKaz: string;
    type: string;
    icon: string;
    url: string;
    children?: NavigUpdate[];
    expanded: boolean;
    selected: boolean;

    constructor(navig?) {
        navig = navig || {};
        this.id = navig.id || '';
        this.parentId = navig.parentId || '';
        this.title = navig.title || '';
        this.titleEng = navig.titleEng || '';
        this.titleKaz = navig.titleKaz || '';
        this.type = navig.type || '';
        this.icon = navig.icon || '';
        this.url = navig.url || '';
        this.children = navig.children || [];
        this.expanded = navig.expanded || false;
        this.selected = navig.selected || false;
    }
}
