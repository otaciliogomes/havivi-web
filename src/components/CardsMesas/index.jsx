import { useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { SiAirtable } from 'react-icons/si';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Modal } from 'react-bootstrap'
import mockProdutos from './mock.json';
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
    const [clientePedido, setClientePedido] = useState("");

    const handleClientePedido = async (form) => {
        const cliente = {
                nome: form.nome,
                endereco: form.endereco,
                telefone: Number(form.telefone),     
        }

        console.log(cliente)
        const {data} = await api.post('/pedidos', cliente)

        setClientePedido(data.nome)
    }

    // useEffect(() => {
    //     const getProdutosDoPedido = async () => {
    //         const { data } = await api.get(`/produtos/${pedido.id}`);
    //         setProdutosMesa(data);
    //     }

    //     getProdutosDoPedido();
    // }, [])



    const HandleCloseConta = async () => {
        await api.put('/pedidos', { id: pedido.id, status: "Fechado", valorExtra: pedido.valorExtra })
        setCloseConta(true);
        toast.success("Conta Fechada")
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
                                    pedido_id={pedido.id}
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
                        <input type="text" placeholder="Nome" onChange={event=> setNomeCliente(event.target.value)}/>
                        <input type="text" placeholder="Endereço" pattern="[0-9]" onChange={event=> setEnderecoCliente(event.target.value)}/>
                        <input type="tel" placeholder="Telefone" onChange={event=> setTelefoneCliente(event.target.value)}/>
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
            <div className={closeConta ? "closeConta" : "containerCardMesa"}>
                <ToastContainer />
                <div className="topMesa">
                    <p className="TitlePedido">{title} - {numberMesa}</p>
                    <p>Atendo por: Funcionario</p>
                    <p>Status: {pedido.status}</p>
                    <p>Cliente: {clientePedido}</p>
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
                                    <td>{produto?.name}</td>
                                    <td>{`R$ ${produto?.valor}`}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td >
                                <span className="totalConta">{`R$ ${pedido.valorExtra}`}</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
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
