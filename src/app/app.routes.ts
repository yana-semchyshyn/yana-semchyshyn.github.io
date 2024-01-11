import { Routes } from '@angular/router';

import { ConfiguratorLayoutComponent } from './shared/components';
import { ModelSelectionComponent, ConfigurationsComponent, SummaryComponent } from './components';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'design'
    },
    {
        path: 'design',
        component: ConfiguratorLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'model-selection'
            },
            {
                path: 'model-selection',
                component: ModelSelectionComponent
            },
            {
                path: 'configurations',
                component: ConfigurationsComponent
            },
            {
                path: 'summary',
                component: SummaryComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'design'
    }
];
