<template>
    <ReightList :list="list" @select="hanldeList"/>
</template>

<script>
import ReightList from "./ReightList";
export default {
    components : {
        ReightList,
    },
    data(){
        return {
            list : [
                { name : "a", isSelect : false},
                { name : "b", isSelect : true, Children : [
                    { name : "b-1", isSelect : false},
                    { name : "b-2", isSelect : false, Children : [
                        { name : "b-2-1", isSelect : false},
                        { name : "b-2-2", isSelect : false},
                        { name : "b-2-3", isSelect : false},
                    ]},
                ]},
                { name : "c", isSelect : false},
                { name : "d", isSelect : false},
            ]
        }
    },
    methods : {
        hanldeList(item){
            console.log(item);
        }
    }
}
 </script>

<style>

</style>