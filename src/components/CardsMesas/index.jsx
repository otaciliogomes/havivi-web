import { useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { SiAirtable } from 'react-icons/si';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Modal } from 'react-bootstrap'
import mockProdutos from './mock.json';
import { ProviderTable } from '../../pages/contexts/TableContext';





const CardsMesas = ({ numberMesa }) => {
    const { qtdProductsCount, setQtdProductsCount} = useContext(ProviderTable);
    const [closeConta, setCloseConta] = useState(false);
    const [valueCount] = useState(0);
    const [modalShow, setModalShow] = useState(false);

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

        const HandleAddItem = (item) => {
            const newItem = item

            setQtdProductsCount((prevValue) => [...prevValue,  newItem])
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
                                <button
                                    onClick={HandleAddItem(produto)}
                                    key={produto.id}
                                    className="btnListItemAdd"
                                >
                                    {produto.name}
                                    {`R$ ${produto.preco}`}
                                </button>
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
                        {qtdProductsCount.map(produto => {

                            return (
                                <tr>
                                    <td>1</td>
                                    <td>{produto.name}</td>
                                    <td>{`R$ ${produto.preco}`}</td>
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
                <ModalAddItem show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </>
    )
}

export { CardsMesas };