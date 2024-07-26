import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import IPrato from "../../interfaces/IPrato";

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get('pratos/')
            .then((response) => {
                setPratos(response?.data)

            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const excluir = (pratoApagado: any) => {
        http.delete(`pratos/${pratoApagado.id}/`)
            .then((response) => {
                const listaPratos = pratos.filter(prato => prato.id !== prato.id)
                setPratos(listaPratos)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map((prato, key) =>
                        <TableRow key={key}>
                            <TableCell>
                                {prato?.nome}
                            </TableCell>
                            <TableCell>
                                {prato?.tag}
                            </TableCell>
                            <TableCell>
                                [<a href={prato?.imagem} target="_blank" rel="noreferrer" title={prato?.nome}>Ver Imagem</a>]
                            </TableCell>
                            <TableCell>
                                <Button type={'button'} variant="text">
                                    <Link to={`/admin/pratos/${prato?.id}`}>Editar</Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button type={'button'} variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos;