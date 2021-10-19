import { useState, ChangeEvent } from 'react';
import { Table } from 'react-bootstrap';
import { SiAirtable } from 'react-icons/si';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { Modal } from 'react-bootstrap'
import mockProdutos from './mock.json';

interface ICardsMesas {
    numberMesa?: number;
}

interface IModalAdd {
    show: boolean;
    onHide: () => void;
}




const CardsMesas = ({ numberMesa }: ICardsMesas) => {
    const [closeConta, setCloseConta] = useState(false);
    const [produtosCount, setProdutosCount] = useState([{
        id: '',
        name: '',
        preco: ''
    }]);
    const [valueCount, setValueCount] = useState(0);
    const [litsProductsSelect, setLitsProductsSelect] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const HandleCloseConta = () => {
        setCloseConta(true);
        toast.success("Conta Fechada")
    }

    const HandleAddItem = () => {

    }

    const ModalAddItem = (props: IModalAdd) => {
        const [produtosLits, setProdutosLits] = useState(mockProdutos);

    
    
        const handleForm = (event: any) => {
    
            console.log(event.target.value)
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
                        Seleciona o item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosLits.map(produto => {
                                    return (
                                        <tr>
                                            <td>
                                                <input type="checkbox" value={produto.id} onChange={value => handleForm(value)} />
                                            </td>
                                            <td>{produto.name}</td>
                                            <td>{`R$ ${produto.preco}`}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="footerCard">
                        <button
                            // onClick={props.onHide}
                            className="buttonFooterCard buttonAddItem"
                            type="submit"
                        >
                            Seleciona
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
                        {produtosCount.map(produto => {

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