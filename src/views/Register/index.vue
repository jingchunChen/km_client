<template>
  <div class="back">
    <div class="a">
      <div class="b">
              <div class="title">Register</div>
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
                    <el-button style="width:100%"  type="primary" @click="register">注册用户</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="text">
                <el-button size="small" @click="login" circle>
                  <svg t="1669719037498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2051" width="16" height="16"><path d="M462.266 167.466l-328.098 284.381 328.098 284.359v-191.379s454.799-147.683 362.705 311.707c0 0 293.586-557.828-368.422-519.544l5.719-169.527z" fill="#66B1FF" p-id="2052"></path></svg>
                </el-button>
              </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
        //注册
  register(){
    this.$refs['form'].validate(async (valid) => {
      if(valid){
        /*request.post('/user/register',this.form)
        .then(res => {
          if(res.code === 200){
          this.$message({type:"success",message:"注册成功"})
          this.$router.push("/login")
          }
          else{this.$message({type:"error",message:"用户名重复"})}
        })*/
        let result = await this.$API.reqRegister(this.form)
        if(result.code === 200){
          this.$message({type:"success",message:"注册成功"})
          this.$router.push("/login")
        }
        else{this.$message({type:"error",message:"用户名重复"})}
      }
    })
  },

  login(){
      this.$router.push("/login")
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
    }
</style>
