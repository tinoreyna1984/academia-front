import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from 'src/app/shared/interfaces/shared.interface';
@Component({
  selector: 'app-modify-usuario',
  templateUrl: './modify-usuario.component.html',
  styleUrls: ['./modify-usuario.component.css'],
})
export class ModifyUsuarioComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  private snackBar = inject(MatSnackBar);
  private usuarioID: string = inject(MAT_DIALOG_DATA);
  private usuario!: User;
  loading: boolean = false;

  formModifyUsuario: FormGroup;

  constructor() {
    this.formModifyUsuario = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.usuariosService.getUser(this.usuarioID).subscribe({
        next: (response: User) => {
          this.loading = false;
          this.usuario = response;
          console.log(this.usuario);
          this.formModifyUsuario.patchValue({
            name: this.usuario.name,
            lastName: this.usuario.lastName,
            username: this.usuario.username,
            password: '',
            email: this.usuario.email,
            role: this.usuario.role,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el usuario',
            'No se encuentra el usuario con ID ' + this.usuarioID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyUsuario(){
    let tmpForm: any = this.formModifyUsuario.value;
    const { role, password } = this.formModifyUsuario.value;
    if(!role)
      tmpForm = {...tmpForm, role: 'USER'};
    if(!password){
      Swal.fire(
        'Ingresa tu clave',
        'La clave es requerida',
        'error'
      );
      return; //TODO: mantener el dialog abierto mientras este campo falte
    }
    this.usuariosService.modifyUser(tmpForm, this.usuarioID).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.snackBar.openFromComponent(MessageSnackBarComponent, {
          duration: 3500,
          data: response.mensaje,
        });
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error al modificar usuario',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }
}


