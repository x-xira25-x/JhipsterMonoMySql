import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvendreComponent } from './avendre.component';

import {avendreRoute} from "./avendre.route";
import {JhipsterTestMonoSharedModule} from "../shared";
import {RouterModule} from "@angular/router";

const ENTITY_STATES = [
    ...avendreRoute
];


@NgModule({
  imports: [
    CommonModule,
      JhipsterTestMonoSharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [

  AvendreComponent]
})
export class AvendreModule { }
