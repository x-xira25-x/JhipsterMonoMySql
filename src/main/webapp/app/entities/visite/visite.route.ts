import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VisiteComponent } from './visite.component';
import { VisiteDetailComponent } from './visite-detail.component';
import { VisitePopupComponent } from './visite-dialog.component';
import { VisiteDeletePopupComponent } from './visite-delete-dialog.component';

export const visiteRoute: Routes = [
    {
        path: 'visite',
        component: VisiteComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'Visites'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'visite/:id',
        component: VisiteDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'Visites'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitePopupRoute: Routes = [
    {
        path: 'visite-new',
        component: VisitePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'Visites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite/:id/edit',
        component: VisitePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'Visites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite/:id/delete',
        component: VisiteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'Visites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
