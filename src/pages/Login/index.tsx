import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Service/api'

import './styles.css'

interface Ilogin {
    id?: number,
    nome?: string,
    senha?: string,
    email?: string,
    tipo?: boolean,
    token?: string
}


const Login = () => {
    const router = useHistory();
    const [emailEnter, setEmailEnter] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState(false);
    const [passwordEnter, setPasswordEnter] = useState('');

    const getUsersAPI = async () => {
        const user = {
            user: emailEnter,
            senha: passwordEnter
        }
        const response = await api.post<Ilogin>('/funcionarios/logar', user)
        localStorage.setItem('token', JSON.stringify(response.data.token) )
        setTipo(response.data.tipo ? response.data.tipo : false)

        if(!response){
            notify();
            return;
        }
        
        return response
    }


    const notify = () => {
        toast.error("usuario incorreto!")
    }
    console.log(tipo)

    async function handleForm(event: FormEvent){
        // alert('vazou')
        event.preventDefault(); 
        const result = await getUsersAPI();
       
        // if (!result.status) {
        //     // router.push('/admin');
        //     notify();
        //     return;
        // }

        if(result?.data.tipo === true){
            router.push('/admin')
        } else {
            router.push('/mesas')
        }
    }

    return (
        <div className="containerLogin">
            <ToastContainer />
            <div className="container">
                <h1>Login</h1>
                <div className="contentForm">
                    <div className="content">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" name="email" onChange={event => setEmailEnter(event.target.value)} required />
                        <label htmlFor="name">Senha</label>
                        <input type="password" id="password" onChange={event => setPasswordEnter(event.target.value)} required />
                    </div>
                    <div >
                        <button
                            className="btnLogin"
                            type="submit"
                            onClick={(event) => handleForm(event)}
                        >
                            Confirmar
                        </button >
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Login };