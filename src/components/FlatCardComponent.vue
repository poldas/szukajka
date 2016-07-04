<template>
    <div>
        <flat-data-table :items="mieszkania"></flat-data-table>
    </div>
</template>
<script>
import FlatDataTable from './FlatCard/FlatDataTable'
import Firebase from '../Firebase'

import config from '../config.js'
export default {
    components: {
        'flat-data-table': FlatDataTable
    },
    events: {
        'save:row': function (data) {
            this.$firebaseRefs.mieszkania.push(data)
            this.$broadcast('row-saved', data)
        },
        'update:row': function (data) {
            let newData = Object.assign({}, data)
            delete newData['.key']
            this.$firebaseRefs.mieszkania.child(data['.key']).update(newData, (e) => this.$broadcast('row-updated', newData))
        },
        'delete:row': function (data) {
            this.$firebaseRefs.mieszkania.child(data['.key']).remove()
            this.$broadcast('row-deleted', data)
        }
    },
    firebase: {
        mieszkania: Firebase.database().ref('mieszkania/')
    },
    data() {
        return {
            formField: config.formField
        }
    }
}
</script>