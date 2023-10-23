class CleanParse {

    constructor(id, cows, cowsCuarenta) {
        this.cowUpdate = cows?.find(cow => cow.id == id)
        this.cowQ = cowsCuarenta?.find(cow => cow.id == id)
    }

    update(reset) {
        const source = this.cowQ || this.cowUpdate || null;
        const resetValues = {
            peso: parseInt(source?.peso) || null,
            musculo: parseInt(source?.musculo) || null,
            marmoleo: parseInt(source?.marmoleo) || null,
            temp: parseFloat(source?.temp) || null,
            fc: parseInt(source?.fc) || null,
            fr: parseInt(source?.fr) || null,
            fs: parseInt(source?.fs) || null
        };
        reset(resetValues);
    }
    reset(reset) {
        reset({
            peso: 0,
            musculo: 0,
            marmoleo: 0,
        });
    }
    parser(data) {
        const parseData = {
            peso: parseInt(data.peso),
            musculo: parseInt(data.musculo),
            marmoleo: parseInt(data.marmoleo),
            temp: parseFloat(data.temp),
            fc: parseInt(data.fc),
            fr: parseInt(data.fr),
            fs: parseInt(data.fs)
        }
        const parseData2 = {
            peso: parseInt(data.peso),
            musculo: parseInt(data.musculo),
            marmoleo: parseInt(data.marmoleo),
            temp: null,
            fc: null,
            fr: null,
            fs: null
        }
        return { parseData, parseData2 }
    }
}

export default CleanParse