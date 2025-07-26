import { UserContext } from "./contextos/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CursoController } from "./controllers/CursoController";
import { ReactElement } from "react";
import { Curso } from "./types";
import { Form } from "react-bootstrap";

enum Nivel {
    BASICO = 'BASICO',
    INTERMEDIO = 'INTERMEDIO',
    AVANZADO = 'AVANZADO'
}

enum Turno {
    MORNINGS = 'MAÑANAS',
    AFTERNOON = "TARDES",
    NIGHTS = "NOCHES"
}

interface NuevoCursoData {
    title: string;
    turno: string;
    duracion: string;
    inicio: string;
    nivel: Nivel;
    descripcion: string;
}

export const NuevoCurso = (): ReactElement => {

    const userData = useContext(UserContext);
    const { token } = userData || { token: "" };

    const urlApi = "https://app.nocodb.com/api/v2/tables/m1qgokqms7cfewy/records"

    const cursoController = new CursoController(token);

    const goTo = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [turno, setTurno] = useState<Turno>(Turno.MORNINGS)
    const [duracion, setDuracion] = useState<string>("")
    const [inicio, setInicio] = useState<string>("")
    const [nivel, setNivel] = useState<Nivel>(Nivel.BASICO)
    const [descripcion, setDescripcion] = useState<string>("")

    const enviarCurso = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const nuevoCurso: NuevoCursoData = {
            title,
            turno,
            duracion,
            inicio,
            nivel,
            descripcion
        }

        const curso = await cursoController.createItem<Curso>(nuevoCurso)

        console.log(curso);
        goTo('/cursos');

    }


    return (
        <>
            <h1> Nuevo curso</h1>

            <form onSubmit={enviarCurso}>
                <p>titulo</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />

                <Form.Select aria-label="Default select example" required>
                    <option>Selecciona el turno</option>
                    <option value={Turno.MORNINGS}>Mañanas</option>
                    <option value={Turno.AFTERNOON}>Tardes</option>
                    <option value={Turno.NIGHTS}>Noches</option>
                </Form.Select>
                <p>Duracion</p>
                <input type="text" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
                <br />

                <p>Inicio</p>
                <input type="text" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                <br />

                <Form.Select aria-label="Default select example" required>
                    <option>Selecciona el nivel</option>
                    <option value={Nivel.BASICO}>Básico</option>
                    <option value={Nivel.INTERMEDIO}>Intermedio</option>
                    <option value={Nivel.AVANZADO}>Avanzado</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3}  value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                </Form.Group>

                <button type="submit">ENVIAR CURSO</button>

            </form>

        </>
    )
}
