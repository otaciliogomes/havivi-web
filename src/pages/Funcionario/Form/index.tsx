import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'


interface IFuncionario {
    nome: string,
    email: string,
    adm: boolean,
}


const FuncionariosForm = () => {

    const [model, setModel] = useState<IFuncionario>({
        nome: "",
        email: "",
        adm: false
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

        if(!model.nome || !model.email || !model.adm) {
            toast.error("falta argumento");
            return;
        }

        const response = await api.post('/funcionarios', model)
        toast.success("Funcionario cadastrado!")
    }



    const cancel = () => {
        history.push('/funcionarios')
    }



    // Retorna uma tabela com os funcionarios.

    return (
        <>
            <Header title="Cadastro de funcionario" />
            <ToastContainer />
            <div className="container">
                <br />
                <div className="funcionario-header">
                    <h1>Novo Funcionario</h1>
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Gerente?"
                            name="adm" 
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

export { FuncionariosForm }