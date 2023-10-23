import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch"
import CleanParse from "../utils/cleanParse";
import Cow from "./Cow";
import CowQ from "./CowQ";
import '../styles/cows.css'
import { useForm } from "react-hook-form";
import FormCows from "./FormCows";
import FrecForm from "./FrecForm";
import { useNavigate } from "react-router-dom";

const Cows = ({ notice }) => {

    //--------- scripts, states, hooks-------------
    /*
    veterinario
    control
    reclutador
    ayudante
    sistemas
    */

    const {
        cows,
        cowsCuarenta,
        clientApi
    } = useFetch();

    const [visibleForm, setVisibleForm] = useState(false)
    const [visibleFrecForm, setVisibleFrecForm] = useState(false)
    const [updateInfo, setUpdateInfo] = useState()
    const [loading, setLoading] = useState(false)

    const { register, reset, handleSubmit } = useForm()

    const navigate = useNavigate();

    const username = localStorage.getItem('user');

    const cleaner1 = new CleanParse();

    //---------------------useEfect's---------------------------------------------

    useEffect(() => {

       clientApi.allCowsByDB()
        setLoading(true)
    }, [])

    //------------ Functions -------------------------------------------

    const cleanNewCow = () => {

        if (username !== 'ayudante') {
            setVisibleForm(!visibleForm)
            cleaner1.reset(reset)
        } else {
            notice('No está autorizado para ejecutar esta acción')
        }
    }

    const update = (id) => {

        const cleaner2 = new CleanParse(id, cows, cowsCuarenta)
        cleaner2.update(reset);
        setVisibleForm(!visibleForm)
    }

    const deleteW = async id => {

        if (username != 'ayudante') {
            setLoading(false)
            //await deleteCowQuarantine(id)
            await clientApi.deleteCowByDB(id);
            notice(`Se ha eliminado el registro ${id}, con éxito`, "green");
            setLoading(true)

        } else {
            notice('No está autorizado para ejecutar esta acción, comuníquese a Sistemas')
        }
    };

    const submit = async data => {

        setLoading(false)
        setVisibleForm(false)
        setVisibleFrecForm(false)

        const uno = cleaner1.parser(data);

        const handleDatabaseOperation = async () => {
            let message = '';
            try {
                let operationPromise;
                if (updateInfo) {
                    operationPromise = clientApi.updateCowByDB(updateInfo, uno.parseData);
                    message = 'Registro actualizado';
                } else {
                    operationPromise = clientApi.addCowByDB(uno.parseData2);
                    message = 'Registro agregado con éxito';
                }
        
                const result = await Promise.race([
                    operationPromise,
                    new Promise((resolve) => setTimeout(resolve, 4000)),
                ]);
        
                if (result === 'timeout') {
                    setLoading(true);
                    notice('La operación de la base de datos está tardando mucho');
                } else if (result) { // Verifica si la operación fue exitosa
                    setLoading(true);
                    notice(message, 'green');
                    setUpdateInfo();
                } else {
                    setLoading(true);
                    notice('Error al realizar la operación');
                }
            } catch (error) {
                setLoading(true);
                notice('Error al ejecutar la operación en la base de datos: ' + error);
            }
        };
        handleDatabaseOperation();
        cleaner1.reset(reset);
        setUpdateInfo();
    }

    const close = () => {

        setVisibleForm(false);
        setVisibleFrecForm(false);
        setUpdateInfo();
        cleaner1.reset(reset);
        setLoading(true)
    }

    const logout = () => {
        localStorage.removeItem("home")
        navigate('/')
    }

    //-----------return------------------------------

    return (
        <div className="main__cows">
            <div className="container__cows">

                <h2 className="title__cows">{username}</h2>
                <div className="container__buttons">
                    <div onClick={cleanNewCow} class='cria'>Nueva Cria</div>
                    <div onClick={logout} class='logout'>Salir</div>
                </div>

                <div className={`form__container loading ${loading ? 'hide_form' : 'show_form'}`}>Loading...</div>

                <FormCows
                    visibleForm={visibleForm}
                    handleSubmit={handleSubmit}
                    submit={submit}
                    register={register}
                    updateInfo={updateInfo}
                    close={close}
                />
                <FrecForm
                    visibleFrecForm={visibleFrecForm}
                    handleSubmit={handleSubmit}
                    submit={submit}
                    register={register}
                    updateInfo={updateInfo}
                    close={close}
                />
                <div className="scroll__container">

                    {
                        cows?.map(cow => (
                            <Cow
                                key={cow?.id}
                                cow={cow}
                                setUpdateInfo={setUpdateInfo}
                                deleteW={deleteW}
                                update={update}
                                notice={notice}
                                clientApi={clientApi}
                            />
                        ))
                    }

                </div>
                <h6 className="title__cuarentena">Cuarentena</h6>
                <div className="scroll__container">

                    {
                        cowsCuarenta?.map(cow => (

                            <CowQ
                                key={cow?.id}
                                cow={cow}
                                setUpdateInfo={setUpdateInfo}
                                deleteW={deleteW}
                                update={update}
                                notice={notice}
                                clientApi={clientApi}
                            />
                        ))
                    }

                </div>
                <div className="data__container">
                    <h4 className="database">dataBase: <span className={`${!cows.length == 0 ? 'conected' : 'disconected'}`}>{!cows.length == 0 ? 'conected' : 'Disconnected'}</span></h4>
                    <h4 className="database">Storage: <span className={`${cows.length == 0 ? 'conected' : 'disconected'}`}>{cows.length == 0 ? 'conected' : 'Disconnected'}</span></h4>
                </div>
            </div>

        </div>
    )
}

export default Cows