import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MateriasService } from '../../services/materias.service';
import { Materia } from 'src/app/shared/interfaces/shared.interface';
import { AddMateriaComponent } from '../add-materia/add-materia.component';
import { ModifyMateriaComponent } from '../modify-materia/modify-materia.component';
import { DeleteMateriaComponent } from '../delete-materia/delete-materia.component';

@Component({
  selector: 'app-list-materia',
  templateUrl: './list-materia.component.html',
  styleUrls: ['./list-materia.component.css']
})
export class ListMateriaComponent {
  constructor(
    private materiasService: MateriasService,
    private authService: AuthService,
    private materia: MatDialog,
  ) {}

  loading: boolean = false;
  isAdminFlag: boolean = false;

  public dataSource: MatTableDataSource<Materia> = new MatTableDataSource<Materia>(
    []
  );

  displayedColumns: string[] = [
    'id',
    'nombreMateria',
    'descMateria',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de clientes...');
    this.isAdminFlag = this.authService.isAdmin();
    this.loading = true;
    this.materiasService.getMaterias().subscribe(
      {
        next: (materias: Materia[]) => {
            this.dataSource = new MatTableDataSource<Materia>(materias);
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

  openAgregarMateria(){
    const dialogRef = this.materia.open(AddMateriaComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.materiasService.getMaterias().subscribe(
          {
            next: (materias: Materia[]) => {
              this.dataSource.data = materias;
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

  openModificarMateria(materiaID: string){
    const dialogRef = this.materia.open(ModifyMateriaComponent, {
      data: materiaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.materiasService.getMaterias().subscribe(
          {
            next: (materias: Materia[]) => {
              this.dataSource.data = materias;
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

  openBorrarMateria(materiaID: string){
    const dialogRef = this.materia.open(DeleteMateriaComponent, {
      data: materiaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.materiasService.getMaterias().subscribe(
          {
            next: (materias: Materia[]) => {
              this.dataSource.data = materias;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }

}
