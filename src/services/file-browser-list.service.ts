import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Node, Entity } from '../states/file-browser.model';
import { GenerateFileBrowser, GetNode, SortNodes } from '../states/file-browser.actions';

@Injectable()
export class FileBrowserList {
    nodes: Node[];
    entities: Entity[];

    constructor(private store: Store) {}

    // Generating the nodes and entities based on JSON
    generateFileBrowser(nodes:Node[], entities:Entity[], node:number) {
        this.nodes = nodes;
        this.entities = entities;

        if (node < 0) {
            node = 0;
        } 
        // TO-DO check if currentNode does not exist.

        this.store.dispatch(new GenerateFileBrowser(<any>nodes, <any>entities));
        this.store.dispatch(new GetNode(node));
    }

    toggleSort(sort) {
        this.store.dispatch(new SortNodes(sort));
    }
}




    

    // showNode(node) {
    //     this.store.dispatch(new GetNode(node));
    // }

    // showNodeInHistory(node) {
    //     this.store.dispatch(new GetNode(node))
    //     this.store.dispatch(new GenerateHistory(node));
    // }


  // sortToggle(field) {
  //   switch(field) {
  //     case 'name': {
  //       if (this.nameSort === 'arrow-down') {
  //         this.store.dispatch(new SortTree('name-desc'));
  //         this.nameSort = 'arrow-up';
  //         break;
  //       }

  //       if (this.nameSort === 'arrow-up') {
  //         this.store.dispatch(new SortTree('name-asc'));
  //         this.nameSort = 'arrow-down';
  //         break;
  //       }
  //     }
  //   }
  // }

  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Options',
  //     buttons: [
  //       {
  //         text: 'New Folder',
  //         handler: () => {
  //           console.log('New folder clicked');
  //         }
  //       }
  //     ]
  //   });

  //   actionSheet.present();
  // }