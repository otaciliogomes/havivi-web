import { useState, useEffect } from 'react';
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
import SelectAutoWidth from '../Select';



const CardsMesas = ({ numberMesa, title, pedido }) => {

    const [closeConta, setCloseConta] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalClientShow, setModalClientShow] = useState(false);
    const [modalFecharContaShow, setModalFecharContaShow] = useState(false);

    const [formaDePagamento, setFormaDePagamento] = useState("");

    const [, setFuncionarioNome] = useState("");
    const [, setClienteNome] = useState("");
    const [produtosLista, setProdutosLista] = useState([])
    const [valorTotalConta, setValorTotalConta] = useState(0);
    const [produtosLits, setProdutosLits] = useState([]);

    const statuPrato = [
        "Solicitado",
        "Em andamento",
        "Esperando retirar",
        "Na mesa do cliente",
    ];


    const handleClientePedido = async (cliente) => {
        await api.post('/pedidos_cliente', { cliente, pedido_id: pedido.id });
    }

    const getProdutoPedidos = async () => {
        const { data } = await api.get(`/produto_pedido/${pedido.id}`);

        setProdutosLista(data);
    }

    const getValorPedido = async () => {
        const { data } = await api.get(`/pedidos/${pedido.id}`);

        setValorTotalConta(data.valor)
    }

    const getFuncionarioNome = async () => {
        const { data } = await api.get(`/funcionarios/${pedido.funcionario_id}`);

        setFuncionarioNome(data.nome)
    }

    const getClienteNome = async () => {
        const { data } = await api.get(`/clientes/${pedido.cliente_id}`);

        setClienteNome(data.nome)
    }

    const getProdutosApi = async () => {
        const { data } = await api.get('/produtos');
        setProdutosLits(data)
    }


    useEffect(() => {
        const renderFunctions = async () => {
            await getFuncionarioNome()
            await getProdutoPedidos()
            await getValorPedido()
            await getClienteNome()
            await getProdutosApi()

        }
        renderFunctions()
    })


    const deleteProdutoItem = async (produto_id, pedido_id) => {
        const { data } = await api.delete(`/produto_pedido/${produto_id}/${pedido_id}`);

        toast.error(data.status);
        await getProdutoPedidos();
        await getValorPedido();
    }


    const HandleCloseConta = async () => {
        const { data } = await api.post('/pedidos_fechar', { id: pedido.id, forma_de_pagamento: formaDePagamento })
        setCloseConta(true);
        toast.error(data.status)
    }

    const ModalAddItem = (props) => {
        
        const [searchValue, setSearchValue] = useState('');

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
                                <div
                                    key={produto.id}
                                >
                                    <ButtonAddITem
                                        produto={produto}
                                        pedido={pedido}
                                        closeModal={props.onHide}
                                    />
                                </div>
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
                telefone: Number(telefoneCliente)
            }
            await handleClientePedido(cliente)
            props.onHide()
            await getClienteNome();
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
                    <form autocomplete="off" className="contentModalListItem">
                        <input type="text" placeholder="Nome" onChange={event => setNomeCliente(event.target.value)} />
                        <input type="text" placeholder="Endereço" pattern="[0-9]" onChange={event => setEnderecoCliente(event.target.value)} />
                        <input type="tel" placeholder="Telefone" onChange={event => setTelefoneCliente(event.target.value)} />
                    </form>
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

    const FecharContaModal = (props) => {
        const valuesPayment = [
            "Cartão de credito",
            "Cartão de debito",
            "Dinheiro"
        ]

        const hadleFormaDePagamento = (value) => {
            setFormaDePagamento(value)
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
                        Fechar Conta
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="contentClosedOrder">
                        <span
                            style={{ width: "50%", textAlign: "center" }}
                            className="buttonFooterCard buttonAddItem"
                        >
                            {`R$${valorTotalConta}`}
                        </span>
                        <div style={{ width: "50%" }} >
                            <SelectAutoWidth
                                typesValues={valuesPayment}
                                label="Forma de pagamento"
                                setValue={hadleFormaDePagamento}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footerCard">
                        <button
                            className="buttonFooterCard buttonCloseConta"
                            onClick={() => {
                                HandleCloseConta()
                                props.onHide()
                            }}
                        >
                            <PaymentIcon />
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
                    <p className="TitlePedido">{title} - {numberMesa}</p>
                    <p>Atendo por: {pedido?.funcionario_id?.nome}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Cliente: {pedido?.cliente_id?.nome}</p>
                </div>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosLista.map((produto, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{`${index + 1}`}</td>
                                    <td>{produto?.nome}</td>
                                    <td>{`R$ ${!!produto.valor ? produto.valor : 0}`}</td>
                                    <td>
                                        <SelectAutoWidth typesValues={statuPrato} label="Status" />
                                    </td>
                                    <td>
                                        <button
                                            className="buttonFooterCard buttonAddItem"
                                            onClick={() => deleteProdutoItem(produto.id, pedido.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr></tr>
                    </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span className="totalConta">{`R$ ${valorTotalConta}`}</span>
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
                            onClick={() => setModalFecharContaShow(true)}
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
                <ModalAddItem
                    numberMesa={numberMesa}
                    show={modalShow}
                    // pedidoId={pedido.id}
                    onHide={() => {
                        getProdutoPedidos()
                        setModalShow(false);
                        getValorPedido();
                    }}
                />
                <ModalClient numberMesa={numberMesa} show={modalClientShow} onHide={() => setModalClientShow(false)} />
                <FecharContaModal show={modalFecharContaShow} onHide={() => setModalFecharContaShow(false)} />
            </div>
        </>
    )
}

export { CardsMesas };
