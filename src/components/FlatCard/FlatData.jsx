'use strict'
import React from 'react'
import {AutoAffix, Modal} from 'react-overlays'
import InputRange from 'react-input-range'
import {Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

var minValue = 0
var maxValue = 600000
var maxOverhaul = 50000
var defaultPrice = 270000
var defaultOverhaul = 3000
var defaulContribution = 57000
var PCC = 0.02
var NOTARIUSZ = 0.01

var FIELDS = {
    price: defaultPrice, // cena
    proposalPrice: defaultPrice - 10000, // cena proponowana
    rentPrice: 0, // cena wynajmu mieksznia na czysto
    sellPrice: 0, // cena sprzedaży mieszkania
    debtCharge: 0, // koszt kredytu
    debtStartPrice: 0, // koszt uruchomienia kredytu
    area: 30, // powierzchnia
    contribution: defaulContribution, // wkład włąsny
    overhaul: defaultOverhaul, //remont, naprawa
    adres: {}, // adres
    url: '' // adres www ogłoszenia
}

class FlatData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            price: defaultPrice, // cena
            proposalPrice: defaultPrice - 10000, // cena proponowana
            rentPrice: 2000, // cena wynajmu mieksznia na czysto
            sellPrice: 0, // cena sprzedaży mieszkania
            debtCharge: 0, // koszt kredytu
            debtStartPrice: 0, // koszt uruchomienia kredytu
            area: 65.5, // powierzchnia
            contribution: defaulContribution, // wkład włąsny
            overhaul: defaultOverhaul, //remont, naprawa
            adres: {}, // adres
            url: '', // adres www ogłoszenia
            roi: 0
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(e) {
        let target = e.target
        let newState = {}
        newState[target.name] = target.value
        this.setState(newState)
    }

    getPricePerMeter() {
        var pricePerMeter = parseFloat(this.state.price) / parseFloat(this.state.area)
        return pricePerMeter.toFixed(2)
    }

    getDebtAmount() {
        return this.state.price - this.state.contribution
    }

    getNotariuszAMount() {
        return this.state.price * NOTARIUSZ
    }

    getPccAmount() {
        return this.state.price * PCC
    }

    getSumCost() {
        return parseFloat(this.getPccAmount()) +
            parseFloat(this.getNotariuszAMount()) +
            parseFloat(this.state.contribution) +
            parseFloat(this.state.overhaul) +
            parseFloat(this.state.debtStartPrice)
    }

    getSumDebtNotariusz() {
        return parseFloat(this.getNotariuszAMount()) + parseFloat(this.getPccAmount()) + parseFloat(this.state.debtStartPrice)
    }

    getRoi() {
        let roi = (parseFloat(this.state.rentPrice * 10) / parseFloat(this.getSumCost())) * 100
        return roi.toFixed(2) + '%';
    }

    getRoiInvestmentCost() {
        let roi = (parseFloat(this.state.rentPrice * 10) / parseFloat(this.getInvestmentCost())) * 100
        return roi.toFixed(2) + '%';
    }

    getInvestmentYearReturn() {
        let roi = (parseFloat(this.getSumCost()) / parseFloat(this.state.rentPrice * 10))
        return roi.toFixed(2);
    }

    getInvestmentCost() {
        return parseFloat(this.getDebtAmount()) + parseFloat(this.getSumCost())
    }

    getRealPricePerMEter() {
        let sum = parseFloat(this.state.overhaul) + parseFloat(this.state.price)
        let price = parseFloat(sum) / parseFloat(this.state.area)
        return price.toFixed(2);
    }

    render2() {
        return (
            <Form>
                <div className="col-sm-4">
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Cena</ControlLabel>
                        <FormControl
                            name="price"
                            type="text"
                            value={this.state.price}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Wkład własny</ControlLabel>
                        <FormControl
                            name="contribution"
                            type="text"
                            value={this.state.contribution}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                </div>
            </Form>
        )
    }

    render() {
        return (
            <Form>
                <div className="col-sm-3">
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Koszt inwestycji</ControlLabel>
                        <FormControl
                            name="investmentCost"
                            type="text"
                            value={this.getInvestmentCost()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Suma kosztów</ControlLabel>
                        <FormControl
                            name="sumCost"
                            type="text"
                            value={this.getSumCost()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">ROI</ControlLabel>
                        <FormControl
                            name="roi"
                            type="text"
                            value={this.getRoi()}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">ROI koszta</ControlLabel>
                        <FormControl
                            name="roiInvestmentCost"
                            type="text"
                            value={this.getRoiInvestmentCost()}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Lata zwrotu</ControlLabel>
                        <FormControl
                            name="investmentYearReturn"
                            type="text"
                            value={this.getInvestmentYearReturn()}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                </div>
                <div className="col-sm-3">
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label">Cena</ControlLabel>
                        <FormControl
                            name="price"
                            type="text"
                            value={this.state.price}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label">Cena/m<sup>2</sup></ControlLabel>
                        <FormControl
                            name="pricePerMeter"
                            type="text"
                            value={this.getPricePerMeter()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label">Cena/m<sup>2</sup> po
                            remoncie</ControlLabel>
                        <FormControl
                            name="realPricePerMEter"
                            type="text"
                            value={this.getRealPricePerMEter()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label">Powierzchnia</ControlLabel>
                        <FormControl
                            name="area"
                            type="text"
                            value={this.state.area}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label">Adres</ControlLabel>
                        <FormControl
                            name="adres.ulica"
                            type="text"
                            value={this.state.adres.ulica}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                </div>
                <div className="col-sm-3">
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Czynsz wynajmu</ControlLabel>
                        <FormControl
                            name="rentPrice"
                            type="text"
                            value={this.state.rentPrice}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Wkład własny</ControlLabel>
                        <FormControl
                            name="contribution"
                            type="text"
                            value={this.state.contribution}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Remont</ControlLabel>
                        <FormControl
                            name="overhaul"
                            type="text"
                            value={this.state.overhaul}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                </div>
                <div className="col-sm-3">
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Uruchomienie kredytu</ControlLabel>
                        <FormControl
                            name="debtStartPrice"
                            type="text"
                            value={this.state.debtStartPrice}
                            onChange={this.handleInputChange}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Kwota kredytu</ControlLabel>
                        <FormControl
                            name="debtAmount"
                            type="text"
                            value={this.getDebtAmount()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Notariusz</ControlLabel>
                        <FormControl
                            name="notariusz"
                            type="text"
                            value={this.getNotariuszAMount()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">2% PCC</ControlLabel>
                        <FormControl
                            name="pcc"
                            type="text"
                            value={this.getPccAmount()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicText" className="row">
                        <ControlLabel className="form-control-label col-sm-4">Koszta okołotranzakcyjne</ControlLabel>
                        <FormControl
                            name="sumDebtNotariusz"
                            type="text"
                            value={this.getSumDebtNotariusz()}
                            disabled={true}
                            className="col-xs-1"
                        />
                    </FormGroup>
                </div>
            </Form>
        )
    }
}

export default FlatData