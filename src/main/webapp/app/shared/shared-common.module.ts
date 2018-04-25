import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    JhipsterTestMonoSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        JhipsterTestMonoSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        JhipsterTestMonoSharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class JhipsterTestMonoSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
