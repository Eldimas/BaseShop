import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { NavigService } from 'app/_services/navig.service';
import { LangService } from 'app/_services/lang.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'app/_services/category.service';
import { Category } from 'app/_models/category';
import { CategoryUpdate } from 'app/_models/categoryUpdate.model';

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
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

    cats_data: Category[] = [];
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }

    constructor(private _categoryService: CategoryService) {
    const http$ = this._categoryService.getCategories('ru');
    http$.subscribe(
      categories => {
          
          categories.forEach(category => {
              const cat = new Category(category);
              this.cats_data.push(cat);
          });

          this.initialize();
      },
      err => console.log(err),
      () => console.log('completed')
  );
}

    // tslint:disable-next-line:typedef
    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        
        const data = this.buildFileTree(this.cats_data, 0);

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
        node.title = title;
        node.children = null;
        this.dataChange.next(this.data);
        console.log('data: ', this.data);
    }

      // tslint:disable-next-line:typedef
      removeItem(node: TodoItemNode) {
        this.dataChange.next(this.data);
        console.log('data: ', this.data);
    }
}

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss'],
  providers: [ChecklistDatabase]
})
export class EditCategoriesComponent {
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
      private _categoryService: CategoryService,
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

    // tslint:disable-next-line:typedef
    removeItem(node: TodoItemFlatNode) {

        this._categoryService.removeCategory(node.id).subscribe( res => {
            console.log(res);
            this._langService.getCategoryForCurrentLang(this._translateService.currentLang);

            this._categoryService.getCategories('ru').subscribe( categories => {
                // console.log(result);
                categories.forEach(category => {
                    const cat = new Category(category);
                    this.database.cats_data = [];
                    this.database.cats_data.push(cat);
                });
                this.database.initialize();
            });
            // const nestedNode = this.getParentNode(node);
            // if (nestedNode !== null) {
            //     for (let i = 0; i < nestedNode.children.length; i++) {
            //         const element = nestedNode.children[i];
            //         if (element.id === node.id)
            //         {
            //             nestedNode.children.splice(i, 1);
            //             break;
            //         }
                    
            //     }
            //     // this.database.updateItem(nestedNode, nestedNode.title);

            // }
            // nestedNode.children.splice(nestedNode.children.indexOf(node.id), 1);
        });
        // alert(node.id);
    }

    /** Save the node to database */
    // tslint:disable-next-line:typedef
    // saveNode(node: TodoItemFlatNode, title: string, titleEng: string, titleKaz: string, type: string, icon: string, url: string) 
    // tslint:disable-next-line:typedef
    saveNode(node: TodoItemFlatNode, title: string, titleEng: string, titleKaz: string) 
    {
       
        const nestedNode = this.flatNodeMap.get(node);

        const cat = new CategoryUpdate;
        cat.id = nestedNode.id;
        cat.parentId = nestedNode.parentId;
        cat.title = title;
        cat.titleEng = titleEng;
        cat.titleKaz = titleKaz;
        // cat.type = type;
        // cat.icon = icon;
        // cat.url = url;

        this._categoryService.addCategory(cat).subscribe(
          res => {
            console.log(res);
            
            this._langService.getCategoryForCurrentLang(this._translateService.currentLang);
          }
        );
        
        // tslint:disable-next-line:no-non-null-assertion
        this.database.updateItem(nestedNode!, title);
    }

    // tslint:disable-next-line:typedef
    saveRootNode(title: string, titleEng: string, titleKaz: string) {
            console.log(title + ' / ' + titleEng + ' / ' + titleKaz);

            const uuidv1 = require('uuid/v1');

            const cat = new CategoryUpdate;
            cat.id = uuidv1();
            cat.parentId = null;
            cat.title = title;
            cat.titleEng = titleEng;
            cat.titleKaz = titleKaz;
            // cat.type = type;
            // cat.icon = icon;
            // cat.url = url;
    
            this._categoryService.addCategory(cat).subscribe(
              res => {
                console.log(res);
                
                this._langService.getCategoryForCurrentLang(this._translateService.currentLang);
              }
            );

            // tslint:disable-next-line:no-non-null-assertion
            this.database.initialize();

    }

}
