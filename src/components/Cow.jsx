import React, { useEffect, useState } from 'react';
import '../styles/cow.css';
import useFetch from '../hooks/useFetch';

const Cow = ({ cow, notice, visibleForm, setVisibleForm, setVisibleFrecForm, setUpdateInfo, deleteW, update, eliminarRegistro, addCowQuarantine }) => {


    const username = localStorage.getItem('user');

    const tipos = (cow) => {


        const peso = parseInt(cow?.peso);
        const musculo = parseInt(cow?.musculo);
        const marmoleo = parseInt(cow?.marmoleo);

        if (
            peso >= 15 &&
            peso <= 25 &&
            musculo >= 3 &&
            musculo <= 5 &&
            (marmoleo === 1 || marmoleo === 2)
        ) {
            return 1;
        }
        if (
            (peso < 15 || peso > 25) ||
            (musculo === 1 || musculo === 2 || musculo === 6 || musculo === 7) ||
            (marmoleo === 3 || marmoleo === 4 || marmoleo === 5)
        ) {
            return 2;
        }
        return 'tipo indeterminado';
    };

    const salud = (cow) => {

        const tempValue = parseFloat(cow?.temp) || 0;
        const fcValue = parseInt(cow?.fc) || 0;
        const frValue = parseInt(cow?.fr) || 0;
        const fsValue = parseInt(cow?.fs) || 0;

        if (
            (tempValue >= 37.5 && tempValue <= 39.5) &&
            (fcValue >= 70 && fcValue <= 80) &&
            (frValue >= 15 && frValue <= 20) &&
            (fsValue >= 8 && fsValue <= 10)
        ) {
            return { resultado: 'buena', isSpecial: false };
        } else if (
            (tempValue === 0 || fcValue === 0 || frValue === 0 || fsValue === 0)
        ) {
            return { resultado: 'indeterminada' };
        } else if (
            (tempValue < 37.5 || tempValue > 39.5) ||
            (fcValue < 70 || fcValue > 80) ||
            (frValue < 15 || frValue > 20) ||
            (fsValue < 8 || fsValue > 10)

        ) {
            return { resultado: 'mala', isSpecial: true };
        }
    };

    const handleEdit = (id) => {
        if (username !== 'ayudante') {
            setVisibleForm(!visibleForm);
            setUpdateInfo(id);
            update(id);
        } else {
            notice('Usuario no autorizado para esta acción');
        }
    };

    const handleEditFrec = (id) => {
        if (username === 'ayudante') {
            setVisibleFrecForm(true);
            setUpdateInfo(id);
            update(id);
        } else {
            notice('Usuario no autorizado para esta acción');
        }
    };
    const handleAddQuarantine = async (cow) => {
        if(username != 'ayudante'){
            await addCowQuarantine(cow)
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
                    <span className='value__item'>{tipos(cow)}</span>
                </li>
                <li className={`item__cow ${salud(cow).isSpecial ? 'sick' : ''}`}>
                    <h4 className='id__title_S'>Salud</h4>
                    <span className={`'value__item'  ${salud(cow).isSpecial ? 'sick__color' : ''}`}>{salud(cow).resultado}</span>
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
