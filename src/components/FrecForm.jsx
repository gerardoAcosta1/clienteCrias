import React from 'react'

const FrecForm = ({ visibleFrecForm, handleSubmit, submit, register, updateInfo, close }) => {
    return (
            <div className={`form__container ${!visibleFrecForm ? 'hide_form' : 'show_form'}`}>
                <form onClick={e => e.stopPropagation()} className={`form__cow `} onSubmit={handleSubmit(submit)}>
                    <h4 className="close__btn" onClick={() => close()}>X</h4>
                    <div className="form__group ">
                        <label className='form__label' htmlFor="temp">Temp</label>
                        <input className="form__input"{...register('temp')} type="number" min="1" max="600" step="1" id="temp" name='temp'/>
                    </div>
                    <div className="form__group ">
                        <label className='form__label' htmlFor="fc">F. Cardiaca</label>

                        <input className="form__input "{...register('fc')} type="number" min="1" max="600" step="1" id="fc" name='fc'></input>
                    </div>
                    <div className="form__group">
                        <label className='form__label' htmlFor="fr">F. Respiratoria</label>
                        <input className="form__input " {...register('fr')} type="number" min="1" max="600" step="1" id="fr" name='fr'/>
                    </div>
                    <div className="form__group">
                        <label className='form__label' htmlFor="fs">F. Sanguinea</label>
                        <input className="form__input " {...register('fs')} type="number" min="1" max="600" step="1" id="fs" name='fs'/>
                    </div>
                    <button className="form__btn">{updateInfo ? 'Update' : 'ADD'}</button>
                </form>
            </div>

    )
}

export default FrecForm
