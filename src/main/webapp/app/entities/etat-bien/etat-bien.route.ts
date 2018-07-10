import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EtatBienComponent } from './etat-bien.component';
import { EtatBienDetailComponent } from './etat-bien-detail.component';
import { EtatBienPopupComponent } from './etat-bien-dialog.component';
import { EtatBienDeletePopupComponent } from './etat-bien-delete-dialog.component';

export const etatBienRoute: Routes = [
    {
        path: 'etat-bien',
        component: EtatBienComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatBiens'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etat-bien/:id',
        component: EtatBienDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatBiens'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etatBienPopupRoute: Routes = [
    {
        path: 'etat-bien-new',
        component: EtatBienPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-bien/:id/edit',
        component: EtatBienPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-bien/:id/delete',
        component: EtatBienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatBiens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
