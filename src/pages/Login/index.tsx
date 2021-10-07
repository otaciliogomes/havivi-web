import { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css'


const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        console.log(name, password);
    }, [name, password]);

    const handleForm = (event: FormEvent) => {
        event.preventDefault();

        history.push('/home');
    }

    return (
        <form onSubmit={handleForm}>
            <div className="container">
                <h1>Login</h1>
                <div className="contentForm">
                    <div className="content">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" onChange={event => setName(event.target.value)} required />
                        <label htmlFor="name">Senha</label>
                        <input type="password" id="password" onChange={event => setPassword(event.target.value)} required />
                    </div>
                    <button className="btnLogin" type="submit"> Confirmar </button >
                </div>
            </div>
        </form>
    )
}

export { Login };