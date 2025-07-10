import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext.js";
import { useNavigate } from "react-router-dom";
import NocodbController from "./controllers/NocodbController.js";
import { AlumnoController } from "./controllers/AlumnoController.js";
import { CursoController } from "./controllers/CursoController.js";
import Form from 'react-bootstrap/Form';


function NuevoAlumno() {

    const { token } = useContext(UserContext);
    const nuevoAlumnoController = new AlumnoController(token);
    const cursoController = new CursoController(token);

    const goTo = useNavigate()

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [idCurso, setIdCurso] = useState("")
    const [cursos, setCursos] = useState([])

    const cargarDatos = () => {
        cursoController.getAllItems()
            .then(datos => setCursos(datos))
            .catch(e => console.log(e))
    }
    useEffect(() => {
        cargarDatos();
    }, [])

    function enviarAlumno(e) {
        e.preventDefault();
        const cursoSeleccionado = cursos.find(c => c.Id === idCurso || c.Id === Number(idCurso));
        const nombreCurso = cursoSeleccionado ? cursoSeleccionado.Title : "";  
        const nuevoAlumno = {
            nombre: nombre,
            email,
            telefono,
            idCurso,
            curso:nombreCurso
        }
        nuevoAlumnoController.createItem(nuevoAlumno)
            .then(datos => {
                console.log(datos);
                goTo('/alumnos');
            })
            .catch(e => console.log(e))

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
                    {cursos.map(curso => (
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

export default NuevoAlumno;