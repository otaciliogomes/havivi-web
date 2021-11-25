import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Modal } from 'react-bootstrap'
import { ButtonAddITem } from "../ButtonAddItem";
import PaymentIcon from '@mui/icons-material/Payment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Tooltip from '@mui/material/Tooltip';
import api from '../../Service/api';



const CardsMesas = ({ numberMesa, title, pedido }) => {
    const [closeConta, setCloseConta] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalClientShow, setModalClientShow] = useState(false);
    const [produtosMesa, setProdutosMesa] = useState([]);
    const [funcionarioId, setFuncionarioId] = useState("");
    const [funcionarioAPI, setFuncionarioAPI] = useState({});
    const [clienteAPI, setClienteAPI] = useState({});
    const [valorTotalConta, setValorTotalConta] = useState(0);


    const handleClientePedido = async (form) => {
        const cliente = {
                nome: form.nome,
                endereco: form.endereco,
                telefone: Number(form.telefone),     
        }

        const { data } = await api.post('/clientes', cliente)
        const { id } = data;
        await api.put('/pedidos', {
            id: pedido.id,
            status: "Em andamento",
            valorExtra: pedido.valorExtra,
            cliente_id: id,
            funcionario: pedido.funcionario
        })

        setClienteAPI(cliente)
    }

    const getFuncionarioID = async () => {
        if (!pedido.funcionario) return;
        const idFuncionarioLogado = localStorage.getItem('FuncionarioID');
        const idFuncionario = idFuncionarioLogado ? JSON.parse(idFuncionarioLogado) : '';

        const { data } = await api.get(`/funcionarios/${pedido.funcionario}`);
        setFuncionarioId(idFuncionario)
        setFuncionarioAPI(data)

    }

    const getClienteID = async () => {
        if (!pedido.cliente) return;

        const { data } = await api.get(`/clientes/${pedido.cliente}`);

        console.log("AQUI", pedido.cliente)
        setClienteAPI(data)
    }

    const getProdutosLis = (produtosFilter) => {
        const produtosLista = [];
        produtosFilter.forEach(async (produto) => {
            const { data } = await api.get(`/produtos/${produto.produto}`);
            produtosLista.push(data)
        })

        return produtosLista;
    }
    const getProdutosPedidos = async () => {
        const { data } = await api.get(`/produto_pedido`);
        const produtosFilter = data.filter(produto => produto.pedido === pedido.id);


        const produtosLista = await getProdutosLis(produtosFilter)
        setProdutosMesa(produtosLista)
    }

    const somarValorTotalConta = async () => {
        // const valorTotalList = produtosMesa.map(produto => produto.valor);
        // let valorTotal = 0;
        // valorTotalList.forEach(value => {
        //     valorTotal = valorTotal + value;
        // });
        // setValorTotalConta(valorTotal);
        // await api.put('/pedidos', {
        //     id: pedido.id,
        //     status: pedido.status.toLocaleLowerCase() == "em andamento" ? "Em andamento" : "Aberto",
        //     valorExtra: valorTotal
        // })
    }

    useEffect(() => {
        const renderFunctions = async () => {
            await getProdutosPedidos()
            await getFuncionarioID()
            await getClienteID()
            // await somarValorTotalConta()
        }
        renderFunctions()

    }, [])



    const HandleCloseConta = async () => {
        await api.put('/pedidos', { 
            id: pedido.id, 
            status: "Fechado", 
            valorExtra: pedido.valorExtra, 
            funcinario: pedido.funcinario,
            cliente: pedido.cliente,
        })
        setCloseConta(true);
        toast.error("Conta Fechada")
    }

    const ModalAddItem = (props) => {
        const [produtosLits, setProdutosLits] = useState([]);
        const [searchValue, setSearchValue] = useState('');
        const id = props.pedidoId;

        const getProdutosApi = async () => {
            const { data } = await api.get('/produtos');
            setProdutosLits(data)
        }

        useEffect(() => {
            getProdutosApi()

        }, [])


        const AddSearchValue = (event) => {
            const { value } = event.target
            setSearchValue(value)
        }

        const filteredPosts = searchValue
            ? produtosLits.filter((post) => {
                return post.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
            })
            : produtosLits;

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Seleciona o item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="contentModalListItem">
                        <h4>Produtos</h4>
                        <input
                            className="inputSearchModal"
                            type="text"
                            value={searchValue}
                            onChange={event => AddSearchValue(event)}
                        />
                        {filteredPosts.map(produto => {

                            return (
                                <ButtonAddITem
                                    key={produto.id}
                                    produto={produto}
                                    pedido={pedido}
                                    closeModal={props.onHide}
                                />
                            )
                        })}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footerCard">
                        <button
                            onClick={props.onHide}
                            className="buttonFooterCard buttonCloseConta"
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    const ModalClient = (props) => {
        const [nomeCliente, setNomeCliente] = useState("")
        const [enderecoCliente, setEnderecoCliente] = useState("")
        const [telefoneCliente, setTelefoneCliente] = useState("")

        const insertValueFormCliente = async () => {
            const cliente = {
                nome: nomeCliente,
                endereco: enderecoCliente,
                telefone: telefoneCliente
            }
            props.onHide()
            await handleClientePedido(cliente)
        }

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Adicinar Cliente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="contentModalListItem">
                        <input type="text" placeholder="Nome" onChange={event => setNomeCliente(event.target.value)} />
                        <input type="text" placeholder="Endereço" pattern="[0-9]" onChange={event => setEnderecoCliente(event.target.value)} />
                        <input type="tel" placeholder="Telefone" onChange={event => setTelefoneCliente(event.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footerCard">
                        <button
                            onClick={insertValueFormCliente}
                            className="buttonFooterCard buttonCloseConta"
                        >
                            <PersonAddIcon />
                        </button>
                        <button
                            onClick={props.onHide}
                            className="buttonFooterCard buttonCloseConta"
                        >
                            Cancelar
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <>
            <div className={closeConta ? "closeConta" : /*pedido.status.toLowerCase() == "em andamento" ? */"containerCardMesa" /*: "containerCardMesaRun"*/}>
                <ToastContainer />
                <div className="topMesa">
                    <p className="TitlePedido">{title} - {pedido.id}</p>
                    <p>Atendo por: {funcionarioAPI.nome}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Cliente: {clienteAPI.nome}</p>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosMesa.map((produto, index) => {
                            return (
                                <tr key={produto.id}>
                                    <td>{`${index + 1}`}</td>
                                    <td>{produto?.nome}</td>
                                    <td>{`R$ ${produto?.valor}`}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr></tr>
                    </tbody>
                </Table>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span className="totalConta">{`R$ ${pedido.valorExtra}`}</span>
                </div>
                <div className="footerCard">
                    <Tooltip title="Adicionar Item">
                        <button
                            className="buttonFooterCard buttonAddItem"
                            onClick={() => setModalShow(true)}
                        >
                            <AddCircleIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Fechar Conta">
                        <button
                            className="buttonFooterCard buttonAddItem"
                            onClick={HandleCloseConta}
                        >
                            <PaymentIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Adicionar Cliente">
                        <button
                            className="buttonFooterCard buttonAddItem"
                            onClick={() => setModalClientShow(true)}
                        >
                            <PersonAddIcon />
                        </button>
                    </Tooltip>
                </div>
                <ModalAddItem numberMesa={numberMesa} show={modalShow} pedidoId={pedido.id} onHide={() => setModalShow(false)} />
                <ModalClient numberMesa={numberMesa} show={modalClientShow} onHide={() => setModalClientShow(false)} />
            </div>
        </>
    )
}

export { CardsMesas };
