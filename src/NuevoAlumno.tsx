import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextos/UserContext";
import { useNavigate } from "react-router-dom";
import { NocodbController } from "./controllers/NocodbController";
import { AlumnoController } from "./controllers/AlumnoController";
import { CursoController } from "./controllers/CursoController";
import Form from 'react-bootstrap/Form';
import { ReactElement } from "react";

interface Curso {
    Id: number;
    Title: string;
}

interface NuevoAlumnoData {
    nombre: string;
    email: string;
    telefono: string;
    idCurso: string;
    curso: string;
}

export const NuevoAlumno = (): ReactElement => {

    const userData = useContext(UserContext);
    const { token } = userData || { token: "" };
    const nuevoAlumnoController = new AlumnoController(token);
    const cursoController = new CursoController(token);

    const goTo = useNavigate()

    const [nombre, setNombre] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telefono, setTelefono] = useState<string>("")
    const [idCurso, setIdCurso] = useState<string>("")
    const [cursos, setCursos] = useState<Curso[]>([])

    const cargarCursos = async(): Promise<void> => {
        const cursos = await cursoController.getAllItems<Curso>();
        setCursos(cursos);
    }
    useEffect(() => {
        cargarCursos();
    }, [])

    const enviarAlumno = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const cursoSeleccionado = cursos.find(c => c.Id === Number(idCurso) || c.Id === Number(idCurso));
        const nombreCurso = cursoSeleccionado ? cursoSeleccionado.Title : "";
        const nuevoAlumno: NuevoAlumnoData = {
            nombre: nombre,
            email,
            telefono,
            idCurso,
            curso: nombreCurso
        }
        nuevoAlumnoController.createItem(nuevoAlumno)
            .then(datos => {
                console.log(datos);
                goTo('/alumnos');
            })
            .catch((e: Error) => console.log(e))

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
                            {curso.Title}{curso.Id}
                        </option>
                    ))}
                </Form.Select>
                <br />
                <button type="submit">ENVIAR ALUMNO</button>

            </form>


        </>
    )
}
