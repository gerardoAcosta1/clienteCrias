import { useForm } from 'react-hook-form'
import '../../styles/Layouts/LoginLayout.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginLayout = ({ notice }) => {

    const { register, reset, handleSubmit } = useForm()

    const { clientApi, cows } = useFetch();

    const navigate = useNavigate()

    useEffect(() => {
      clientApi.allCowsByDB()
    }, [])

    const submit = async data => {

        try {
            const response = await clientApi.loginUser(data)
            if (response.data.username === data.username && response.data.password === data.password) {
                localStorage.setItem('user', response.data.username);
                localStorage.setItem('home', 'pass');
                await navigate('/cows');
            } else {
                console.log('credenciales invalidas')
                console.log(response)
            }
        } catch (error) {
           console.log(error.message)
        }

        notice('usuario logueado', 'green');

        reset({
            username: '',
            password: '',
        });
    }


    return (

        <div className="main__login">
            <form onSubmit={handleSubmit(submit)}>
                <div className="container__title__register">
                    <h3 className="singUp">Login</h3>
                </div>
                <div className="container__register">
                    <div>
                        <label className="title__register" htmlFor="username">Username</label>
                        <input className="input__register"{...register('username')} type="text" id="username" />
                    </div>
                    <div>
                        <label className="title__register" htmlFor="password">Password</label>

                        <input className="input__register"{...register('password')} type="password" id="password" />
                    </div>
                    <button className="button__register">Login</button>
                </div>
            </form>
            <h4 className={`${cows ? 'conected' : 'disconected'}`}>{cows.length != 0 ? 'conected' : 'Disconnected'}</h4>
        </div>
    )
}

export default LoginLayout