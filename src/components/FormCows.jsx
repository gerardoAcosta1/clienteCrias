
const FormCows = ({ visibleForm, handleSubmit, submit, register, updateInfo, close }) => {

  return (
    <div className={`form__container ${!visibleForm ? 'hide_form' : 'show_form'}`}>
        <form onClick={e => e.stopPropagation()} className={`form__cow `} onSubmit={handleSubmit(submit)}>
            <h4 className="close__btn" onClick={() => close()}>X</h4>
            <div className="form__group ">
                <label className='form__label' htmlFor="peso">Peso</label>
                <input className="form__input"{...register('peso')} type="number" min="1" max="600" step="1" id="peso" name="peso" />
            </div>
            <div className="form__group ">
                <label className='form__label' htmlFor="musculo">Color Músculo</label>

                <input className="form__input "{...register('musculo')} type="number" min="1" max="600" step="1" id="musculo" name="musculo"></input>
            </div>
            <div className="form__group">
                <label className='form__label' htmlFor="marmoleo">Marmoleo</label>
                <input className="form__input " {...register('marmoleo')} type="number" min="1" max="600" step="1" id="marmoleo" name="marmoleo" />
            </div>
            <button className="form__btn">{updateInfo ? 'Update' : 'ADD'}</button>
        </form>
    </div>
  )
}
export default FormCows
