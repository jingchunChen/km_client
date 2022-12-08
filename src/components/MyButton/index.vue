<template>
    <!--将父组件传递的属性和事件绑定给button-->
    <button class="button"
            :class="[size, type]"
            v-on="$listeners"
            v-bind="$attrs"
    >
        <!--将父组件写在子组件之间的内容插入-->
        <slot/>
    </button>
</template>

<script>
    export default {
        name: "MyButton",
        props: {
            size: {
                type: String,
                default: 'small'
            },
            type: {
                type: String,
                default: 'default'
            }
        }
    }
</script>

<style scoped lang="less">
    .button {
        margin: 10px 5px;
        border-radius: 4px;
        /*去除按钮默认样式*/
        border: none;
    }
    /*配置按钮大小*/
    .large {
        width: 100px;
        height: 42px;
        font-size: 14px;
    }
    .middle {
        width: 100px;
        height: 35px;
        font-size: 14px;
    }
    .small {
        width: 80px;
        height: 32px;
        font-size: 12px;
    }
    .mini {
        width: 60px;
        height: 32px;
        font-size: 12px;
    }
    /*配置按钮类型*/
    .default {
        border:solid 2px #ccc;
        background-color: white;
        color: #606266;
    }
    .default:hover {
        border:solid 2px #B3D8FF;
        background-color: #ECF5FF;
        color: #409EFF;
    }
    .primary {
        background: #409EFF;
        color: #fff;
    }
    .primary:hover {
        background-color: #66B1FF;
    }
    .success {
        color: #fff;
        background: #67C23A;
    }
    .success:hover {
        background-color: #85CE61;
    }
    .info {
        background: #909399;
        color: #fff;
    }
    .info:hover {
        background-color: #A6A9AD;
    }
    .warning {
        background: #E6A23C;
        color: #fff;
    }
    .warning:hover {
        background-color: #EBB563;
    }
    .danger {
        background: #F56C6C;
        color: #fff;
    }
    .danger:hover {
        background-color: #F78989;
    }
    /*配置按钮不可使用的样式：鼠标禁止标志, 设置:hover可以覆盖之前设置的hover样式*/
    button[disabled], button[disabled]:hover //disadled:后台不可接收此input传值
    {
        background:#dddddd; //为带有disabled的input框添加背景颜色
        cursor: url("images/forbid.png"),auto;
        /*pointer-events:none;//该元素永远不会成为鼠标事件的 target*/
    }
</style>
