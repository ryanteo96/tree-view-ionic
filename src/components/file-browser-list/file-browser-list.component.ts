/* ==================================================================================================== */
/* File Browser List Component																			*/
/* ==================================================================================================== */

import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Entity } from "../../states/file-browser.model";
import { FileBrowser } from "../../services/file-browser.service";
import { FileBrowserState } from "../../states/file-browser.state";
import { GetNode, SelectNode } from "../../states/file-browser.actions";
import { FileBrowserActionSheetComponent } from "../file-browser-action-sheet/file-browser-action-sheet.component";

@Component({
	selector: "file-browser-list",
	templateUrl: "file-browser-list.html",
	styleUrls: ["file-browser-list.scss"],
	providers: [FileBrowserActionSheetComponent]
})
export class FileBrowserListComponent implements OnInit {
	@Select(FileBrowserState.getChildNodes) nodes$: Observable<Entity>;

	constructor(
		public store: Store,
		public fileBrowser: FileBrowser,
		public fileBrowserActionSheet: FileBrowserActionSheetComponent
	) {}

	ngOnInit() {}

	showNode(node) {
		if (node.type === "folder") this.store.dispatch(new GetNode(node.id));
	}

	showActionSheet(node) {
		event.stopPropagation();
		this.fileBrowserActionSheet.presentActionSheet(node);

		if (!node.selected) {
			this.store.dispatch(new SelectNode(node.id, false, ""));
		}
	}

	selectNode(node, event) {
		if (event.ctrlKey || event.metaKey) {
			this.store.dispatch(new SelectNode(node.id, true, "alt"));
		} else if (event.shiftKey) {
			this.store.dispatch(new SelectNode(node.id, true, "shift"));
		} else this.store.dispatch(new SelectNode(node.id, false, ""));
	}
}
