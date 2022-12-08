<template>
    <div class="back">
        <!-- 侧边栏 -->
        <div class="aside">
            <el-menu
                    router
                    :default-active="path"
                    class="el-menu-vertical-demo">
                <el-menu-item index="/user/userinfo">
                    <el-icon><icon-menu /></el-icon>
                    <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="/user/password">
                    <el-icon><icon-menu /></el-icon>
                    <span>修改密码</span>
                </el-menu-item>
            </el-menu>
        </div>
        <router-view class="contain"></router-view>
    </div>
</template>

<script>
    export default {
        name:'User',
        computed: {
            path(){
                return this.$route.fullPath
            }
        }
    }
</script>

<style lang="less" scoped>
    .back{
        display: flex;
        background:#F7F7F7;
        width:100%;
        height:100%;
        .aside{
            width: 200px;
            font-weight:bold;
            background-color: white;
            /*padding-bottom: 9000px;*/
            /*margin-bottom: -9000px;*/
        }
        .contain {
            /*padding-bottom: 9999px;*/
            /*margin-bottom: -9999px;*/
        }
    }

</style>
