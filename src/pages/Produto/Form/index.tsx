import react, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import api from "../../../Service/api";
import { toast, ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import '../styles.css'



interface IProduct {
    
    nome: string,
    valor: number,
    descricao: string,
    imagem: string
}


const ProductsForm: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [model, setModel] = useState<IProduct>({
        nome: "",
        valor: 0,
        descricao: "",
        imagem: ""
    });

    useEffect(() => {
        if (id !== undefined) {
            findProduct(id)
        }
    }, [id]);


    function updatedModel(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!model.nome || !model.valor || !model.descricao) {
            toast.error("falta argumento");
            return;
        }

        if (id !== undefined) {
            const response = await api.put(`/produtos/${id}`, model)
            toast.success("Produto alterado!")
        } else {
            const response = await api.post(`/produtos`, model)
            toast.success("Produto cadastrado!")
        }

        

    }

    async function findProduct(id: string) {
        const response = await api.get<IProduct>(`/produtos/${id}`)
        setModel({
            nome: response.data.nome,
            valor: response.data.valor,
            descricao: response.data.descricao,
            imagem: response.data.imagem
        })
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
                                value={model.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                name="valor"
                                value={model.valor}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                name="descricao"
                                value={model.descricao}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updatedModel(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Imagem URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagem"
                                value={model.imagem}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
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