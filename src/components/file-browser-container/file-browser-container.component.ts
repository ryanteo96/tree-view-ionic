/* ==================================================================================================== */
/* File Browser Container Component                                     								*/
/* ==================================================================================================== */

import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { LoadingController, ActionSheetController } from "ionic-angular";
import { Store } from "@ngxs/store";
import { FileBrowser } from "../../services/file-browser.service";
import { FileBrowserContainerCoreComponent } from "./file-browser-container-core.component";
import { FileBrowserContainerMobileComponent } from "./file-browser-container-mobile.component";
import { SetOS } from "../../states/file-browser.actions";

@Component({
	selector: "file-browser",
	template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class FileBrowserContainerComponent implements OnInit {
	@ViewChild("myNav") nav: NavController;

	public rootPage: any;

	constructor(
		public loadingCtrl: LoadingController,
		public actionSheetCtrl: ActionSheetController,
		public fileBrowser: FileBrowser,
		public plt: Platform,
		public store: Store
	) {
		console.log(this.plt.platforms());

		if (this.plt.is("core")) {
			this.rootPage = FileBrowserContainerCoreComponent;
			this.store.dispatch(new SetOS("core"));
			// this.nav.push(this.corePage);
		} else if (this.plt.is("mobile")) {
			this.rootPage = FileBrowserContainerMobileComponent;
			this.store.dispatch(new SetOS("mobile"));
			// this.nav.push(this.mobilePage);
		}
	}

	ngOnInit() {
		// this.presentLoading();
	}

	// presentLoading() {
	//   const loader = this.loadingCtrl.create({
	//       content: 'Loading files...',
	//       duration: 3000
	//   });
	//   loader.present();
	// }
}
