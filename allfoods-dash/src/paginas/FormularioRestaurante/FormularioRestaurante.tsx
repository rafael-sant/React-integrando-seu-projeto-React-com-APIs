import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then((response) => {
                    setNomeRestaurante(response.data.nome)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,
            {
                nome: nomeRestaurante
            }).then((response) => {

                alert("Att Foi")
            })
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/',
                {
                    nome: nomeRestaurante
                }).then((response) => {
                    alert("Foi")
                })
        }
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