import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextos/UserContext";
import { useNavigate } from "react-router-dom";
import { NocodbController } from "./controllers/NocodbController";
import { AlumnoController } from "./controllers/AlumnoController";
import { CursoController } from "./controllers/CursoController";
import Form from 'react-bootstrap/Form';
import { ReactElement } from "react";
import { Alumno } from "./types";

interface Curso {
    Id: number;
    Title: string;
}

interface NuevoAlumnoData {
    nombre: string;
    email: string;
    telefono: string;
}

export const NuevoAlumno = (): ReactElement => {

    const userData = useContext(UserContext);
    const { token } = userData || { token: "" };
    const alumnoController = new AlumnoController(token);
    const cursoController = new CursoController(token);

    const goTo = useNavigate()

    const [nombre, setNombre] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telefono, setTelefono] = useState<string>("")
    const [idCurso, setIdCurso] = useState<string>("")
    const [cursos, setCursos] = useState<Curso[]>([])

    const cargarCursos = async (): Promise<void> => {
        const cursos = await cursoController.getAllItems<Curso>();
        setCursos(cursos);
    }
    useEffect(() => {
        cargarCursos();
    }, [])

    const enviarAlumno = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const nuevoAlumno: NuevoAlumnoData = {
            nombre,
            email,
            telefono,
        }
        
        const alumno = await alumnoController.createItem<Alumno>(nuevoAlumno)
        await alumnoController.inscribirCurso(idCurso, alumno.Id);

        console.log(alumno);
        // alumnoController.inscribir(alumno.id, curso.id)
        goTo('/alumnos');

    }



    return (
        <>
            <form onSubmit={enviarAlumno}>
                <p>Nombre</p>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <br />

                <p>Email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />

                <p>Telefono</p>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <br />

                <Form.Select aria-label="Default select example" value={idCurso}
                    onChange={(e) => setIdCurso(e.target.value)}
                >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((curso: Curso) => (
                        <option key={curso.Id} value={curso.Id}>
                            {curso.Id}.  {curso.Title}
                        </option>
                    ))}
                </Form.Select>
                <br />
                <button type="submit">ENVIAR ALUMNO</button>

            </form>


        </>
    )
}
