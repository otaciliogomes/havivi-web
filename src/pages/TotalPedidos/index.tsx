import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import api from '../../Service/api';


import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PedidosRequest } from '../../interface'

import './styles.css'



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

    const getPedidosApi = async () => {
        const { data } = await api.get<PedidosRequest[]>('/pedidos');
        console.log(data)
        setPedidosList(data);
    }

    useEffect(() => {
        getPedidosApi();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Status', headerName: 'Status', width: 150 },
        { field: 'Cliente', headerName: 'Cliente', width: 150 },
        { field: 'Funcionario', headerName: 'Funcionario', width: 150 },
        { field: 'Data', headerName: 'Data', width: 150 },
        { field: 'Valor', headerName: 'Valor', width: 150 },
        // {
        //   field: 'age',
        //   headerName: 'Age',
        //   type: 'number',
        //   width: 90,
        // },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params: GridValueGetterParams) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //       params.getValue(params.id, 'lastName') || ''
        //     }`,
        // },
    ];


    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const pedidosRows = pedidosList.map(pedido => {
        return {
            id: pedido.id,
            Status: pedido.status,
            Cliente: pedido.cliente,
            Funcionario: pedido.funcionario,
            Valor: `R$ ${pedido.valorExtra}`,
            Data: dayjs(pedido.dataHora).format('DD/MM/YYYY') ,
        }
    })

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={pedidosRows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

