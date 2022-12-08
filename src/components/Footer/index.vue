<template>
    <div class="footer">
        <div class="helpLink">
            <ul>
                <li><a href="#">关于我们</a></li>-
                <li><a href="#">联系我们</a></li>-
                <li><a href="#">免责声明</a></li>-
                <li><a href="#">网站地图</a></li>-
                <li><a href="#">投诉建议</a></li>
            </ul>

        </div>
        <p>
            ©CopyRight 2006-2022 JB51.Net Inc All Rights Reserved. 知识图谱 版权所有
        </p>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="less">
.footer {
    box-sizing: border-box;
    height: 80px;
    width: 100%;
    background-color: #313131;
    color: #cccccc;
    font-size: 14px;
    text-align: center;
    padding: 10px;
    li {
        display: inline-block;
        margin: 0 5px;
        font-size: 16px;
        margin: 5px 0;
        a {
            text-decoration: none;
            color: #cccccc;
        }
    }

}
</style>
