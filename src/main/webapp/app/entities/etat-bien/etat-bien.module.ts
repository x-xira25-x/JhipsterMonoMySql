import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterTestMonoSharedModule } from '../../shared';
import {
    EtatBienService,
    EtatBienPopupService,
    EtatBienComponent,
    EtatBienDetailComponent,
    EtatBienDialogComponent,
    EtatBienPopupComponent,
    EtatBienDeletePopupComponent,
    EtatBienDeleteDialogComponent,
    etatBienRoute,
    etatBienPopupRoute,
} from './';

const ENTITY_STATES = [
    ...etatBienRoute,
    ...etatBienPopupRoute,
];

@NgModule({
    imports: [
        JhipsterTestMonoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtatBienComponent,
        EtatBienDetailComponent,
        EtatBienDialogComponent,
        EtatBienDeleteDialogComponent,
        EtatBienPopupComponent,
        EtatBienDeletePopupComponent,
    ],
    entryComponents: [
        EtatBienComponent,
        EtatBienDialogComponent,
        EtatBienPopupComponent,
        EtatBienDeleteDialogComponent,
        EtatBienDeletePopupComponent,
    ],
    providers: [
        EtatBienService,
        EtatBienPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTestMonoEtatBienModule {}
