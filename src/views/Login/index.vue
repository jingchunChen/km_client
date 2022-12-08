<template>
    <div class="back">
        <div class="a">
            <div class="b">
                <div class="title">Login</div>
                <div class="form">
                    <el-form  ref="form" :model="form" size="normal" :rules="rules">
                        <el-form-item prop="username">
                            <el-input v-model="form.username" placeholder="USER NAME" @keyup.enter.native="login">
                                <template #prefix>
                                    <el-icon class="el-input__icon"><avatar/></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="form.password" placeholder="PASSWORD" @keyup.enter.native="login" show-password>
                                <template #prefix>
                                    <el-icon class="el-input__icon"><Lock/></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button style="width:100%"  type="primary" @click="login">登陆</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="text">
                    首次使用,
                    <router-link :to="{path:'/register'}">前往注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form:{},
                rules:{
                    username:[{required:true,message:"请输入用户名",trigger:'blur'}],
                    password:[{required:true,message:"请输入密码",trigger:'blur'}]
                },
            }
        },
        methods:{
            //登陆
            login(){
                this.$refs['form'].validate(async (valid) => {
                    if(valid){
                        try {
                            await this.$store.dispatch('user/login', this.form)
                            //页面跳转
                            this.$router.push("/home")
                        }catch (e) {
                            alert(e)
                        }

                    }
                })
            },
            register(){
                this.$router.push("/register")
            }

        }
    }
</script>

<style lang="less" scoped>
    .back{
        /* 设置背景渐变 */
        background-image: linear-gradient(to left, #9c88ff, #3cadeb);
        height: 100vh;
        display: flex;
        justify-content: center;
    }
    .title{
        font-size: 35px;
        margin-top: 15px;
        color: #424368;
        text-align: center;
    }

    .a{
        width: 450px;
        height: 350px;
        background: #fff;
        border-radius: 10px;
        margin:auto;
    }
    .b{
        margin-top:30px;
    }
    .form{
        width: 80%;
        margin: auto;
        margin-top: 20px;
    }

    .text{
        margin-right: 50px;
        float:right;
        font-size: 13px;

    }
    // 去掉router-link下划线
    a {
        text-decoration: none;
    }
</style>
