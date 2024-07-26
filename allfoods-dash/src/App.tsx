import axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdministracaoPratos from './paginas/AdministracaoPratos/AdministracaoPratos';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurante/AdministracaoRestaurante';
import FormularioPrato from './paginas/FormularioPrato/FormularioPrato';
import FormularioRestaurante from './paginas/FormularioRestaurante/FormularioRestaurante';
import Home from './paginas/Home';
import PaginaBaseAdmin from './paginas/PaginaBaseAdmin';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />

            <Route path='/admin' element={<PaginaBaseAdmin />}>
                <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
                <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
                <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

                <Route path="pratos" element={<AdministracaoPratos />} />
                <Route path="pratos/novo" element={<FormularioPrato />} />
            </Route>


        </Routes>
    );
}

export default App;
