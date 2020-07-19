import React, {useState, ChangeEvent, FormEvent} from 'react';
import { useHistory } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi';
import './Home.css';
import HeaderComponent from '../../components/header/Header';
import FooterComponent from '../../components/footer/Footer';
import api from './../../service/api';

const Home = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [loginHash, setLoginHash] = useState({
        token: ''
    });

    const history = useHistory();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const {username, password} = formData;
        const data = new FormData();

        data.append('username', username);
        data.append('password', password);

        api.post('api-token-auth/', data).then(response => {
            const hash = response.data;
            setLoginHash(hash);
            localStorage.setItem('@stone-report/hash', hash.token);
        });

        if (loginHash.token) {
            history.push('/reports');
        }

    }
    return (
        <>
            <HeaderComponent />

            <main className="mainContainer">
                <form className="inputContainer" onSubmit={handleSubmit}>
                <fieldset className="inputContainer">
                    <label className="label">
                        Usuário
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            onChange={handleInputChange}
                            className="input"
                        />
                    </label>

                    <label className="label">
                        Senha
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={handleInputChange}
                            className="input"
                        />
                    </label>
                    <button type="submit" className="formButton">
                        <span className="buttonSpan">
                            <FiLogIn />
                        </span>
                        Entrar
                    </button>
                </fieldset>
                </form>
            </main>

            <FooterComponent />
        </>
    );
}

export default Home;