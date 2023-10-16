import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch"
import Cow from "./Cow";
import CowQ from "./CowQ.JSX";
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
        allCowsByDB,
        cowsCuarenta,
        addCowByDB,
        updateCowByDB,
        deleteCowByDB,
        addCowQuarantine, 
        deleteCowQuarantine
    } = useFetch();

    const [visibleForm, setVisibleForm] = useState(false)
    const [visibleFrecForm, setVisibleFrecForm] = useState(false)
    const [updateInfo, setUpdateInfo] = useState()
    const [loading, setLoading] = useState(false)

    const { register, reset, handleSubmit } = useForm()

    const navigate = useNavigate();

    const username = localStorage.getItem('user');

    //---------------------useEfect's---------------------------------------------

    useEffect(() => {

        setLoading(false)

        allCowsByDB()

        setLoading(true)
    }, [])

    //----------function's------------------------------
    const cleanNewCow = () => {
        if (username !== 'ayudante') {

            reset({
                peso: 0,
                musculo: 0,
                marmoleo: 0,
            });

            setVisibleForm(!visibleForm)
        } else {
            notice('No está autorizado para ejecutar esta acción')
        }
    }

    const update = (id) => {

        setLoading(false)
        const cowUpdate = cows.find(cow => cow.id == id)

        reset({

            peso: parseInt(cowUpdate.peso) || null,
            musculo: parseInt(cowUpdate.musculo) || null,
            marmoleo: parseInt(cowUpdate.marmoleo) || null,
            temp: parseFloat(cowUpdate.temp) || null,
            fc: parseInt(cowUpdate.fc) || null,
            fr: parseInt(cowUpdate.fr) || null,
            fs: parseInt(cowUpdate.fs) || null
        });

        setLoading(true)

    }

    const deleteW = id => {

        if (username != 'ayudante') {

            setLoading(false)
            if (deleteCowByDB(id)) {
                notice(`Se ha eliminado el registro ${id}, con éxito`, "green");
            }
            setLoading(true)
        } else {
            notice('No está autorizado para ejecutar esta acción, comuníquese a Sistemas')
        }

    }

    const submit = async data => {

        const parseData = {
            peso: parseInt(data.peso),
            musculo: parseInt(data.musculo),
            marmoleo: parseInt(data.marmoleo),
            temp: parseFloat(data.temp),
            fc: parseInt(data.fc),
            fr: parseInt(data.fr),
            fs: parseInt(data.fs)
        }

        setLoading(false)

        if (updateInfo) {

            const updatedCow = updateCowByDB(updateInfo, parseData);

            if (updatedCow) {
                notice('Registro actualizado', "green");
                allCowsByDB();
                setUpdateInfo();
            } else {
                notice('Error al actualizar el registro');
            }

        } else {

            if (await addCowByDB(parseData)) {
                notice('Registro agregado con éxito', "green")
                allCowsByDB()
            } else {
                notice("Error al ingresar registro", "red")
            }
        }

        setVisibleForm(false)
        setVisibleFrecForm(false)

        reset({
            peso: null,
            musculo: null,
            marmoleo: null,
        });

        setLoading(true)
    }

    const close = () => {

        setVisibleForm(false)
        setVisibleFrecForm(false)
        setUpdateInfo()

        reset({
            peso: null,
            musculo: null,
            marmoleo: null,
        });
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
                                setVisibleForm={setVisibleForm}
                                setVisibleFrecForm={setVisibleFrecForm}
                                visibleForm={visibleForm}
                                setUpdateInfo={setUpdateInfo}
                                deleteW={deleteW}
                                update={update}
                                notice={notice}
                                addCowQuarantine={addCowQuarantine}
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
                                setVisibleForm={setVisibleForm}
                                setVisibleFrecForm={setVisibleFrecForm}
                                visibleForm={visibleForm}
                                setUpdateInfo={setUpdateInfo}
                                deleteW={deleteW}
                                update={update}
                                notice={notice}
                                deleteCowQuarantine={deleteCowQuarantine}
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