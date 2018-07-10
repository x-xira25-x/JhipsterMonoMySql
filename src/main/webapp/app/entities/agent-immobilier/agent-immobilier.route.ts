import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AgentImmobilierComponent } from './agent-immobilier.component';
import { AgentImmobilierDetailComponent } from './agent-immobilier-detail.component';
import { AgentImmobilierPopupComponent } from './agent-immobilier-dialog.component';
import { AgentImmobilierDeletePopupComponent } from './agent-immobilier-delete-dialog.component';

export const agentImmobilierRoute: Routes = [
    {
        path: 'agent-immobilier',
        component: AgentImmobilierComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'AgentImmobiliers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agent-immobilier/:id',
        component: AgentImmobilierDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'AgentImmobiliers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agentImmobilierPopupRoute: Routes = [
    {
        path: 'agent-immobilier-new',
        component: AgentImmobilierPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'AgentImmobiliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agent-immobilier/:id/edit',
        component: AgentImmobilierPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'AgentImmobiliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agent-immobilier/:id/delete',
        component: AgentImmobilierDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_AGENTIMMO'],
            pageTitle: 'AgentImmobiliers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
