import { useForm } from 'react-hook-form'
import '../../styles/Layouts/LoginLayout.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'

const LoginLayout = ({ notice }) => {

    const { register, reset, handleSubmit } = useForm()

    const { loginUser, allCowsByDB, cows } = useFetch();

    useEffect(() => {
        allCowsByDB()
    }, [])

    const submit = async data => {

        await loginUser(data);
        notice('usuario logueado', 'green')
        
        reset({
            username: '',
            password: '',
        })
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