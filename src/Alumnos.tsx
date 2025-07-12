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
    cursos_name: string[];
}

export const Alumnos = (): ReactElement => {

    const userData = useContext(UserContext);
    const { nombre, token } = userData || { nombre: "", token: "" };
    const alumnesController = new AlumnoController(token);
    const [alumnos, setAlumnos] = useState<Alumno[]>([])

    const goTo = useNavigate()

    const cargarAlumnos = async (): Promise<void> => {
        const alumnos = await alumnesController.getAllItems<Alumno>()
        setAlumnos(alumnos);
    }

    useEffect(() => {
        cargarAlumnos()
    }, [])

    const eliminar = async (idAlumno: number): Promise<void> => {
        await alumnesController.deleteItem(idAlumno);
        cargarAlumnos();
    }

    const tabla = alumnos.map((alumno: Alumno) =>
        <tr key={alumno.Id}>
            <td>{alumno.Id}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.email}</td>
            <td>{alumno.telefono}</td>
            <td>{alumno.cursos_name.join("  ")}</td>
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
                        <th>Cursos</th>
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
