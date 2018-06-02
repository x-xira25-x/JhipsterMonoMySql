import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterTestMonoSharedModule, UserRouteAccessService } from './shared';
import { JhipsterTestMonoAppRoutingModule} from './app-routing.module';
import { JhipsterTestMonoHomeModule } from './home/home.module';
import { JhipsterTestMonoAdminModule } from './admin/admin.module';
import { JhipsterTestMonoAccountModule } from './account/account.module';
import { AvendreModule} from './Avendre/avendre.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

import {JhipsterTestMonoEntityModule} from './entities/entity.module';
import { PresentationComponent } from './presentation/presentation.component';
import {PresentationModule} from './presentation/presentation.module';
import { VisitesClientComponent } from './visites-client/visites-client.component';
import {VisitesClientModule} from "./visites-client/visites-client.module";

@NgModule({
    imports: [
        BrowserModule,
        JhipsterTestMonoAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterTestMonoSharedModule,
        JhipsterTestMonoHomeModule,
        JhipsterTestMonoAdminModule,
        JhipsterTestMonoAccountModule,
        JhipsterTestMonoEntityModule,
        AvendreModule,
        PresentationModule,
        VisitesClientModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterTestMonoAppModule {}
