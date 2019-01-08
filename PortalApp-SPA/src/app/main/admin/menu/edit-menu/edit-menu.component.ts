import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Navig } from 'app/_models/navig';
import { NavigService } from 'app/_services/navig.service';
import { NavigUpdate } from 'app/_models/navigUpdate.model';
import { LangService } from 'app/_services/lang.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Node for to-do item
 */
// export class TodoItemNode {
//   children: TodoItemNode[];
//   item: string;
// }

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    // item: string;
    children: TodoItemNode[];
    level: number;
    expandable: boolean;
    id: string;
    title: string;
    titleEng: string;
    titleKaz: string;
    type: string;
    icon: string;
    url: string;
}

export class TodoItemNode {
    children: TodoItemNode[];
    title: string;
    titleEng: string;
    titleKaz: string;
    expanded: boolean;
    type: string;
    icon: string;
    url: string;
    id: string;
    selected: boolean;
    parentId: string;
    // item: string;
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = [
    {
        id: 'cf55339b-9f23-4532-994d-1a8cfc8378f6',
        title: 'AdminEng',
        type: 'group',
        icon: 'apps',
        url: '/app/new',
        expanded: false,
        selected: false,
        children: [
            {
                title: 'Childgroup 1',
                type: 'group',
                icon: 'apps',
                url: '/app/new',
                expanded: false,
                id: '2',
                selected: true,
                children: []
            },
            {
                title: 'Childgroup 2',
                type: 'group',
                icon: 'apps',
                url: '/app/new',
                expanded: false,
                id: '3',
                selected: false,
                children: [
                    {
                        title: 'Child of child',
                        type: 'group',
                        icon: 'apps',
                        url: '/app/new',
                        expanded: false,
                        id: '4',
                        selected: false,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        title: 'Group 2',
        type: 'group',
        icon: 'apps',
        url: '/app/new',
        expanded: false,
        id: '5',
        selected: false,
        children: [
            {
                title: 'Childgroup 1',
                type: 'group',
                icon: 'apps',
                url: '/app/new',
                expanded: false,
                id: '6',
                selected: false,
                children: []
            },
            {
                title: 'Childgroup 2',
                type: 'group',
                icon: 'apps',
                url: '/app/new',
                expanded: false,
                id: '7',
                selected: false,
                children: [
                    {
                        title: 'Child of child',
                        type: 'group',
                        icon: 'apps',
                        url: '/app/new',
                        expanded: false,
                        id: '8',
                        selected: true,
                        children: []
                    }
                ]
            }
        ]
    }
];

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

    navigs_data: Navig[] = [];
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }

    constructor(private _navigService: NavigService) {
        // this.initialize();
         ///////////////////////////////////////
    const http$ = this._navigService.getNavig('ru');
    http$.subscribe(
      navigs => {
          // console.log('navig: ', navigs);
          // this.navigs = navigs;

          navigs.forEach(navig => {
              const nav = new Navig(navig);
              this.navigs_data.push(nav);
          });

          this.initialize();
          // console.log('last navig: ', this.navigs_data);

          // // // Register the new navigation
          // this._fuseNavigationService.register('navig', navigs);

          // // // Set the current navigation
          // this._fuseNavigationService.setCurrentNavigation('navig');
      },
      err => console.log(err),
      () => console.log('completed')
  );

  ////////////////////////////////////////
    }

    // tslint:disable-next-line:typedef
    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        // const data = this.buildFileTree(TREE_DATA, 0);

        const data = this.buildFileTree(this.navigs_data, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: any, level: number): TodoItemNode[] {
        console.log('obj: ', obj);

        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            // node.name = key;
            node.title = value.title;
            node.id = value.id;

            // console.log('value: ', value);
            // console.log('key: ', key);
            // console.log('accumulator: ', accumulator);

            if (value != null) {
                if (typeof value === 'object' && value.children != null && value.children.length > 0) {
                    node.children = this.buildFileTree(
                        value.children,
                        level + 1
                    );
                } else {
                    node.title = value.title;
                }
            }
            // console.log('accumulator.concat(node): ', accumulator.concat(node));

            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    // tslint:disable-next-line:typedef
    insertItem(parent: TodoItemNode, tdItem: TodoItemNode) {
        if (parent.children) {
            parent.children.push(tdItem);
            this.dataChange.next(this.data);
        }
    }

    // tslint:disable-next-line:typedef
    updateItem(node: TodoItemNode, title: string) {
        // node.item = name;
        node.title = title;
        // node.id = id;
        node.children = null;
        this.dataChange.next(this.data);
        console.log('data: ', this.data);
    }
}

@Component({
    selector: 'app-edit-menu',
    templateUrl: './edit-menu.component.html',
    styleUrls: ['./edit-menu.component.scss'],
    providers: [ChecklistDatabase]
})
export class EditMenuComponent {
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(
        true /* multiple */
    );

    constructor(private database: ChecklistDatabase, 
      private _navigService: NavigService,
     private _langService: LangService,
     private _fuseNavigationService: FuseNavigationService,
     private _translateService: TranslateService) {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
            this.getLevel,
            this.isExpandable
        );
        this.dataSource = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
        );

        database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
        // tslint:disable-next-line:semicolon
        _nodeData.title === '';

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        // const flatNode = existingNode && existingNode.item === node.name
        //     ? existingNode
        //     : new TodoItemFlatNode();
        const flatNode =
            existingNode &&
            existingNode.id === node.id &&
            existingNode.title === node.title
                ? existingNode
                : new TodoItemFlatNode();
        // flatNode.item = node.name;
        flatNode.id = node.id;
        flatNode.title = node.title;
        flatNode.titleEng = node.titleEng;
        flatNode.titleKaz = node.titleKaz;
        flatNode.type = node.type;
        flatNode.icon = node.icon;
        flatNode.url = node.url;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    // tslint:disable-next-line:semicolon
    };

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child =>
            this.checklistSelection.isSelected(child)
        );
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Select the category so we can insert the new item. */
    // tslint:disable-next-line:typedef
    addNewItem(node: TodoItemFlatNode) {
        // console.log('TodoItemFlatNode: ', node);

        const parentNode = this.flatNodeMap.get(node);
        // console.log('parentNode: ', parentNode);

        if (parentNode.children === undefined || parentNode.children == null){
          parentNode.children = [];
        }
        // alert(parentNode.id);

        const uuidv1 = require('uuid/v1');

        const tdNode = new TodoItemNode();
        tdNode.title = '';
        tdNode.titleEng = '';
        tdNode.titleKaz = '';
        tdNode.expanded = false;
        tdNode.id = uuidv1();
        tdNode.selected = false;
        tdNode.children = null;
        tdNode.parentId = parentNode.id;

         if (node.children === undefined || node.children === null) {
          node.children = [];
        }

        // tslint:disable-next-line:no-non-null-assertion
        // this.database.insertItem(parentNode!, '');
        // tslint:disable-next-line:no-non-null-assertion
        this.database.insertItem(parentNode!, tdNode);
        this.treeControl.expand(node);
        // console.log('node: ', node);
    }

    /** Save the node to database */
    // tslint:disable-next-line:typedef
    saveNode(node: TodoItemFlatNode, title: string, titleEng: string, titleKaz: string, type: string, icon: string, url: string) {
        console.log('save node: ', node);

        const nestedNode = this.flatNodeMap.get(node);

        const navig = new NavigUpdate;
        navig.id = nestedNode.id;
        navig.parentId = nestedNode.parentId;
        navig.title = title;
        navig.titleEng = titleEng;
        navig.titleKaz = titleKaz;
        navig.type = type;
        navig.icon = icon;
        navig.url = url;

        this._navigService.addNavig(navig).subscribe(
          res => {
            console.log(res);
            
            this._langService.getMenuForCurrentLang(this._translateService.currentLang);
          }
        );
        
        // tslint:disable-next-line:no-non-null-assertion
        this.database.updateItem(nestedNode!, title);
    }

    // tslint:disable-next-line:typedef
    // saveNode(node: TodoItemNode, itemValue: string) {
    //   // const nestedNode = this.flatNodeMap.get(node);
    //   // tslint:disable-next-line:no-non-null-assertion
    //   this.database.updateItem(node!, itemValue);

    // }
}
