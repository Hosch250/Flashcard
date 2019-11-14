import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
    {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
    },
    {
        path: 'edit/deck/:id',
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
    },
    {
        path: 'deck/:id',
        loadChildren: () => import('./deck-viewer/deck-viewer.module').then(m => m.DeckViewerModule)
    },
    {
        path: '**',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
