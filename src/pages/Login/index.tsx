import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css'


const Login = () => {
    const router = useHistory();
    const [emailEnter, setEmailEnter] = useState('');
    const [email, setEmail] = useState('');
    const [passwordEnter, setPasswordEnter] = useState('');

    const getUsersAPI = async (id: number) => {
        const usersList = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(users => users.json())
            .then(user => user)

        setEmail(usersList.email);

        console.log(usersList)
        return;
    }

    const notify = () => {
        toast.error("usuario incorreto!")
        console.log("Renderixzou")
    }

    async function handleForm(event: FormEvent){
        // alert('vazou')
        event.preventDefault(); 

        
        await getUsersAPI(1);
        
        
        
        if (email !== emailEnter) {
            // router.push('/admin');
            notify();
            return;
        }
        router.push('/admin')
    }

    return (
        <div className="containerLogin">
            <ToastContainer />
            <div className="container">
                <h1>Login</h1>
                <div className="contentForm">
                    <div className="content">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" onChange={event => setEmailEnter(event.target.value)} required />
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