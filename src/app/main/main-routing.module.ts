import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'aulas',
        loadChildren: () => import('../aulas/aulas.module').then( m => m.AulasModule ),
      },
      {
        path: 'profesores',
        loadChildren: () => import('../profesores/profesores.module').then( m => m.ProfesoresModule ),
      },
      {
        path: 'materias',
        loadChildren: () => import('../materias/materias.module').then( m => m.MateriasModule ),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then( m => m.UsuariosModule ),
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
export class MainRoutingModule { }
