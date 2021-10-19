import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'


interface IProduct {
    id?: number,
    nome: string,
    valor: number,
    descricao?: string,
    imagem?: string
}


const ProductsForm: React.FC = () => {

    const [model, setModel] = useState<IProduct>({
        nome: "",
        valor: 0,
        descricao: ""
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

        if(!model.descricao || !model.valor || !model.descricao) {
            toast.error("falta argumento");
            return;
        }

        console.log(model)
        // const response = await api.post('/produtos', model)
    }



    const cancel = () => {
        history.push('/produtos')
    }



    // Retorna uma tabela com os produtos.

    return (
        <>
            <Header title="Cadastro de produto" />
            <ToastContainer />
            <div className="container">
                <br />
                <div className="product-header">
                    <h1>Novo Produto</h1>
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
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="number"
                                name="valor"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                name="descricao"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Escolha uma foto</Form.Label>
                            <Form.Control type="file" size="sm" />
                        </Form.Group> */}
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

export { ProductsForm }