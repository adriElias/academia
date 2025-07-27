import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ICurso } from './Cursos';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "./contextos/UserContext";
import { CursoController } from './controllers/CursoController';
import { useNavigate, useParams } from 'react-router-dom';
import { CardFooter, ListGroup } from 'react-bootstrap';

export const Curso = () => {

    // const location = useLocation();
    // console.log("CURSO PASADO: ", location.state);

    const [curso, setCurso] = useState<ICurso>();
    const userData = useContext(UserContext);
    const { token } = userData || { token: "" };

    const cursoController = new CursoController(token);
    const { idCurso } = useParams();
    const goTo = useNavigate();


    const cargarCurso = async (): Promise<void> => {
        const curso = await cursoController.getItemById<ICurso>(idCurso as string);
        setCurso(curso)
    }

    useEffect(() => {
        cargarCurso();
    }, [])

    const eliminar = async (idCurso: number): Promise<void> => {
        await cursoController.deleteItem(idCurso);
        goTo(('/cursos'));
    }

    return (
        <>
            <Card className="shadow-sm m-4">
                <Card.Header className="text-white text-center"
                    style={{
                        border: 'none',
                        backgroundColor: '#8C3DFF',
                    }}>
                    <h2 className="mb-0">
                        <strong>{curso?.Title}</strong>
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-secondary">
                        <strong>Categoría:</strong> {curso?.categoria_name}
                    </Card.Title>
                    <ListGroup variant="flush" className="mb-3">
                        <ListGroup.Item>
                            <strong>Turno: </strong>{curso?.turno}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Duración: </strong>{curso?.duracion}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Inicio: </strong>{curso?.inicio.toString()}
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Text>
                        {curso?.descripcion}
                    </Card.Text>
                </Card.Body>
                <CardFooter className="d-flex justify-content-end bg-light border-0">
                    <Button
                        className="m-2"
                        style={{
                            border: 'none',
                            backgroundColor: '#8C3DFF',
                            color: 'white'
                        }}
                    >
                        Editar
                    </Button>
                    <Button
                        className="m-2"
                        style={{
                            border: 'none',
                            backgroundColor: '#FF3D4E',
                            color: 'white'
                        }}
                        onClick={() => curso && eliminar(curso.Id)}
                    >
                        Eliminar
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
