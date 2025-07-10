// Tipos globales para la aplicación

export interface UserData {
    nombre: string;
    token: string;
}

export interface Alumno {
    Id: number;
    nombre: string;
    email: string;
    telefono: string;
    idCurso: number;
    curso: string;
}

export interface Curso {
    Id: number;
    Title: string;
    turno?: string;
    duracion?: string;
    inicio?: string;
}

export interface NocodbResponse<T = any> {
    list: T[];
    pageInfo?: {
        totalRows?: number;
        page?: number;
        pageSize?: number;
        isFirstPage?: boolean;
        isLastPage?: boolean;
    };
}

export interface RequestOptions {
    method: string;
    headers: {
        'Content-Type': string;
        'xc-token': string;
    };
    body?: string;
}
