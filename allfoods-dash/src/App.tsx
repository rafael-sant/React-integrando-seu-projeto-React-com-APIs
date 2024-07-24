import axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurante/AdministracaoRestaurante';
import FormularioRestaurante from './paginas/FormularioRestaurante/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />
            <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
            <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
            <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
        </Routes>
    );
}

export default App;
