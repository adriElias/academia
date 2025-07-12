import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextos/UserContext";
import { Link } from "react-router-dom";
import { CursoController } from "./controllers/CursoController";
import { ReactElement } from "react";

interface Curso {
    Id: number;
    Title: string;
}

export const Cursos = (): ReactElement => {

    const userData = useContext(UserContext);
    const { nombre, token } = userData || { nombre: "", token: "" };
    const cursoController = new CursoController(token);
    //Decimos al useState de que tipo es el useState
    const [cursos, setCursos] = useState<Curso[]>([])

    const cargarCursos = async (): Promise<void> => {
        const cursos = await cursoController.getAllItems<Curso>();
        setCursos(cursos);
    }

    useEffect(() => {
        cargarCursos();
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

