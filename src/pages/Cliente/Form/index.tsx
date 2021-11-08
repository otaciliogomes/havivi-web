import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'


interface ICliente {
    id?: number,
    nome: string,
    endereco: string,
    telefone: number,
}


const ClientesForm = () => {

    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [model, setModel] = useState<ICliente>({
        nome: "",
        endereco: "",
        telefone: 0
    })

    useEffect(() => {
        if (id !== undefined) {
            findCliente(id)
        }
    }, [id]);

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!model.nome || !model.endereco || !model.telefone) {
            toast.error("falta argumento");
            return;
        }

        if (id !== undefined) {
            const response = await api.put(`/clientes`, model)
            toast.success("Cliente alterado!")
        } else {
            const response = await api.post(`/clientes`, model)
            toast.success("Cliente cadastrado!")
        }


    }

    async function findCliente(id: string) {
        const { data } = await api.get<ICliente>(`/clientes/${id}`)
        setModel({
            id: data.id,
            nome: data.nome,
            endereco: data.endereco,
            telefone: data.telefone
        })
    }



    const cancel = () => {
        history.push('/clientes')
    }



    // Retorna uma tabela com os clientes.

    return (
        <>
            <Header title="Cadastro de clientes" />
            <ToastContainer />
            <div className="container">
                <br />
                <div className="cliente-header">
                    <h1>Novo Cliente</h1>
                    <Button variant="dark" size="sm" onClick={cancel} >Voltar</Button>
                </div>
                <br />
                <div className="containerForm">
                    <div className="contentForm">
                        <Form onSubmit={onSubmit} >
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={model.nome}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Endereco</Form.Label>
                                <Form.Control
                                    type="adress"
                                    name="endereco"
                                    value={model.endereco}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            </Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="int"
                                    name="telefone"
                                    value={model.telefone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Coloque um número
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Cadastrar
                            </Button>
                        </Form>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );

}

export { ClientesForm }