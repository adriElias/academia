import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext.js";
import { Link } from "react-router-dom";
import { CursoController } from "./controllers/CursoController.js";

function Cursos() {

    const { nombre, token } = useContext(UserContext);

    // const urlApi = "https://app.nocodb.com/api/v2/tables/m1qgokqms7cfewy/records"
    const cursoController = new CursoController(token);
    const [cursos, setCursos] = useState([])

    const cargarDatos = () => {
        cursoController.getAllItems()
            .then(datos => setCursos(datos))
            .catch(e => console.log(e))
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
                {cursos.map(curso => <li>{curso.Title}</li>)}
            </ul>
            <hr />
            <Link to={`/nuevo-curso`}> Nuevo curso</Link>{' '}
        </>
    )
}

export default Cursos;
