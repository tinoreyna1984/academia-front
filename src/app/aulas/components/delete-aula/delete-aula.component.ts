import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { AulasService } from '../../services/aulas.service';
import { Aula } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-delete-aula',
  templateUrl: './delete-aula.component.html',
  styleUrls: ['./delete-aula.component.css']
})
export class DeleteAulaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private aulaID: string,
    private aulasService: AulasService,
    private snackBar: MatSnackBar
  ){}

  aula?: Aula;

  onBorrarAula(){
    this.aulasService.borrarAula(this.aulaID).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al borrar aula', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }
}
