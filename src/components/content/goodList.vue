<template>
    <div class="goods">
        <goodListItem v-for='(item,index) in good' :key="index" :good-item = "item"></goodListItem>
    </div>
</template>

<script>
    import goodListItem from './goodListItem'
    export default {
        components:{
            goodListItem
        },

        props:{
            good:{
                type:Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

