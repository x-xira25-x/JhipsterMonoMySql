import { Routes } from '@angular/router';
import {VisitesClientComponent} from "./visites-client.component";


export const visitesClientRoute: Routes = [
    {
        path: 'VistiesClient',
        component: VisitesClientComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'Vistite'
        },
    }
];
