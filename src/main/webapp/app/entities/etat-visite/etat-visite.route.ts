import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EtatVisiteComponent } from './etat-visite.component';
import { EtatVisiteDetailComponent } from './etat-visite-detail.component';
import { EtatVisitePopupComponent } from './etat-visite-dialog.component';
import { EtatVisiteDeletePopupComponent } from './etat-visite-delete-dialog.component';

export const etatVisiteRoute: Routes = [
    {
        path: 'etat-visite',
        component: EtatVisiteComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatVisites'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etat-visite/:id',
        component: EtatVisiteDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatVisites'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etatVisitePopupRoute: Routes = [
    {
        path: 'etat-visite-new',
        component: EtatVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatVisites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-visite/:id/edit',
        component: EtatVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatVisites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-visite/:id/delete',
        component: EtatVisiteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'EtatVisites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
