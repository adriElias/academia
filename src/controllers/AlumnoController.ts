import { NocodbController } from "./NocodbController";

export class AlumnoController extends NocodbController {

    constructor(token: string) {
        super("met3zt25o9idyyf", token)
    }

    getAlumnosCurso(idCurso: string | number): void {
        // ...
    }

    async inscribirCurso(idCurso: string | number, idAlumno: string | number): Promise<boolean> {
        const apiUrl = `https://app.nocodb.com/api/v2/tables/met3zt25o9idyyf/links/cjox6viwllvumga/records/${idAlumno}`
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify([{Id: idCurso}])
        });
        const data = await response.json();
        return data as boolean;

    }

}