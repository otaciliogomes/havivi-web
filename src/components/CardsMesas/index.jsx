import { useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { SiAirtable } from 'react-icons/si';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Modal } from 'react-bootstrap'
import mockProdutos from './mock.json';
import ContextTable from '../../pages/contexts/TableContext';
import {ButtonAddITem} from "../ButtonAddItem";




const CardsMesas = ({numberMesa}) => {
    const { qtdProductsCount, setQtdProductsCount} = useContext(ContextTable);
    const currentTable = qtdProductsCount[numberMesa].produtos
    const [closeConta, setCloseConta] = useState(false);
    const [valueCount] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [proddutosMesa, setProdutosMesa] = useState(currentTable);

    useEffect(() => {
        const newProdutoMesa = localStorage.getItem(`table${numberMesa}Item`);
        const newItems = newProdutoMesa ? JSON.parse(newProdutoMesa) : ''
        const newItemsMesa = [...currentTable, ...newItems];
        setProdutosMesa(newItemsMesa)
        console.log(newItemsMesa)
    }, [])



    const HandleCloseConta = () => {
        setCloseConta(true);
        toast.success("Conta Fechada")
    }

    const ModalAddItem = (props) => {
        const [produtosLits] = useState(mockProdutos);
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
                                <ButtonAddITem numberMesa={props.numberMesa} produto={produto}/>
                            )
                        })}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footerCard">
                        {/* <button
                            // onClick={props.onHide}
                            className="buttonFooterCard buttonAddItem"
                            type="submit"
                        >
                            Seleciona
                        </button> */}
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
                    <SiAirtable size={28} />
                    <p>Mesa - {numberMesa}</p>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proddutosMesa.map(produto => {

                            return (
                                <tr>
                                    <td>1</td>
                                    <td>{produto?.name}</td>
                                    <td>{`R$ ${produto?.preco}`}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                {`R$ ${valueCount}`}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="footerCard">
                    <button
                        className="buttonFooterCard buttonAddItem"
                        onClick={() => setModalShow(true)}
                    >
                        Adicionar Item
                    </button>
                    <button
                        className="buttonFooterCard buttonCloseConta"
                        onClick={HandleCloseConta}
                    >
                        Fechar Mesa
                    </button>
                </div>
                <ModalAddItem numberMesa={numberMesa} show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </>
    )
}

export { CardsMesas };