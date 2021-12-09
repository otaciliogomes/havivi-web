import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'



interface IFuncionario {
    id?: number,
    user: string,
    senha: string,
    nome: string,
    email: string,
    tipo: boolean,
}


const FuncionariosForm = () => {

    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [model, setModel] = useState<IFuncionario>({
        id: 0,
        user: "",
        senha: "",
        nome: "",
        email: "",
        tipo: true,
    })

    useEffect(() => {
        if (id !== undefined) {
            findFuncionario(id)
        }
    }, [id]);


    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {

        const name = e.target.name;
        const isTrue = e.target.value === "true" ? true : false
        setModel({
            ...model,
            [name]: isTrue

        })

    }


    function updatedModel(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const target = e.target;
        const value = target.value
        const name = target.name

        setModel({
            ...model,
            [name]: value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()


        if (!model.nome || !model.email || !model.senha || !model.user) {
            toast.error("falta argumento");
            return;
        }


        if (id !== undefined) {
            await api.put(`/funcionarios`, model)
            toast.success("Funcionario alterado!")
        } else {
            await api.post(`/funcionarios/cadastrar`, model)
            toast.success("Funcionario cadastrado!")
        }

    }

    async function findFuncionario(id: string) {
        const { data } = await api.get<IFuncionario>(`/funcionarios/${id}`)
        setModel({
            id: data.id,
            user: data.user,
            senha: data.senha,
            nome: data.nome,
            email: data.email,
            tipo: data.tipo
        })
    }



    const cancel = () => {
        history.push('/funcionarios')
    }



    // Retorna uma tabela com os funcionarios.

    return (
        <>
            <Header title="Cadastro de funcionário" />
            <ToastContainer />
            <div className="container">
                <br />
                <div className="funcionario-header">
                    <h1>Novo Funcionário</h1>
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
                                <Form.Label>Usuário</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user"
                                    value={model.user}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="senha"
                                    value={model.senha}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={model.email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Gerente?</Form.Label>
                                <Form.Select name="tipo" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelect(e)}>
                                    <option>Selecione uma opção</option>
                                    <option value={"false"}>não</option>
                                    <option value={"true"}>Sim</option>
                                </Form.Select>
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

export { FuncionariosForm }