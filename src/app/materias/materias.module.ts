import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MateriasPageComponent } from './pages/materias-page/materias-page.component';
import { MateriasLayoutComponent } from './layout/materias-layout/materias-layout.component';
import { AddMateriaComponent } from './components/add-materia/add-materia.component';
import { DeleteMateriaComponent } from './components/delete-materia/delete-materia.component';
import { ListMateriaComponent } from './components/list-materia/list-materia.component';
import { ModifyMateriaComponent } from './components/modify-materia/modify-materia.component';
import { MateriasRoutingModule } from './materias-routing.module';



@NgModule({
  declarations: [
    MateriasPageComponent,
    MateriasLayoutComponent,
    AddMateriaComponent,
    DeleteMateriaComponent,
    ListMateriaComponent,
    ModifyMateriaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MateriasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MateriasModule { }
