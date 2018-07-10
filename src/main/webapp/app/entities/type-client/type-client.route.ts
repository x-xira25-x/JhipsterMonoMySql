import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TypeClientComponent } from './type-client.component';
import { TypeClientDetailComponent } from './type-client-detail.component';
import { TypeClientPopupComponent } from './type-client-dialog.component';
import { TypeClientDeletePopupComponent } from './type-client-delete-dialog.component';

export const typeClientRoute: Routes = [
    {
        path: 'type-client',
        component: TypeClientComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeClients'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'type-client/:id',
        component: TypeClientDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeClients'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeClientPopupRoute: Routes = [
    {
        path: 'type-client-new',
        component: TypeClientPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeClients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-client/:id/edit',
        component: TypeClientPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeClients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'type-client/:id/delete',
        component: TypeClientDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'TypeClients'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
