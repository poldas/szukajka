<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover table-condensed">
            <thead>
            <tr>
                <td><a href="#" @click.stop.prevent="sort('investmentCost')">Koszt inwestycji</a></td>
                <td>Suma kosztów</td>
                <td>Kwota kredytu</td>
                <td>ROI / ROE</td>
                <td>Lata zwrotu</td>
                <td><a href="#" @click.stop.prevent="sort('price')">Cena</a></td>
                <td>Cena/m2</td>
                <td>Cena/m2 po remoncie</td>
                <td>Czynsz wynajmu</td>
                <td>Pow [m<sup>2</sup>]</td>
                <td>Adres</td>
                <td>Wkład własny</td>
                <td>Remont</td>
                <td>Koszt kredytu</td>
                <td>Notariusz</td>
                <td>2% PCC</td>
                <td>kredyt + notar + pcc</td>
                <td><button v-if="!showNewRow" type="button" class="btn btn-primary" @click="showNewRow = !showNewRow">Dodaj</button></td>
            </tr>
            </thead>
            <tbody>
                <tr v-if="showNewRow" is="flat-data-row" :state="emptyRow"></tr>
                <tr is="flat-data-row" v-for="item in items| orderBy sortField order" :state="item"></tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    'use strict'
    import Config from '../../config.js'
    import FlatDataRow from './FlatDataRow'
    export default {
        props: ['items'],
        data() {
            return {
                emptyRow: Config.emptyRow,
                order: 1,
                sortField: 'investmentCost',
                showNewRow: false
            }
        },
        events: {
            'hide:row': function () {
                this.showNewRow = false
            }
        },
        methods: {
            sort(sortField) {
                this.order *= -1
                this.sortField = sortField
            }
        },
        components: {
            FlatDataRow
        }
    }
</script>
<style scoped>
    thead tr td {
        margin-bottom: 20px;
    }
    thead tr td {
        font-weight: bold;
    }
</style>