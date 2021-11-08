import { useState, useEffect } from "react";
import api from '../../Service/api'
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import "./style.css"

import { CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Bar } from 'recharts';



const Admin = () => {
    const [funcionarios, setFuncionarios] = useState(0);
    const [clientes, setClientes] = useState(0);
    const [valueFaturamentoTotal, setValueFaturamentoTotal] = useState(0);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [pedidosEmAndmento, setPedidosEmAndmento] = useState<any[]>([]);
    const [pedidosAberto, setPedidosAberto] = useState<any[]>([]);
    const [pedidosFechado, setPedidosFechado] = useState<any[]>([]);


    const data = [
        { name: 'Pedidos aberto', uv: pedidosAberto.length, pv: 2400, amt: 2400 },
        { name: 'Pedidos em andamento', uv: pedidosEmAndmento.length, pv: 2400, amt: 2400 },
        { name: 'Pedidos em Fechados', uv: pedidosFechado.length, pv: 2400, amt: 2400 },
    ];

    const getFuncionariosAPI = async () => {
        const { data } = await api.get<any[]>('/funcionarios_show');
        setFuncionarios(data.length)
    }

    const getPedidosApi = async () => {
        const { data } = await api.get<any[]>('/pedidos');
        setPedidos(data);

        await SepararPedidos(data)
        
    }

    const getClientesAPI = async () => {
        const { data } = await api.get<any[]>('/cliente_show');
        setClientes(data.length)
    }

    const SepararPedidos = (data: any[]) => {
    
        const aberto = data.filter(pedido => pedido.status == "Aberto");
        setPedidosAberto(aberto);
 
        const fechados = data.filter(pedido => pedido.status == "Fechado");
        setPedidosFechado(fechados)

        const emAdamento = data.filter(pedido => pedido.status == "Em andamento");
        setPedidosEmAndmento(emAdamento)
    }

    const getTotalFature = async () => {
        const { data } = await api.get('/pedidos_total');
        setValueFaturamentoTotal(data)
    }

    useEffect(() => {
        const runFunctions = async () => {
            await getFuncionariosAPI()
            await getClientesAPI()
            await getPedidosApi()
            await getTotalFature()
        }
        runFunctions()
    }, [])

    return (
        <div className="containerAdmin">
            <Header title="Area administrativa" />
            <main className="mainHome">
                <section className="containerDashBord">
                    <div className="dashBordcontent">
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Funcionarios</p>
                            <p className="countDashbord">{funcionarios}</p>
                        </div>
                    </div>
                    <div className="dashBordcontent">
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Clientes</p>
                            <p className="countDashbord">{clientes}</p>
                        </div>
                    </div>
                    <div className="dashBordcontent">
                        <div className="wrapContentDashbord">
                            <p className="dashBordTitleContent">Faturamento</p>
                            <p className="countDashbord">{`R$${valueFaturamentoTotal}`}</p>
                        </div>
                    </div>
                </section>
                <section className="containerDashBord">
                    <div className="containerPaneilPedidos">
                        <h2>Pedidos</h2>
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