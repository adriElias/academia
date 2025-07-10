import NocodbController from "./NocodbController.js";

export class CursoController extends NocodbController {

    constructor(token) {
        super("m1qgokqms7cfewy", token)
        this.NombreTabla = "Cursos"
    }


}