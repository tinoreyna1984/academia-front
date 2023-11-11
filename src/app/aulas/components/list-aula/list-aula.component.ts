import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ShowMateriaComponent } from '../show-materia/show-materia.component';
import { ShowProfesorComponent } from '../show-profesor/show-profesor.component';
import { DeleteAulaComponent } from '../delete-aula/delete-aula.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AulasService } from '../../services/aulas.service';
import { Aula } from 'src/app/shared/interfaces/shared.interface';
import { MateriasService } from 'src/app/materias/services/materias.service';
import { ProfesoresService } from 'src/app/profesores/services/profesores.service';
import { AddAulaComponent } from '../add-aula/add-aula.component';
import { ModifyAulaComponent } from '../modify-aula/modify-aula.component';

@Component({
  selector: 'app-list-aula',
  templateUrl: './list-aula.component.html',
  styleUrls: ['./list-aula.component.css']
})
export class ListAulaComponent {
  constructor(
    private aulasService: AulasService,
    private authService: AuthService,
    private materiasService: MateriasService,
    private profesoresService: ProfesoresService,
    private aula: MatDialog,
    private profesor: MatDialog,
    private materia: MatDialog
  ) {}

  loading: boolean = false;
  isAdminFlag: boolean = false;

  public dataSource: MatTableDataSource<Aula> = new MatTableDataSource<Aula>(
    []
  );
  
  displayedColumns: string[] = [
    'id',
    'codAula',
    'fechaHoraRegistro',
    'tema',
    'profesor',
    'materia',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de clientes...');
    this.isAdminFlag = this.authService.isAdmin();
    this.loading = true;
    this.aulasService.getAulas().subscribe(
      {
        next: (aulas: Aula[]) => {
            this.dataSource = new MatTableDataSource<Aula>(aulas);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
        },
        error: (e:any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }

  openMateria(materia: any) {
    this.materia.open(ShowMateriaComponent, {
      data: materia,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });
  }

  openProfesor(profesor: any) {
    this.profesor.open(ShowProfesorComponent, {
      data: profesor,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });
  }

  
  openAgregarAula(){
    const dialogRef = this.aula.open(AddAulaComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.aulasService.getAulas().subscribe(
          {
            next: (aulas: Aula[]) => {
              this.dataSource.data = aulas;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              this.loading = false;
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }

  
  openModificarAula(aulaID: string){
    const dialogRef = this.aula.open(ModifyAulaComponent, {
      data: aulaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.aulasService.getAulas().subscribe(
          {
            next: (aulas: Aula[]) => {
              this.dataSource.data = aulas;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });}

  
  openBorrarAula(aulaID: string){
    const dialogRef = this.aula.open(DeleteAulaComponent, {
      data: aulaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.aulasService.getAulas().subscribe(
          {
            next: (aulas: Aula[]) => {
              this.dataSource.data = aulas;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              this.loading = false;
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
      
    });
  }
}
