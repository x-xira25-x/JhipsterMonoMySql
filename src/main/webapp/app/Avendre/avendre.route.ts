import { Routes } from '@angular/router';
import {AvendreComponent} from './avendre.component';
import {UserRouteAccessService} from '../shared';
import { avendreVisitePopupComponent} from './avendre-visite-dialog.component';

export const avendreRoute: Routes = [
    {
        path: 'avendre',
        component: AvendreComponent,
        data: {
           // authorities: ['ROLE_USER'],
            pageTitle: 'Avendre'
        },
    }
];
export const avendrePopupRoute: Routes = [
    {
        path: 'bienVisite/:id/visite',

        component: avendreVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BiensVisite'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }

];
