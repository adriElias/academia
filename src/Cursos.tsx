import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextos/UserContext";
import { Link } from "react-router-dom";
import { CursoController } from "./controllers/CursoController";
import { ReactElement } from "react";
import { Button, Card, CardFooter, Col, ListGroup, Row } from "react-bootstrap";

interface Curso {
    Id: number;
    Title: string;
    turno: string;
    duracion: number;
    inicio: Date;
    nivel: string;
    descripcion: string;
    categoria_name: string;
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

    const eliminar = async (idCurso: number): Promise<void> => {
        await cursoController.deleteItem(idCurso);
        cargarCursos();
    }


    const cardsCursos = cursos
        .map(curso =>
            <Col key={curso.Id} xs={12} sm={6} md={4}>
                <Card
                    className="mb-4 shadow-sm"
                    style={{
                        width: '90%',
                        background: '#f8f9fa',
                        borderRadius: '1rem',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: 'none'
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontWeight: 700, color: '#222' }}>{curso.Title}</Card.Title>
                        <Card.Text style={{ color: '#555', fontSize: '0.97rem' }}>
                            {curso.descripcion}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush" style={{ border: 'none', background: 'transparent' }}>
                        <ListGroup.Item style={{ background: 'transparent', border: 'none', color: '#6c757d', fontSize: '0.93rem' }}>
                            <strong>Categoría:</strong> {curso.categoria_name}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ background: 'transparent', border: 'none', color: '#6c757d', fontSize: '0.93rem' }}>
                            <strong>Nivel:</strong> {curso.nivel}
                        </ListGroup.Item>
                    </ListGroup>
                    <CardFooter style={{ border: 'none' }}>
                        <Button className="m-2"
                            style={{
                                border: 'none',
                                backgroundColor: '#8C3DFF',
                                color: 'white'
                            }}
                        >
                            Editar
                        </Button>
                        <Button
                            style={{
                                border: 'none',
                                backgroundColor: '#FF3D4E',
                                color: 'white'
                            }}
                            onClick={() => eliminar(curso.Id)}>
                            Eliminar
                        </Button>
                    </CardFooter>
                </Card>
            </Col>
        )


    return (
        <>
            <h3>CURSOS </h3>
            <hr />
            <ul>

                <Row>

                    {cardsCursos}

                </Row>

            </ul>
            <hr />
            <Link to={`/nuevo-curso`}> Nuevo curso</Link>{' '}
        </>
    )
}

