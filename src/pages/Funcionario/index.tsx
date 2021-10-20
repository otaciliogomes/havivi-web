import {FaPencilAlt} from 'react-icons/fa'
import {MdDeleteForever} from 'react-icons/md'
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { Table,Button } from 'react-bootstrap';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import api from "../../Service/api";

import './styles.css'



interface IFuncionario {
    id: number,
    nome: string,
    email: string,
    adm: boolean,
}


const Funcionarios = () => {

    const [funcionario, setFuncionario] = useState<IFuncionario[]>([])
    const history = useHistory();

    useEffect(() => {
        loadFuncionario()
    }, [])

    async function loadFuncionario() {

        const response = await api.get('/funcionarios')
        setFuncionario(response.data)
    }

    async function deleteFuncionario(id: number) {
        const response = await api.delete(`/funcionarios/${id}`)
        loadFuncionario()
    }

    // Função que cria um produto
    const newFuncionario = () => {
        history.push('/funcionarios_cadastro')
    }

    const editFuncionario = (id: number) => {
        history.push(`/funcionarios_cadastro/${id}`)
    }

    


    // Retorna uma tabela com os funcionarios.

    return (
        <>
            <Header title="Funcionarios" />
            <div className="container">
            <br />
            <div className="funcionario-header">
            <h1>Funcionarios</h1>
            <Button variant="dark" size="sm" onClick={newFuncionario} >Novo Funcionário</Button>
            </div>
            <br />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Adm</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        funcionario.map(funcionario => (
                            <tr>
                                <td>{funcionario.id}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.email}</td>
                                <td>{funcionario.adm}</td>
                                <td>
                                    <Button variant="outline-primary" className="btn-alt" size="sm" onClick={() => editFuncionario(funcionario.id)}><FaPencilAlt className="iconAlt" /></Button>
                                    <Button variant="outline-danger" className="btn-del" size="sm" onClick={() => deleteFuncionario(funcionario.id)}><MdDeleteForever className="iconDel" /></Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        <Footer />
       </> 
    );

}

export {Funcionarios}