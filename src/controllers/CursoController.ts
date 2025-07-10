import NocodbController from "./NocodbController";

export class CursoController extends NocodbController {
    public NombreTabla: string;

    constructor(token: string) {
        super("m1qgokqms7cfewy", token)
        this.NombreTabla = "Cursos"
    }


}