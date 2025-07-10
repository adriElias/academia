import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext";
import { Link } from "react-router-dom";
import { CursoController } from "./controllers/CursoController";
import { ReactElement } from "react";

interface Curso {
    Id: number;
    Title: string;
}

function Cursos(): ReactElement {

    const userData = useContext(UserContext);
    const { nombre, token } = userData || { nombre: "", token: "" };

    // const urlApi = "https://app.nocodb.com/api/v2/tables/m1qgokqms7cfewy/records"
    const cursoController = new CursoController(token);
    const [cursos, setCursos] = useState<Curso[]>([])

    const cargarDatos = (): void => {
        cursoController.getAllItems()
            .then((datos: Curso[]) => setCursos(datos))
            .catch((e: Error) => console.log(e))
    }

    useEffect(() => {
        cargarDatos();
        // const opciones = {
        //     method: "GET",
        //     headers: {
        //         accept: 'application/json',
        //         'xc-token': token
        //     }
        // }

        // fetch(urlApi, opciones)
        //     .then(resp => resp.json())
        //     .then(d => d.list)
        //     .then(datos => setCursos(datos))
        //     .catch(err => console.log(err))
    }, [])


    return (
        <>
            <h3>CURSOS </h3>
            <hr />
            <ul>
                {cursos.map((curso: Curso) => <li key={curso.Id}>{curso.Title}</li>)}
            </ul>
            <hr />
            <Link to={`/nuevo-curso`}> Nuevo curso</Link>{' '}
        </>
    )
}

export default Cursos;
