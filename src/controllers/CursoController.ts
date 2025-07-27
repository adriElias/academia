import { NocodbController } from "./NocodbController";

export class CursoController extends NocodbController {
    public NombreTabla: string;

    constructor(token: string) {
        super("m1qgokqms7cfewy", token)
        this.NombreTabla = "Cursos"
    }

    async addCategoria(idCategoria: string | number, idCurso: string | number): Promise<boolean> {
        const apiUrl = `https://app.nocodb.com/api/v2/tables/m1qgokqms7cfewy/links/c1wltdy62bx7g2m/records/${idCurso}`
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify([{Id: idCategoria}])
        });
        const data = await response.json();
        return data as boolean;

    }


}