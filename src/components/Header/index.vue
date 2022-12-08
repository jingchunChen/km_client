<template>
    <div class="header">
        <div class="contain">
            <div class="left">
                <img class="logo" src="@/assets/logo.png" title="首页"/>
                <router-link to="/home" class="nav-item">首页</router-link>
                <router-link to="/mindmap" class="nav-item">思维导图</router-link>
                <router-link to="/timetree" class="nav-item">时间轴</router-link>
                <router-link to="/community" class="nav-item">交流社区</router-link>
            </div>
            <!--用户中心-->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="userInfo.avatar"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <!--跳转到用户页-->
                        <router-link to="/user" style="text-decoration: none;//去除下划线"><i class="el-icon-user"></i>个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="logout">
                        <i class="el-icon-switch-button"></i>退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
<!--        <div class="show-card">-->
<!--            <i title="下拉">-->
<!--                <svg t="1669619904766" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1759" width="25" height="25"><path d="M307.1 396.1c-14.8 15.8-14.8 41.6 0 57.3L474 630.7c14.8 15.8 39.1 15.8 54 0l167-177.3c14.8-15.8 14.8-41.6 0-57.3-14.8-15.8-39.1-15.8-54 0L501.1 544.7l-140-148.6c-14.7-15.8-39-15.8-54 0z" p-id="1760" fill="#66B1FF"></path><path d="M923.6 336.9c-22.6-53.3-54.8-101.2-96-142.3-41.1-41.1-89-73.4-142.3-96C630.1 75.2 571.5 63.4 511 63.4S391.9 75.2 336.7 98.6c-53.3 22.6-101.2 54.8-142.3 96-41.1 41.1-73.4 89-96 142.3C75 392.1 63.2 450.8 63.2 511.2S75 630.3 98.4 685.5c22.6 53.3 54.8 101.2 96 142.3 41.1 41.1 89 73.4 142.3 96C391.9 947.2 450.6 959 511 959s119.1-11.8 174.3-35.2c35.9-15.2 69.3-34.8 99.8-58.5l-0.1-0.1c9.1-7.4 14.8-18.6 14.8-31.2 0-22.3-18-40.3-40.3-40.3-9.2 0-17.7 3.1-24.5 8.3l-0.2-0.3c-62 47.9-139.7 76.4-223.9 76.4-202.3 0-366.9-164.6-366.9-366.9s164.7-366.9 367-366.9 366.9 164.6 366.9 366.9c0 66.2-17.6 128.3-48.4 182l0.4 0.2c-4.4 6.5-7 14.2-7 22.6 0 22.3 18 40.3 40.3 40.3 16 0 29.8-9.3 36.3-22.8l0.2 0.1c8.9-15.5 16.8-31.5 23.8-48.1 23.4-55.2 35.2-113.9 35.2-174.3 0.1-60.4-11.7-119.1-35.1-174.3z" p-id="1761" fill="#66B1FF"></path></svg>-->
<!--            </i>-->
<!--        </div>-->
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Header",
        mounted() {
            this.getUserInfo()
        },
        computed: {
            ...mapState('user', ['userInfo'])
        },
        methods: {
            //退出登录
            logout(){
               this.$store.dispatch('user/logout')
            },
            //获取用户信息
            async getUserInfo(){
                //获取用户信息，存储在vuex中
                // this.getUserInfo()
                await this.$store.dispatch('user/getUserInfo')
            }
        }
    }
</script>

<style scoped lang="less">
    .header {
        position: fixed;
        width: 100%;
        .contain {
            background-color: white;
            display: flex;
            justify-content: space-between;
            height: 54px;
            border-bottom: #ccc solid 1px;
            .left{
                display: flex;/*弹性容器*/
                align-items: center;/*子项在辅轴居中*/
                .logo {
                    width: 50px;
                    height: 50px;
                    margin-left: 20px;
                }
                .nav-item{
                    display: inline-block;
                    text-decoration: none;//去除下划线
                    color: #555;//设置颜色
                    width: 120px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: bold;
                }
                .nav-item:hover {
                    font-size: 20px;
                    color: #444;
                }
            }
            .user {
                margin: 5px 15px;
                width: 44px;
                height: 44px;
                border-radius: 22px;
            }

        }
        .show-card {
            position: absolute;
            display: flex;
            justify-content: center;
            width: 30px;
            height: 40px;
            border: 2px solid #66B1FF;
            border-top: none;
            top: 0;
            right: 20px;
            border-radius: 0 0 5px 5px;
            i {
                display: inline-block;
                position: absolute;
                bottom: 2px;

            }
        }
    }
    /*  解决高度塌陷问题*/
    /*.clearfix:after{*/
    /*    content: "";*/
    /*    display: block;*/
    /*    clear: both;*/
    /*}*/
    /*.clearfix{!*兼容IE6*!*/
    /*    zoom: 1;*/
    /*}*/

</style>
