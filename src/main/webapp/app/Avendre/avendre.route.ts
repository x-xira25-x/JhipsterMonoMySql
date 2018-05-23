import { Routes } from '@angular/router';


import {AvendreComponent} from "./avendre.component";


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


