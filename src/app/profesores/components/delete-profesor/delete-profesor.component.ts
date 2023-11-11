import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-delete-profesor',
  templateUrl: './delete-profesor.component.html',
  styleUrls: ['./delete-profesor.component.css']
})
export class DeleteProfesorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private profesorID: string,
    private profesoresService: ProfesoresService,
    private snackBar: MatSnackBar
  ) {}

  profesor?: Profesor;

  onBorrarProfesor() {
    this.profesoresService.borrarProfesor(this.profesorID).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al borrar profesor', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
      
    );
  }

}
