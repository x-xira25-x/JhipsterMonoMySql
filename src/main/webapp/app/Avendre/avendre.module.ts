import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvendreComponent } from './avendre.component';

import {avendrePopupRoute, avendreRoute} from './avendre.route';
import {JhipsterTestMonoSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {AvendreVisiteDialogComponent, avendreVisitePopupComponent} from './avendre-visite-dialog.component';
import {AvendreVisiteService} from './avendre-visite.service';
import {AvendreVisitePopupService} from './avendre-visite-popup.service';

const ENTITY_STATES = [
    ...avendreRoute,
    ...avendrePopupRoute
];

@NgModule({
  imports: [
    CommonModule,
      JhipsterTestMonoSharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [

  AvendreComponent,
  AvendreVisiteDialogComponent,
      avendreVisitePopupComponent
  ],
    entryComponents: [
        AvendreComponent,
        AvendreVisiteDialogComponent,
        avendreVisitePopupComponent
        ],

    providers: [
        AvendreVisitePopupService,
        AvendreVisiteService
    ]

})
export class AvendreModule { }
