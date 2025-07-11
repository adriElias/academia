import { UserContext } from "./contextos/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CursoController } from "./controllers/CursoController";
import { ReactElement } from "react";

interface NuevoCursoData {
    title: string;
    turno: string;
    duracion: string;
    inicio: string;
}

export const NuevoCurso = (): ReactElement => {

    const userData = useContext(UserContext);
    const { token } = userData || { token: "" };

    const urlApi = "https://app.nocodb.com/api/v2/tables/m1qgokqms7cfewy/records"

    const nuevoCursoController = new CursoController(token);

    const goTo = useNavigate()

    const [title, setTitle] = useState<string>("")
    const [turno, setTurno] = useState<string>("")
    const [duracion, setDuracion] = useState<string>("")
    const [inicio, setInicio] = useState<string>("")

    const enviarCurso = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const nuevoCurso: NuevoCursoData = {
            title: title,
            turno: turno,
            duracion: duracion,
            inicio: inicio

        }
        nuevoCursoController.createItem(nuevoCurso)
            .then(datos => {
                console.log(datos);
                goTo('/cursos');
            })
            .catch((e: Error) => console.log(e))

        // const opciones = {
        //     method: "POST",
        //     headers: {
        //         accept: 'application/json',
        //         "Content-Type": 'application/json',
        //         'xc-token': token
        //     },
        //     body: JSON.stringify(nuevoCurso)
        // }

        // fetch(urlApi, opciones)
        //     .then(resp => resp.json())
        //     .then(datos => {
        //         console.log(datos);
        //         goTo('/cursos');
        //     })
        //     .catch(error => console.log(error))
    }


    return (
        <>
            <h1> Nuevo curso</h1>

            <form onSubmit={enviarCurso}>
                <p>titulo</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />

                <p>Turno</p>
                <input type="text" value={turno} onChange={(e) => setTurno(e.target.value)} />
                <br />

                <p>Duracion</p>
                <input type="text" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
                <br />

                <p>Inicio</p>
                <input type="text" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                <br />

                <button type="submit">ENVIAR CURSO</button>

            </form>



        </>
    )
}
