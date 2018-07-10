import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JhipsterTestMonoSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {visitesClientRoute} from './visites-client.route';
import {VisitesClientComponent} from './visites-client.component';

const ENTITY_STATES = [
    ...visitesClientRoute,
];

@NgModule({
    imports: [
        CommonModule,
        JhipsterTestMonoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [

    VisitesClientComponent,

    ],
    entryComponents: [
        VisitesClientComponent,

    ],
})
export class VisitesClientModule { }
