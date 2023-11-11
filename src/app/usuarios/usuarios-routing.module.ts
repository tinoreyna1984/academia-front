import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosLayoutComponent } from './layout/usuarios-layout/usuarios-layout.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';

const routes: Routes = [
    {
      path: '',
      component: UsuariosLayoutComponent,
      children: [
        {
          path: '',
          component: UsuariosPageComponent,
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
  export class UsuariosRoutingModule { }