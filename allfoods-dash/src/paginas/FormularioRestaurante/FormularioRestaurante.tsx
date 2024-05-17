import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        console.log("Enviar")
        console.log(nomeRestaurante)

        axios.post('http://localhost:8000/api/v2/restaurantes/', 
        {
            nome: nomeRestaurante

        }).then((response) => {
            alert("Foi")
        })
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                value={nomeRestaurante}
                onChange={(evento) =>
                    setNomeRestaurante(evento.target.value)
                }
                label="Nome do restaurante"
                variant="standard" />
            <Button type={'submit'} variant="contained">Adicionar</Button>
        </form>
    )
}

export default FormularioRestaurante;