import { useState } from 'react';
import axios from 'axios'; // Importa axios aquí

const useFetch = () => {
    
    const [cows, setCows] = useState([]);
    const [cowsCuarenta, setCowsCuarenta] = useState([]);
    
    //const cowsLocale = JSON.parse(localStorage.getItem('cow')) || [];
    //se desarrolló lógica para adaptarlo a local

    class QuerysDB {

        constructor(baseURL) {
            this.baseURL = baseURL;
        };

        async loginUser(data) {
            try {
                const response = await axios.get(baseURL + '/users/' + data.username, data.username)
                return response
               
            } catch (error) {
                console.log('error en peticion');
            }
        };

        async allCowsByDB() {
            try {
                const response = await axios.get(baseURL + '/cows/')
                setCows(response.data)
                this.allCowsQuarantine()
            } catch (error) {
                console.log('error en peticion')
            }
        };

        async allCowsQuarantine() {
            try {
                const response = await axios.get(baseURL + '/quarantine/')
                setCowsCuarenta(response.data)
            } catch (error) {
                console.log('error en peticion')
            }
        };

        async addCowByDB(cow) {
            try {
                await axios.post(baseURL + '/cows/', cow)
                //setCows(preview => [...preview, response.data])
                this.allCowsByDB()
                return true;
            } catch (error) {
                console.log(error)
            }
        };

        async updateCowByDB(id, cow) {
            try {
                await axios.put(baseURL + '/cows/' + id, cow)
                this.allCowsByDB();
                return true;
            } catch (error) {
                console.log(error)
            }
        };

       async deleteCowByDB (id) {
            try {
                await axios.delete(baseURL+'/cows/' + id);
                await this.allCowsByDB();
                return true;
            } catch (error) {
                throw new Error('Error al eliminar el registro en la base de datos');
            }
        };

        async addCowQuarantine(cow) {
            try {
                await axios.post(baseURL + '/quarantine/', cow)
                this.allCowsQuarantine()
                this.allCowsByDB()
            } catch (error) {
                console.log(error)
            }
        };

        async deleteCowQuarantine(cow) {
            try {
                await axios.delete(baseURL + '/quarantine/' + cow)
                this.allCowsQuarantine()
                this.allCowsByDB()
            } catch (error) {
                console.log(error)
            }
        };

    }

    const baseURL = 'https://karratha-platypus-cfrm.2.sg-1.fl0.io';

    const clientApi = new QuerysDB(baseURL);

    // class QuerysLocal {

    //     allCows = () => {

    //         setCows(cowsLocale);
    //     };

    //     addCow = data => {

    //         cows.push(data);

    //         localStorage.setItem('cow', JSON.stringify(cows));
    //     };

    //     updateCow = (id, data) => {

    //         const index = cowsLocale.findIndex(cow => cow.id === id);

    //         if (index !== -1) {

    //             const updatedCow = { ...allCows[index], ...data };

    //             allCows[index] = updatedCow;


    //             localStorage.setItem('cow', JSON.stringify(allCows));

    //             setCows(allCows);
    //         }
    //     };

    //     deleteCow = id => {

    //         const indexDelete = cowsLocale.findIndex(cow => cow.id === id);

    //         if (indexDelete !== -1) {
    //             cows.splice(indexDelete, 1)

    //         }

    //         localStorage.setItem('cow', JSON.stringify(cows));

    //         console.log('delete Cow')

    //         allCows()
    //     };
    // }


    const data = {
        cows,
        cowsCuarenta,
        clientApi
    };

    return data;
}

export default useFetch