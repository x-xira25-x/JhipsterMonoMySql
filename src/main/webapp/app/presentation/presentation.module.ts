import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {presentationRoute} from './presentation.route';
import {JhipsterTestMonoSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {PresentationComponent} from './presentation.component';

const ENTITY_STATES = [
    ...presentationRoute

];
@NgModule({
  imports: [
    CommonModule,
      JhipsterTestMonoSharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
      PresentationComponent
  ],
    entryComponents: [
        PresentationComponent
        ]
})

export class PresentationModule { }
