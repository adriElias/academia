import Cursos from "./Cursos.jsx";
import Alumnos from "./Alumnos";
import Base from "./Base";

import UserContext from "./contextos/UserContext.js";
import { Routes, Route, Link } from 'react-router-dom';
import NuevoAlumno from "./NuevoAlumno.jsx";
import  {NuevoCurso}  from "./NuevoCurso.jsx";


function App() {

    const userdata = {
        nombre: "fulljs2025",
        token: "-9QSS_DyYDXhKjLal0WfRSmVap5G14YcC5Y9iwpN"
    }



    return (
        <UserContext.Provider value={userdata}>
            <h1>Academia </h1>
            <hr />
            <Link to={`/alumnos`}> Alumnos</Link>{' '}
            <Link to={`/cursos`}> Cursos</Link>
            <hr />

            <Routes>
                <Route path="/" element={<Base />} />
                <Route path="/cursos" element={<Cursos />} />
                <Route path="/alumnos" element={<Alumnos />} />
                <Route path="/nuevo-alumno" element={<NuevoAlumno />} />
                <Route path="/nuevo-curso" element={<NuevoCurso/>} />
            </Routes>

        </UserContext.Provider>
    )
}

export default App;
