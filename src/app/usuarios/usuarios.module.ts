import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosLayoutComponent } from './layout/usuarios-layout/usuarios-layout.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { DeleteUsuarioComponent } from './components/delete-usuario/delete-usuario.component';
import { ModifyUsuarioComponent } from './components/modify-usuario/modify-usuario.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { AccountNonLockedPipe } from './pipes/account-non-locked.pipe';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosLayoutComponent,
    UsuariosPageComponent,
    AddUsuarioComponent,
    DeleteUsuarioComponent,
    ModifyUsuarioComponent,
    ListUsuarioComponent,
    AccountNonLockedPipe
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
