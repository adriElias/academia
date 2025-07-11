import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextos/UserContext";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AlumnoController } from "./controllers/AlumnoController";
import { ReactElement } from "react";

interface Alumno {
    Id: number;
    nombre: string;
    email: string;
    telefono: string;
    idCurso: number;
    curso: string;
}

export const Alumnos = (): ReactElement => {

    const userData = useContext(UserContext);
    const { nombre, token } = userData || { nombre: "", token: "" };

    // const table = "met3zt25o9idyyf";
    const alumnesController = new AlumnoController(token);
    const [alumnos, setAlumnos] = useState<Alumno[]>([])

    const goTo = useNavigate()

    const cargarDatos = (): void => {
        alumnesController.getAllItems()
            .then((datos: Alumno[]) => setAlumnos(datos))
            .catch((error: Error) => console.log(error))
    }


    // const cargarDatos = () => {
    //     const datos = alumnesController.getAllItems()
    //     setAlumnos(datos);
    // }

    useEffect(() => {
        cargarDatos()
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
        //     .then(datos => setAlumnos(datos))
        //     .catch(err => console.log(err))


    }, [])

    const eliminar = (idAlumno: number): void => {
        console.log("------llamando a la API--------")
        alumnesController.deleteItem(idAlumno)
            .then(x => cargarDatos())


        // try {
        //     const datos = await alumnesController.deleteItem(idAlumno);
        //     // const response = await fetch(urlApi, opciones)

        //     if (!response.ok) throw new Error('Error al eliminar');

        //     console.log('Alumno eliminado con ID:', idAlumno);
        //     cargarDatos();

        // }
        // catch (error) {
        //     console.log(error);
        // };
        // // Elimina el alumno localmente
        // console.log("-----alumno:------", idAlumno)
        // const nuevosAlumnos = alumnos.filter(e => e.Id !== idAlumno);
        // setAlumnos(nuevosAlumnos);

        // console.log("nuevos alumnos", nuevosAlumnos);

        // // Llama a la API para eliminar el alumno en el backend
        // const opciones = {
        //     method: "DELETE",
        //     headers: {
        //         accept: '*/*',
        //         'Content-Type': 'application/json',
        //         'xc-token': token
        //     },
        //     body: JSON.stringify({ Id: idAlumno })
        // };


    }

    const tabla = alumnos.map((alumno: Alumno) =>
        <tr key={alumno.Id}>
            <td>{alumno.Id}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.email}</td>
            <td>{alumno.telefono}</td>
            <td>{alumno.idCurso}</td>
            <td>{alumno.curso}</td>
            <td>
                <button onClick={() => eliminar(alumno.Id)}>eliminar</button>

            </td>
        </tr>
    )



    return (
        <>
            <h3 className="text-center my-4">ALUMNOS</h3>
            <hr />
            <Table>
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>ID Curso</th>
                        <th>Curso</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {tabla}
                </tbody>
            </Table>
            <hr />
            <div className="d-flex justify-content-end">
                <Link to={`/nuevo-alumno`} className="btn btn-success">
                    Nuevo alumno
                </Link>
            </div>
        </>
    )
}
