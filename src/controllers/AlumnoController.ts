import { NocodbController } from "./NocodbController";

export class AlumnoController extends NocodbController {

    constructor(token: string) {
        super("met3zt25o9idyyf", token)
    }

    getAlumnosCurso(idCurso: string | number): void {
        // ...
    }
    
}