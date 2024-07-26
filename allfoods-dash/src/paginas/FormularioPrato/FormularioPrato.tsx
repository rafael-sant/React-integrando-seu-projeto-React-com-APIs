import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import IRestaurante from "../../interfaces/IRestaurante";
import Itag from "../../interfaces/Itag";

const FormularioPrato = () => {
    const [nomePrato, setNomePrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')
    const [tags, setTags] = useState<Itag[]>([])
    const [tagPrato, setTagPrato] = useState('')

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')

    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        http.get<{ tags: Itag[] }>('tags/').then(response => {
            setTags(response.data.tags)
        })

        http.get<IRestaurante[]>('restaurantes/').then(response => {
            setRestaurantes(response.data)
        })

    }, [])


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('descricao', descricaoPrato);
        formData.append('tag', tagPrato);
        formData.append('restaurante', restaurante);
        imagem && formData.append('imagem', imagem);

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: { 
                'Content-Type': 'multipart/form-data'
            }, 
            data: formData
        }).then(response => { 
            alert('Prato cadastrado com sucesso')
            setNomePrato('')
            setDescricaoPrato('')
            setTagPrato('')
            setTagPrato('')
            setRestaurante('')
            setImagem(null)

        }).catch(error => { 
            console.error("Falha")
        })
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Typography component="h1" variant="h6" sx={{ mt: 3, width: "70%" }}>Formulário de pratos</Typography>

                <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: "70%" }}>
                    <TextField
                        value={nomePrato}
                        onChange={(evento) =>
                            setNomePrato(evento.target.value)
                        }
                        label="Nome do prato"
                        fullWidth
                        required
                        margin="dense"
                        variant="standard" />

                    <TextField
                        value={descricaoPrato}
                        onChange={(evento) =>
                            setDescricaoPrato(evento.target.value)
                        }
                        label="Descrição do prato"
                        fullWidth
                        required
                        margin="dense"
                        variant="standard" />

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id='select-tag'>
                            Tag do prato
                        </InputLabel>

                        <Select labelId="select-tag" value={tagPrato} onChange={e => setTagPrato(e.target.value)}>
                            {tags.map((tag, key) =>
                                <MenuItem key={tag.id} value={tag.value}>
                                    {tag.value}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl margin="dense" fullWidth>
                        <InputLabel id='select-restaurante'>
                            Restaurante
                        </InputLabel>

                        <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                            {restaurantes.map((restaurante, key) =>
                                <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <input type="file" onChange={evento => {
                        setImagem(evento?.target?.files?.length ? evento?.target?.files[0] : null)
                    }}
                        name="" id=""
                    />

                    <Button sx={{ marginTop: '20px' }} type={'submit'} fullWidth variant="contained">Adicionar</Button>
                </Box>
            </Box>
        </>
    )
}

export default FormularioPrato;