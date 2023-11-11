import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasLayoutComponent } from './layout/materias-layout/materias-layout.component';
import { MateriasPageComponent } from './pages/materias-page/materias-page.component';

const routes: Routes = [
    {
      path: '',
      component: MateriasLayoutComponent,
      children: [
        {
          path: '',
          component: MateriasPageComponent,
        },
        {
          path: '**',
          redirectTo: 'aulas',
        },
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MateriasRoutingModule { }