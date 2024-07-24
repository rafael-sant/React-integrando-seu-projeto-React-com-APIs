import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import IRestaurante from "../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get('restaurantes/')
            .then((response) => {
                setRestaurantes(response?.data)

            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const excluir = (restauranteApagado: any) => { 
        http.delete(`restaurantes/${restauranteApagado.id}/`)
        .then((response) => { 
            const listaRestaurante = restaurantes.filter(restaurante => restauranteApagado.id !== restaurante.id)
            setRestaurantes(listaRestaurante)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante, key) =>
                        <TableRow>
                            <TableCell>
                                {restaurante?.nome}
                            </TableCell>
                            <TableCell>
                                <Button type={'button'} variant="text">
                                    [<Link to={`/admin/restaurantes/${restaurante?.id}`}>Editar</Link>]
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button type={'button'} variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;