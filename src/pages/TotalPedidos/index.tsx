import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import api from '../../Service/api';
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'


import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PedidosRequest, ClienteRequest, FuncionarioResquest } from '../../interface'

import './styles.css'
import { toast, ToastContainer } from 'react-toastify';



const TotalPedidos = () => {
    return (
        <>
            <Header title="Todos os Pedidos" />
            <div className="containerTotalPedidos">
                <h2>Pedidos</h2>
                <section className="tableListContentTotalPedidos">
                    <DataTable />
                </section>
            </div>
            <Footer />
        </>

    )
}

export { TotalPedidos };






const DataTable = () => {
    const [pedidosList, setPedidosList] = useState<PedidosRequest[]>([])
    const [clienteList, setClienteList] = useState<ClienteRequest[]>([])
    const [funcionarioList, setFuncionarioList] = useState<FuncionarioResquest[]>([])

    const getPedidosApi = async () => {
        const { data } = await api.get<PedidosRequest[]>('/pedidos');
        setPedidosList(data);
    }

    const getClientesApi = async () => {
        const { data } = await api.get<ClienteRequest[]>('/clientes');
        setClienteList(data);
    }

    const getFuncionariosApi = async () => {
        const { data } = await api.get<FuncionarioResquest[]>('/funcionarios');
        setFuncionarioList(data);
    }

    const deletePedido = async (id: string) => {
        const { data } = await api.delete(`/pedidos/${id}`);

        toast.error("Pedido Excluido");
        await getPedidosApi();
    }

    useEffect(() => {
        getPedidosApi();
        getClientesApi();
        getFuncionariosApi();
    }, []);





    return (
        <div style={{ height: 500, width: '100%', overflow: "scroll" }}>
            <ToastContainer />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Preço</th>
                        <th>Cliente</th>
                        <th>Funcionário</th>
                        <th>Data</th>
                        <th>Forma de pagamento</th>
                        <th>Observação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidosList.map((product, index) => {
                            return (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.status}</td>
                                    <td>{product.valor}</td>
                                    <td>{product?.cliente_id?.nome}</td>
                                    <td>{product?.funcionario_id?.nome}</td>
                                    <td>{dayjs(product.created_at).format('DD/MM/YYYY')}</td>
                                    <td>{product.observacao}</td>
                                    <td>{product.observacao}</td>
                                    <td>
                                        {/* <Button variant="outline-primary" className="btn-alt" size="sm" ><FaPencilAlt className="iconAlt" /></Button>{' '} */}
                                        <Button
                                            variant="outline-danger"
                                            className="btn-del" size="sm"
                                            onClick={() => deletePedido(product.id)}
                                        >
                                            <MdDeleteForever className="iconDel" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

