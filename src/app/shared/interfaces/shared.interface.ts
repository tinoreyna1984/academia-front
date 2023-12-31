// Generated by https://quicktype.io

// Interfaces

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  role: Role;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  failedAttempts: number;
  lockTime?: string;
}

export interface Aula {
  id:                number;
  codAula:           string;
  fechaHoraRegistro: string;
  tema:              string;
  profesor:          Profesor;
  materia:           Materia;
}

export interface Materia {
  id:            number;
  nombreMateria: string;
  descMateria:   string;
}

export interface Profesor {
  id:                number;
  nombreProfesor:    string;
  apellidosProfesor: string;
  correo:            string;
}


// enums

export enum Role {
  USER = 'USER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}
