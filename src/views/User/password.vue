<template>
  <div class="password">
    <el-form ref="form" label-width="100px" style="font-weight:bold">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="oldPassword" placeholder="输入账号的原登陆密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="newPassword" placeholder="输入新的密码"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="rePassword">
      <el-input v-model="rePassword" placeholder="重新输入新密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="editPassword">修改密码</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>

export default {
data(){
    return{
        oldPassword:'',
        newPassword:'',
        rePassword:'',
    }
},
methods:{
  async editPassword(){
    let oldPassword=this.oldPassword
    let newPassword=this.newPassword
    let form = {oldPassword,newPassword}
    if(this.newPassword==this.rePassword){
      let result = await this.$API.reqChangePassword(form)
      if(result.code == '200'){
          this.$message({type:"success",message:"修改成功！"})
      }else {
        this.$message({type:"error",message:"修改失败！"})
      }
    }else {
        this.$message({type:"error",message:"两次密码不一致"})
      }
  }
}
}
</script>

<style lang="less" scoped>
  .password {
    box-sizing: border-box;
    width: 85%;
    height: 50vh;
    height: calc(100vh - 75px);
    background: #fff;
    box-shadow: 0 0 10px #e4e4e4;
    margin: 10px;
    padding: 20px;
    padding-top: 60px;
    min-height: 533px;
  }
</style>
