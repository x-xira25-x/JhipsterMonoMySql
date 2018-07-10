import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TypeBienComponent } from './type-bien.component';
import { TypeBienDetailComponent } from './type-bien-detail.component';
import { TypeBienPopupComponent } from './type-bien-dialog.component';
import { TypeBienDeletePopupComponent } from './type-bien-delete-dialog.component';

export const typeBienRoute: Routes = [
    {
        path: 'type-bien',
        component: TypeBienComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeBiens'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'type-bien/:id',
        component: TypeBienDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeBiens'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeBienPopupRoute: Routes = [
    {
        path: 'type-bien-new',
        component: TypeBienPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-bien/:id/edit',
        component: TypeBienPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-bien/:id/delete',
        component: TypeBienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
