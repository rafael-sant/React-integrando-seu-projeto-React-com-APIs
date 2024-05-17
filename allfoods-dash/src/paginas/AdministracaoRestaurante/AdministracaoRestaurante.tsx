import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then((response) => {
                setRestaurantes(response?.data)

            }).catch((error) => {
                console.log(error)
            })
    }, [])

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
                            Deletar
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
                                <Button type={'button'} variant="outlined" color="error">
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