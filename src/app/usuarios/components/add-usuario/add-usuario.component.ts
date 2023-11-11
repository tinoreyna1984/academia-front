import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {
  private usuariosService = inject(UsuariosService);
  private snackBar = inject(MatSnackBar);

  formAddUsuario: FormGroup;

  constructor() {
    this.formAddUsuario = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
    });
  }

  onAddUsuario(){
    let tmpForm: any = this.formAddUsuario.value;
    const { role } = this.formAddUsuario.value;
    if(!role)
      tmpForm = {...tmpForm, role: 'USER'};
    //console.log(tmpForm);
    this.usuariosService.addUser(tmpForm).subscribe(
      {
        next: (response: any) => {
          //console.log(response);
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al agregar usuario', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    )
  }
}
