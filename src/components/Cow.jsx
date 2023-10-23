import '../styles/cow.css';
import typesHealth from '../utils/typesHealth'
const Cow = ({ cow, notice, setUpdateInfo, deleteW, update, clientApi}) => {

    const username = localStorage.getItem('user');

    const typesH = new typesHealth()
    
    const handleEdit = (id) => {
        if (username !== 'ayudante') {
            setUpdateInfo(id);
            update(id);
        } else {
            notice('Usuario no autorizado para esta acción');
        }
    };

    const handleEditFrec = (id) => {
        if (username === 'ayudante') {
            setUpdateInfo(id);
            update(id);
        } else {
            notice('Usuario no autorizado para esta acción');
        }
    };

    const handleAddQuarantine = async (cow) => {
        if(username != 'ayudante'){
            await clientApi.addCowQuarantine(cow)
            notice('se agregó a cuarentena', 'green')
        }else{
            notice('Usuario no autorizado para esta acción')
        }
    }

    return (
        <div className={`cows `}>
            <ul className={`list__cows `}>
                <li className={`item__cow `}>
                    <h4 className='id__title'>ID</h4>
                    <span className='value__item'>{cow?.id}</span>
                </li>
                <li className='item__cow'>
                    <h4 className='title__item'>Peso</h4>
                    <span className='value__item'>{cow?.peso} kg's</span>
                </li>
                <li className='item__cow'>
                    <h4 className='title__item'>Musculo</h4>
                    <span className='value__item'>{cow?.musculo}</span>
                </li>
                <li className='item__cow'>
                    <h4 className='title__item'>Marmoleo</h4>
                    <span className={`value__item`}>{cow?.marmoleo}</span>
                </li>
                <li className='item__cow'>
                    <h4 className='title__item'>Tipo</h4>
                    <span className='value__item'>{typesH.tipos(cow)}</span>
                </li>
                <li className={`item__cow ${typesH.salud(cow).isSpecial ? 'sick' : ''}`}>
                    <h4 className='id__title_S'>Salud</h4>
                    <span className={`'value__item'  ${typesH.salud(cow).isSpecial ? 'sick__color' : ''}`}>{typesH.salud(cow).resultado}</span>
                </li>
            </ul>

            <ul className='list__salud'>
                <li className='item__salud'>
                    <h4 className='id__title__salud'>Temp</h4>
                    <span className='value__item__salud'>
                        {cow?.temp !== null ? cow?.temp : 0}
                    </span>
                </li>
                <li className='item__salud'>
                    <h4 className='id__title__salud'>FC</h4>
                    <span className='value__item__salud'>
                        {cow?.fc != null ? cow?.fc : 0}
                    </span>
                </li>
                <li className='item__salud'>
                    <h4 className='id__title__salud'>FR</h4>
                    <span className='value__item__salud'>
                        {cow?.fr != null ? cow?.fr : 0}
                    </span>
                </li>
                <li className='item__salud'>
                    <h4 className='id__title__salud'>FS</h4>
                    <span className='value__item__salud'>
                        {cow?.fs != null ? cow?.fs : 0} min's
                    </span>
                </li>
            </ul>

            <i className='bx bx-edit' onClick={() => handleEdit(cow?.id)}></i>
            <i className='bx bx-trash' onClick={() => deleteW(cow?.id)}></i>
            <i className='bx bx-add-to-queue' onClick={() => handleEditFrec(cow?.id)}></i>
            <i className='bx bx-horizontal-right' onClick={() => handleAddQuarantine(cow)}>Cuarentena</i>
        </div>
    );
};

export default Cow;
