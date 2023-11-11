import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesoresLayoutComponent } from './layout/profesores-layout/profesores-layout.component';
import { ProfesoresPageComponent } from './pages/profesores-page/profesores-page.component';

const routes: Routes = [
    {
      path: '',
      component: ProfesoresLayoutComponent,
      children: [
        {
          path: '',
          component: ProfesoresPageComponent,
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
  export class ProfesoresRoutingModule { }