import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [nextPage, setNextPage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/restaurantes/')
            .then((response) => {
                setRestaurantes(response?.data?.results)
                setNextPage(response?.data?.next)

            }).catch((error) => {
                console.log(error)

            })
    }, [])

    const verMais = () => {
        axios.get<IPaginacao<IRestaurante>>(nextPage)
            .then((response) => {
                setRestaurantes([...restaurantes, ...response?.data?.results])
                setNextPage(response?.data?.next)

            }).catch((error) => {
                console.log(error)
            })
    }

    return (<section className={style.ListaRestaurantes}>

        <h1>Os restaurantes mais <em>bacanas</em>!</h1>

        {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

        {nextPage &&
            <button onClick={() => verMais()}>
                Ver mais
            </button>
        }
    </section>)
}

export default ListaRestaurantes