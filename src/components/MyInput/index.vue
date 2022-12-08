<template>
    <input v-bind="$attrs" :class="[size]" :value="value" @input="$emit('input', $event.target.value)"/>
</template>

<script>
    export default {
        name: "MyInput",
        //type原始input标签有，直接赋值，
        props: {
            size: {
                type: String,
                default: 'middle'
            },
            value: {}
        }
    }
</script>

<style scoped>
    input {
        /*去除默认样式*/
        background:none;
        outline:none;
        /*设置所需默认样式*/
        padding: 2px 15px;
        margin: 10px;
        border: #cccccc 1px solid;
        border-radius: 3px;
        background-color: white;
        /*设置闪烁光标样式*/
        caret-color: #666;
    }
    /*设置 placeholder的 颜色和 字体大小*/
    input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #999;
        /* placeholder字体大小 */
        font-size: 16px;
    }
    input:hover {
        border-color: #aaa;
        cursor:pointer;
    }
    /*focus权重同级的hover低*/
    input:focus {
        border-color: #66B1FF !important;
    }
    input[disabled], input[disabled]:hover{
        background-color: #F5F7FA;
        border: #cccccc 2px solid;
        cursor: url("images/forbid.png"), auto;
    }
/*    设置输入框大小*/
    .large {
        width: 200px;
        height: 38px;
        font-size: 14px;
    }
    .middle {
        width: 170px;
        height: 32px;
        font-size: 14px;
    }
    .small {
        width: 133px;
        height: 30px;
        font-size: 12px;
    }
    .mini {
        width: 110px;
        height: 26px;
        font-size: 12px;
    }
</style>
