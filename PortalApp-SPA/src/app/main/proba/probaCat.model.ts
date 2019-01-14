export class ProbaCat {
    id: string;
    title: string;
    children?: ProbaCat[];

    constructor(probacat?) {
        probacat = probacat || {};
        this.id = probacat.id || '';
        this.title = probacat.title || '';
        this.children = probacat.children || [];
    }
}
