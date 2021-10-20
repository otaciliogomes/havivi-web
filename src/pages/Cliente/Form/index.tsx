import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'


interface ICliente {
    nome: string,
    endereco: string,
    tel: number,
}


const ClientesForm = () => {

    const [model, setModel] = useState<ICliente>({
        nome: "",
        endereco: "",
        tel: 0
    })

    const history = useHistory();

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!model.nome || !model.endereco || !model.tel) {
            toast.error("falta argumento");
            return;
        }

        const response = await api.post('/clientes', model)
        toast.success("Cliente cadastrado!")
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
                <div className="container">
                    <Form onSubmit={onSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Endereco</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="tel"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );

}

export { ClientesForm }