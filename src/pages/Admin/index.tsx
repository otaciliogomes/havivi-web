import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import dayjs from 'dayjs';
import api from '../../Service/api'
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import "./style.css"

import { PedidosRequest } from '../../interface/index';

import { CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Bar } from 'recharts';



const Admin = (props:any) => {
    const [funcionarios, setFuncionarios] = useState(0);
    const [clientes, setClientes] = useState(0);

    const [valueFaturamentoTotal, setValueFaturamentoTotal] = useState(0);
    const [valueFaturamentoTotalDay, setValueFaturamentoTotalDay] = useState(0);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [pedidosEmAndmento, setPedidosEmAndmento] = useState<any[]>([]);
    const [pedidosAberto, setPedidosAberto] = useState<any[]>([]);
    const [pedidosFechado, setPedidosFechado] = useState<any[]>([]);
    const todayOrders = new Date().toLocaleDateString();
    const allOders = pedidosAberto.length + pedidosEmAndmento.length + pedidosFechado.length;

    const router = useHistory();


    const data = [
        { name: 'Pedidos aberto', uv: pedidosAberto.length, pv: 2400, amt: 2400 },
        { name: 'Pedidos em andamento', uv: pedidosEmAndmento.length, pv: 2400, amt: 2400 },
        { name: 'Pedidos em Fechados', uv: pedidosFechado.length, pv: 2400, amt: 2400 },
    ];

    const getFuncionariosAPI = async () => {
        const { data } = await api.get<any[]>('/funcionarios');
        setFuncionarios(data.length)
    }

    const getPedidosApi = async () => {
        const { data } = await api.get<any[]>('/pedidos');
        setPedidos(data);

        SepararPedidos(data)

    }

    const getClientesAPI = async () => {
        const { data } = await api.get<any[]>('/clientes');
        setClientes(data.length)
    }

    const SepararPedidos = (data: any[]) => {

        const aberto = data.filter(pedido => pedido.status === "Aberto");
        const abertoFilter = aberto.filter(pedido => {
            const dataPedido = dayjs(pedido.created_at).format('DD/MM/YYYY')
            const result = todayOrders === dataPedido && pedido
            return result
        })

        setPedidosAberto(abertoFilter);

        const fechados = data.filter(pedido => pedido.status === "Fechado");
        const fechadosFilter = fechados.filter(pedido => {
            const dataPedido = dayjs(pedido.created_at).format('DD/MM/YYYY')
            const result = todayOrders === dataPedido && pedido
            return result
        });
        const totalValueFechadoList =  fechadosFilter.map(pedido => pedido.valor);
        const totalValueFechado = totalValueFechadoList.reduce((a,b) => a+b, 0)
        // setValueFaturamentoTotalDay(totalValueFechado)
        setPedidosFechado(fechadosFilter)

        const emAdamento = data.filter(pedido => pedido.status === "Em andamento");
        const emAdamentoFilter = emAdamento.filter(pedido => {
            const dataPedido = dayjs(pedido.created_at).format('DD/MM/YYYY')
            const result = todayOrders === dataPedido && pedido
            return result
        });
        setPedidosEmAndmento(emAdamentoFilter)
    }

    const getPedidosDeHoje = async () => {
        const { data } = await api.get<PedidosRequest[]>('/pedidos_fechados_hoje');

        console.log(data);

        const total = data.map(pedido => pedido?.valor || 0 );
        const totalHoje = total.reduce((a,b) => a+b, 0)

        setValueFaturamentoTotalDay(totalHoje);
    }


    const getTotalFature = async () => {
        const { data } = await api.get<number>('/pedidos_total');
        // const fechados = data.filter(pedido => pedido.status === "Fechado");
        // let valorFechados = 0
        // data.forEach(pedido => {
        //     valorFechados = valorFechados + pedido.valor
        // })
        setValueFaturamentoTotal(data)
    }

    // const getTotalFatureDay = () => {
    //     let valorFechados = 0
    //     pedidosFechado.forEach(pedido => {
    //         valorFechados = valorFechados + pedido.valorExtra
    //     })
    //     setValueFaturamentoTotalDay(valorFechados)
    // }

    useEffect(() => {
        const runFunctions = async () => {
            await getFuncionariosAPI()
            await getPedidosApi()
            await getTotalFature()
        }

        const renderFunctions = async () => {
            await getPedidosDeHoje()
            await getClientesAPI()
        }

        renderFunctions()
        runFunctions()
    },[props])

    return (
        <div className="containerAdmin">
            <Header title="Área administrativa" />
            <main className="mainHome">
                <section className="containerDashBord">
                    <div
                        className="dashBordcontent"
                        onClick={() => router.push('/funcionarios')}
                    >
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Funcionários</p>
                            <p className="countDashbord">{funcionarios}</p>
                        </div>
                    </div>
                    <div
                        className="dashBordcontent"
                        onClick={() => router.push('/clientes')}
                    >
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Clientes</p>
                            <p className="countDashbord">{clientes}</p>
                        </div>
                    </div>
                    <div
                        className="dashBordcontent"
                        onClick={() => router.push('/total_de_pedidos')}
                    >
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Faturamento Total - {pedidos.length}</p>
                            <p className="countDashbord">{`R$${valueFaturamentoTotal.toFixed(2)}`}</p>
                        </div>
                    </div>
                </section>
                <section className="containerDashBord">
                    <div className="containerPaneilPedidos">
                        <h2>Pedidos - {allOders}</h2>
                        <div className="wrapPainelPedidos">
                            <div className="contentPainelPedidos">
                                <p className="itemPainelPedidos">
                                    <span className="labelPainel">Pedidos aberto</span>
                                    <span>{pedidosAberto.length}</span>
                                </p>
                            </div>
                            <div className="contentPainelPedidos">
                                <p className="itemPainelPedidos">
                                    <span className="labelPainel">Pedidos em andamento</span>
                                    <span>{pedidosEmAndmento.length}</span>
                                </p>
                            </div>
                            <div className="contentPainelPedidos">
                                <p className="itemPainelPedidos">
                                    <span className="labelPainel">Pedidos fechado</span>
                                    <span>{pedidosFechado.length}</span>
                                </p>
                            </div>
                        </div>
                        <div className="dashBordcontent">
                            <div className="wrapContentDashbord">
                                <p className="dashBordTitleContent">Faturamento - {todayOrders} </p>
                                <p className="countDashbord">{`R$${valueFaturamentoTotalDay.toFixed(2)}`}</p>
                            </div>
                        </div>
                        <div>
                            <BarChart width={600} height={300} data={data}>
                                <XAxis dataKey="name" stroke="#000" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#20B2AA" strokeDasharray="5 5" />
                                <Bar dataKey="uv" fill="#008080" barSize={40} />
                            </BarChart>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export { Admin }