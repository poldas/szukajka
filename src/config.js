let defaultPrice = 270000
let defaultOverhaul = 3000
let defaulContribution = 57000;
let PCC = 0.02
let NOTARIUSZ = 0.01

let FIELDS = {
    price: defaultPrice, // cena
    proposalPrice: defaultPrice - 10000, // cena proponowana
    rentPrice: 2000, // cena wynajmu mieksznia na czysto
    sellPrice: 0, // cena sprzedaży mieszkania
    debtCharge: 0, // koszt kredytu
    debtStartPrice: 0, // koszt uruchomienia kredytu
    area: 30, // powierzchnia
    contribution: defaulContribution, // wkład włąsny
    overhaul: defaultOverhaul, //remont, naprawa
    adres: {
        ulica: ''
    }, // adres
    url: '' // adres www ogłoszenia
}
export default {
    NOTARIUSZ,
    PCC,
    emptyRow: FIELDS,
    formField: [
        {
            name: 'investmentCost',
            label: 'Koszta inwestycji',
            type: "text",
            valueFunction: "getInvestmentCost",
            defaultValue: 0,
            options: {
                disabled: true
            }
        },
        {
            name: 'sumCost',
            label: 'Suma kosztów',
            type: "text",
            defaultValue: 0,
            valueFunction: "getSumCost",
            options: {
                disabled: true
            }
        },
        {
            name: 'roi',
            label: 'ROI',
            type: "text",
            defaultValue: 0,
            valueFunction: "getRoi",
            options: {
                disabled: true
            }
        },
        {
            name: 'roiInvestmentCost',
            label: 'ROI całkowite',
            type: "text",
            defaultValue: 0,
            valueFunction: "getRoiInvestmentCost",
            options: {
                disabled: true
            }
        },
        {
            name: 'price',
            label: 'Cena',
            type: "text",
            defaultValue: 200000,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'pricePerMeter',
            label: 'Cena/m2',
            type: "text",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        },
        {
            name: 'realPricePerMeter',
            label: 'Cena/m2 cała',
            type: "text",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        },
        {
            name: 'rentPrice',
            label: 'Czynsz',
            type: "number",
            defaultValue: 2000,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'area',
            label: 'Pow',
            type: "number",
            defaultValue: 35,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'adres.ulica',
            label: 'Ulica',
            type: "text",
            defaultValue: "",
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'contribution',
            label: 'Wkład własny',
            type: "number",
            defaultValue: 15000,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'overhaul',
            label: 'Remont / Wyposażenie',
            type: "number",
            defaultValue: 15000,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'debtStartPrice',
            label: 'koszt kredytu',
            type: "number",
            defaultValue: 3000,
            valueFunction: "",
            options: {
                disabled: false
            }
        },
        {
            name: 'notariuszAmount',
            label: 'Notariusz',
            type: "number",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        },
        {
            name: 'pcc',
            label: '2%PCC',
            type: "number",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        },
        {
            name: 'sumDebtNotariusz',
            label: 'Koszta okołotranzakcyjne',
            type: "number",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        },
        {
            name: 'investmentYearReturn',
            label: 'Lata zwrotu',
            type: "number",
            defaultValue: 0,
            valueFunction: "",
            options: {
                disabled: true
            }
        }
    ]
}