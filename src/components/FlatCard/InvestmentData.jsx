import React from 'react';
class InvestmentData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            price: 0, // cena
            proposalPrice: 0, // cena proponowana
            rentPrice: 0, // cena wynajmu mieksznia na czysto
            sellPrice: 0, // cena sprzedaży mieszkania
            debtCharge: 0, // koszt kredytu
            area: 0, // powierzchnia
            contribution: 0, // wkład włąsny
            overhaul: 0, //remont, naprawa
            street: '', // ulica
            url: '' // adres www ogłoszenia
        };
    }

    render() {
        return (
            <div className="row">
                dsddsdsdsdd
            </div>
        )
    }

}

export default InvestmentData;