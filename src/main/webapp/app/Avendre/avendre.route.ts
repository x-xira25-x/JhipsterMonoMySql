import { Routes } from '@angular/router';


import {AvendreComponent} from "./avendre.component";
import {BienPopupComponent} from "../entities/bien/bien-dialog.component";
import {UserRouteAccessService} from "../shared";
import {BienDeletePopupComponent} from "../entities/bien/bien-delete-dialog.component";
import {AvendreVisiteDialogComponent, avendreVisitePopupComponent} from "./avendre-visite-dialog.component";


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


