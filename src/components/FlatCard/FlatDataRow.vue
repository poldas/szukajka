<template>
    <tr :class="{success: parseFloat(roiInvestmentCost) > 15}">
        <td class="price">
            <b>{{investmentCost}}</b>
        </td>
        <td class="price">
            <b>{{sumCost}}zł</b>
        </td>
        <td class="price">
            <b>{{debtAmount}}</b>
        </td>
        <td class="wide">
           <b><small>{{roi}} / {{roiInvestmentCost}}</small></b>
        </td>
        <td  class="price">
            <b><small>{{investmentYearReturn}} / {{investmentYearReturnAll}}</small></b>
        </td>
        <td class="wide">
            <input class="form-control"
                   name="price"
                   type="number"
                   step="10000"
                   :value="state.price"
                   v-on:change="handleInputChange"
            />
        </td>
        <td  class="price">
            <b>{{pricePerMeter}}</b>
        </td>
        <td  class="price">
            <b>{{realPricePerMeter}}</b>
        </td>
        <td class="small">
            <input class="form-control"
                   name="rentPrice"
                   type="number"
                   step="50"
                   :value="state.rentPrice"
                   v-on:change="handleInputChange"
            />
        </td>
        <td class="small">
            <input class="form-control"
                   name="area"
                   type="number"
                   :value="state.area"
                   v-on:change="handleInputChange"
            />
        </td>
        <td class="wide">
            <input class="form-control"
                   name="adres.ulica"
                   type="text"
                   :value="state.adres.ulica"
                   v-on:change="handleInputChange"
            />
        </td>
        <td class="price">
            <input class="form-control"
                   name="contribution"
                   type="number"
                   step="1000"
                   :value="state.contribution"
                   v-on:change="handleInputChange"
            />
        </td>
        <td class="price">
            <input class="form-control"
                   name="overhaul"
                   type="number"
                   step="1000"
                   :value="state.overhaul"
                   v-on:change="handleInputChange"
            />
        </td>
        <td  class="price">
            <input class="form-control"
                   name="debtStartPrice"
                   type="number"
                   step="100"
                   :value="state.debtStartPrice"
                   v-on:change="handleInputChange"
            />
        </td>
        <td>
            <b>{{notariuszAmount}}</b>
        </td>
        <td>
            <b>{{pccAmount}}</b>
        </td>
        <td>
            <b>{{sumDebtNotariusz}}</b>
        </td>
        <td>
            <button type="button" class="btn btn-success" v-if="isNew" @click.prev="save">Zapisz</button>
            <button type="button" class="btn btn-link" v-if="isNew" @click.prev="hideNewRow">Ukryj</button>
            <button type="button" class="btn btn-sm btn-danger" v-else @click.prev="remove(state)">Usuń</button>
        </td>
    </tr>
</template>
<script>
    'use strict'
    import Config from '../../config.js'
    export default {
        props: ['state'],
        events: {
            'row-updated': function (data) {
                console.log('row')
            }
        },
        ready(){
        },
        computed: {
            pricePerMeter() {
                return parseFloat(this.state.price / this.state.area).toFixed(2)
            },
            realPricePerMeter() {
                let sum = parseFloat(this.state.overhaul) + parseFloat(this.state.price)
                let price = parseFloat(sum) / parseFloat(this.state.area)
                return price.toFixed(2);
            },
            debtAmount() {
                return this.state.price - this.state.contribution
            },
            notariuszAmount() {
                return parseFloat(this.state.price) * parseFloat(Config.NOTARIUSZ)
            },
            pccAmount () {
                return this.state.price * Config.PCC
            },
            sumCost () {
                return parseFloat(this.pccAmount) +
                        parseFloat(this.notariuszAmount) +
                        parseFloat(this.state.contribution) +
                        parseFloat(this.state.overhaul) +
                        parseFloat(this.state.debtStartPrice)
            },
            sumDebtNotariusz () {
                return parseFloat(this.notariuszAmount) + parseFloat(this.pccAmount) + parseFloat(this.state.debtStartPrice)
            },
            investmentCost() {
                let investmentCost = parseFloat(this.debtAmount) + parseFloat(this.sumCost);
                return investmentCost.toFixed(2)
            },
            realPricePerMeter() {
                let sum = parseFloat(this.state.overhaul) + parseFloat(this.state.price)
                let price = parseFloat(sum) / parseFloat(this.state.area)
                return price.toFixed(2);
            },
            roi() {
                let roi = (parseFloat(this.state.rentPrice * 10) / parseFloat(this.sumCost)) * 100
                return roi.toFixed(2) + '%';
            },
            investmentYearReturn() {
                let roi = (parseFloat(this.sumCost) / parseFloat(this.state.rentPrice * 10))
                return roi.toFixed(2);
            },
            investmentYearReturnAll() {
                let investmentYearReturnAll = (parseFloat(this.investmentCost) / parseFloat(this.state.rentPrice * 10))
                return investmentYearReturnAll.toFixed(2);
            },
            roiInvestmentCost() {
                let roi = (parseFloat(this.state.rentPrice * 10) / parseFloat(this.investmentCost)) * 100
                return roi.toFixed(2) + '%';
            },
            isNew() {
                return this.state['.key'] === undefined
            }
        },
        methods: {
            handleInputChange(e) {
                let target = e.target
                console.log(this.state);
                this.$set('state.' + target.name, target.value)
//                this.$set('state', {
//                    pccAmount: this.pccAmount,
//                    pricePerMeter: this.pricePerMeter
//                })
                !this.isNew ? this.update() : null
            },
            save() {
                this.$dispatch('save:row', this.state)
            },
            update() {
                this.$dispatch('update:row', this.state)
            },
            remove(e) {
                this.$dispatch('delete:row', this.state)
            },
            hideNewRow(e) {
                this.$dispatch('hide:row')
            }
        }
    }
</script>
<style scoped>
    table {
        font-size: 17px;
    }
    table tbody tr td input.form-control {
        width: 90%;
        margin: 0 1px;
        padding: 0;
        height: inherit;
        outline: none;
        background: none;
        border: none;
        text-align: center;
    }
    td.price {
        width: 75px;
    }
    td.wide {
        width: 160px;
    }
    td.wide input {
        font-size: 15px;
    }
    td.small {
        width: 65px;
    }
    td input[disabled] {
        font-weight: bold;
    }
    table tbody tr td {
        margin: 0;
        padding: 0;
        border-top: 0;
    }
</style>