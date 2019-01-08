export class Navig {
    id: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    children?: Navig[];
    expanded: boolean;
    selected: boolean;

    constructor(navig?) {
        navig = navig || {};
        this.id = navig.id || '';
        this.title = navig.title || '';
        this.type = navig.type || '';
        this.icon = navig.icon || '';
        this.url = navig.url || '';
        this.children = navig.children || [];
        this.expanded = navig.expanded || false;
        this.selected = navig.selected || false;
    }
}
