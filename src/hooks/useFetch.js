import axios, { Axios } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useFetch = () => {

    const [cows, setCows] = useState([]);
    const [cowsCuarenta, setCowsCuarenta] = useState([])
    const navigate = useNavigate();
    
    //const cowsLocale = JSON.parse(localStorage.getItem('cow')) || [];
    //se desarrolló lógica para adaptarlo a local

    const loginUser = (data) => {
        axios
            .get(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/users/${data.username}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.username == data.username && res.data.password == data.password) {
                        localStorage.setItem('user', res.data.username);
                        localStorage.setItem('home', 'pass');
                        navigate('/cows');
                        return res.data
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        if (data.username) {
            
        }
    }
    const allCows = () => {

        setCows(cowsLocale);
    };
const allCowsQuarantine = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/quarantine`)
            .then((res) => {
                setCowsCuarenta(res.data)
                return resolve(res.data)
            })
            .catch(err => console.log(err))
        });
}; 
    const allCowsByDB = () => {
        return new Promise((resolve, reject) => {
        axios
            .get(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/cows`)
            .then((res) => {
                setCows(res.data)
                allCowsQuarantine()
                return resolve(res.data)
            })
            .catch(err => console.log(err))
        });
    }
const addCowQuarantine = cow => {
    return new Promise((resolve, reject) => {
    axios
        .post(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/quarantine`, cow)
        .then((res) => {
          
            allCowsQuarantine()
            allCowsByDB()
            return resolve(res.data)
        })
        .catch(err => console.log(err))
    });
}
const deleteCowQuarantine = cow => {
    console.log(cow)
    return new Promise((resolve, reject) => {
    axios
        .delete(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/quarantine/${cow.id || cow}`, cow)
        .then((res) => {
          
            
            allCowsByDB()
            return resolve(res.data)
        })
        .catch(err => console.log(err))
    });
}
    const addCow = data => {

        cows.push(data);

        localStorage.setItem('cow', JSON.stringify(cows));
        // setCows(preview => [...preview, data])

    };

    const addCowByDB = (data) => {
        return new Promise((resolve, reject) => {
        axios
            .post(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/cows`, data)
            .then(res => {
                setCows(preview => [...preview, res.data])
                console.log(res.data)
                resolve(res.data); 
            })

            .catch(err => console.log(err))
        });
    }

    const updateCow = (id, data) => {

        const index = cowsLocale.findIndex(cow => cow.id === id);

        if (index !== -1) {

            const updatedCow = { ...allCows[index], ...data };

            allCows[index] = updatedCow;


            localStorage.setItem('cow', JSON.stringify(allCows));

            setCows(allCows);
        }
    };

    const updateCowByDB = (id, data) => {
        return new Promise((resolve, reject) => {
            axios
                .put(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/cows/${id}`, data)
                .then(res => {
                    const indexUpdate = cows.findIndex(cow => cow.id === id);
                    if (indexUpdate !== -1) {
                        cows[indexUpdate] = data;
                        cows.splice(indexUpdate, 1);
                    }
                    allCowsByDB();
                    console.log(res.data);
                    resolve(res.data); 
                })
                .catch(err => {
                    console.log(err)
                    reject(new Error('Error al actualizar el registro en la base de datos'));
                });
        });
    }

    const deleteCow = id => {

        const indexDelete = cowsLocale.findIndex(cow => cow.id === id);

        if (indexDelete !== -1) {
            cows.splice(indexDelete, 1)

        }

        localStorage.setItem('cow', JSON.stringify(cows));

        console.log('delete Cow')

        allCows()
    };

  
    const deleteCowByDB = async (id) => {
        try {
          const response = await axios.delete(`https://karratha-platypus-cfrm.2.sg-1.fl0.io/cows/${id}/`);
          await allCowsByDB();
          console.log(response.data);
          return response.data;
        } catch (error) {
            console.log(error)
          throw new Error('Error al eliminar el registro en la base de datos');
        }
      };
    

    return { cows, 
        allCows, 
        allCowsByDB, 
        cowsCuarenta, 
        addCow, 
        addCowByDB, 
        updateCow, 
        updateCowByDB, 
        deleteCow, 
        deleteCowByDB, 
        loginUser, 
        setCows, 
        setCowsCuarenta,
        addCowQuarantine, deleteCowQuarantine };
}

export default useFetch