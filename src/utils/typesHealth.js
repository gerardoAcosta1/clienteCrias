class typesHealth {

    tipos (cow){

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

    salud (cow) {

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
}
export default  typesHealth