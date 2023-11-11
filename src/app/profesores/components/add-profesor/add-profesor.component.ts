import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.css']
})
export class AddProfesorComponent {
  private profesoresService = inject(ProfesoresService);
  private snackBar = inject(MatSnackBar);

  formAddProfesor: FormGroup;

  
  constructor() {
    this.formAddProfesor = new FormGroup({
      nombreProfesor: new FormControl(),
      apellidosProfesor: new FormControl(),
      correo: new FormControl(),
    });
  }

  onAddProfesor(){
    this.profesoresService.addProfesor(this.formAddProfesor.value).subscribe(
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
          Swal.fire('Error al agregar profesor', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    )
  }

}
