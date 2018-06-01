import { Routes } from '@angular/router';
import {PresentationComponent} from './presentation.component';

export const presentationRoute: Routes = [
    {
        path: 'presentation',
        component: PresentationComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'Présentation'
        },

    }
];
