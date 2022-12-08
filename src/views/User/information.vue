<template>
    <div class="inf">
        <div class="head">
            <div class="icons">
                <el-avatar
                        :src="userInfo.avatar"
                ></el-avatar>
            </div>
            <div style="margin-left:10px">
                <el-button size="mini" @click="dialogTableVisible = true">修改头像</el-button>
                <br>
                选择一张你喜欢的照片，上传图片大小不能超过2M。
            </div>
        </div>
        <!-- 上传头像 -->
        <el-dialog :visible.sync="dialogTableVisible" title="上传头像" width="290px">
            <el-form>
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <el-button type="primary" @click="upavatar">确定提交</el-button> -->
            </el-form>
        </el-dialog>
        <el-form ref="form" :model="form" label-width="100px" style="font-weight:bold">
            <el-form-item label="用户名:">
                <div style="color:#898989">{{form.username}}</div>
            </el-form-item>
            <el-form-item label="昵称:">
                <el-input v-model="form.alias" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input v-model="form.email" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
                <el-select v-model="form.gender" placeholder="please select your sex">
                    <el-option label="男" value="boy"></el-option>
                    <el-option label="女" value="girl"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生日:">
                <el-col :span="24">
                    <el-date-picker
                            v-model="form.birth"
                            type="date"
                            value-format="YYYY-MM-DD"
                            placeholder="Pick a date"
                            style="width: 100%"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="简介:">
                <el-input v-model="form.profile" type="textarea" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                //存储初始用户信息和用户输入数据
                form: this.$store.state.user.userInfo,
                disabled: true,
                dialogTableVisible: false,
                imageUrl: '',
            }
        },
        mounted() {
            console.log(this.form)
        },
        methods: {
            //修改用户信息
            async edit() {
                if(await this.$store.dispatch('user/edit', this.form) == 'ok'){
                    this.$message({type: "success", message: "更新成功！"})
                }else {
                    this.$message({type: "error", message: "更新失败！"})
                }
            },
            // 上传图片
            async handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
                /* eslint-disable no-undef */
                let param = new FormData() // 创建form对象
                param.append('file', file.raw) // 通过append向form对象添加数据
                console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let  headers =  {
                        'Content-Type': 'multipart/form-data'
                }
                // 需设置Content Type为multipart/form-data
                if(await this.$store.dispatch('user/uploadAvatar', param, headers) == 'ok'){
                    this.$message({type:"success",message:"上传成功!"})
                }else {
                    this.$message({type: 'error', message: '上传失败！'})
                }
            },
            // 限制图片格式和大小
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('Avatar picture must be JPG format!')
                }
                if (!isLt2M) {
                    this.$message.error('Avatar picture size can not exceed 2MB!')
                }
                return isJPG && isLt2M
            },
        },
        computed: {
            //获取最新用户头像
            ...mapState('user', ['userInfo'])
        }
    }
</script>

<style scoped lang="less">
    .inf {
        box-sizing: border-box;
        width: 85%;
        min-height: 533px;
        height: calc(100vh - 75px);
        background: #fff;
        margin: 10px;
        box-shadow: 0 0 10px #e4e4e4;
        padding: 10px;
        .head {
            width: 90%;
            margin: 20px;
            display: flex;
            .icons {
                width: 50px;
                border-right: 1px solid #e4e4e4;
            }
        }
        .avatar-uploader {
            width: 178px;
            height: 178px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
        .avatar-uploader:hover {
            border-color: #409EFF;
        }
    }




</style>
