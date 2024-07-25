import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then((response) => {
                    setNomeRestaurante(response.data.nome)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`,
                {
                    nome: nomeRestaurante
                }).then((response) => {
                    alert("Atualização OK!")
                    setNomeRestaurante('')

                })
        } else {
            http.post('restaurantes/',
                {
                    nome: nomeRestaurante
                }).then((response) => {
                    alert("OK!")
                    setNomeRestaurante('')
                })
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Typography component="h1" variant="h6" sx={{ mt: 3, width: "70%" }}>Formulário de restaurantes</Typography>

                <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: "70%" }}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={(evento) =>
                            setNomeRestaurante(evento.target.value)
                        }
                        label="Nome do restaurante"
                        fullWidth
                        required
                        variant="standard" />

                    <Button sx={{ marginTop: '20px' }} type={'submit'} fullWidth variant="contained">Adicionar</Button>
                </Box>
            </Box>
        </>
    )
}

export default FormularioRestaurante;