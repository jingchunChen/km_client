<template>
    <div class="container">
        <!--文章详情-->
        <el-card
                class="content"
                shadow="never"
        >
            <!--  头部  -->
            <div class="head">
                <p class="title">{{ topic.title }}</p>
                <div class="info">
        <span>
          {{
            dayjs(topic.createTime).format('YYYY/MM/DD HH:mm:ss')
          }}
        </span>
                    <el-divider direction="vertical" />
                    <span>
          发布者：{{ topicUser.username}}
        </span>
                    <el-divider direction="vertical" />
                    <span>查看：{{ topic.view }}</span>
                </div>
            </div>

            <!--Markdown-->
            <div id="preview" />

            <!--标签-->
            <el-divider></el-divider>
            <div class="below clearfix">
                <div class="l">
                    <span v-for="(tag, index) in tags" :key="index">
                      <el-tag type="success" class="tag">
                        {{ "#" + tag.name }}
                      </el-tag>
                    </span>
                </div>
                <div
                    v-if="username ==  topicUser.username"
                    class="r">
                    <el-button size="small" type="primary" @click="jumpEdit(topic.id)">编辑</el-button>
                    <el-button size="small" @click="handleDelete(topic.id)" type="primary">删除</el-button>
                </div>
            </div>
        </el-card>
        <!-- 评论 -->
        <el-card
                class="comment_content"
                shadow="never"
        >
            <h3>评论</h3>
            <!-- 添加评论   -->
            <div class="inputComment">
                <el-input
                        v-model="commentText"
                        type="textarea"
                        :rows="2"
                        maxlength="400"
                        placeholder="输入评论……"
                        :disabled="isLoading"
                        class="comment_input"
                ></el-input>
                <el-button
                        type="primary"
                        @click="Submit"
                        :disabled="isLoading"
                        class="comment_btn"

                >
                    添加
                </el-button>
            </div>
            <!--展示评论-->
            <div class="percommemt" v-for="comment in comments" :key="comment.id">
                <!--内容-->
                <el-row :gutter="15">
                    <el-col :span="2">
                        <!--头像-->
                        <el-image
                                class= "image"
                                :src= "comment.avatar"
                                fit= "contain">
                        </el-image>
                    </el-col>
                    <el-col :span="16">
                        <strong class="username">{{ comment.username }}</strong>
                        <p class="comment">{{ comment.content }}</p>
                        <span class="time">发布时间：{{ format(comment.createTime, "yyyy-MM-dd HH:mm:ss") }}</span>
                    </el-col>
                </el-row>
                <!--分割线-->
                <el-divider style="margin: 10px"></el-divider>
            </div>
        </el-card>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'
    import { format } from "date-fns";

    export default {
        name: "DetailPost",
        computed: {
        },
        data() {
            return {
                //文章内容
                topic: {
                    content: '',
                    id: this.$route.params.id
                },
                //标签
                tags: [],
                //帖子用户信息
                topicUser: {},
                //时间处理
                dayjs: dayjs,
                //当前用户名
                username: this.$store.state.user.userInfo.username,
                //帖子评论
                comments: [],
                //用户输入的评论
                commentText: '',
                //
                isLoading: false,
                //将时间戳转换成日期
                format: format
            }
        },
        mounted() {
            //初始化,获取帖子
            this.fetchTopic()
            //获取评论
            this.getComments()
        },
        methods: {
            renderMarkdown(md) {
                Vditor.preview(document.getElementById('preview'), md, {
                    hljs: { style: 'github' }
                })
            },
            // 初始化，获取帖子详细信息
            async fetchTopic() {
                let result = await this.$API.reqGetPost({id: this.$route.params.id})
                if(result.code == 200){
                    const { data } = result
                    // console.log(response)
                    document.title = data.topic.title
                    this.topic = data.topic
                    this.tags = data.tags
                    this.topicUser = data.user
                    // this.comments = data.comments
                    this.renderMarkdown(this.topic.content)
                }else {
                    console.log(result.message)
                }
            },
            //删除帖子
            async handleDelete(id) {
                let result = await this.$API.reqDeletePost(id)
                const { code, msg } = result
                this.$message({type:"success",message: msg})
                if(code == 200){
                    setTimeout(() => {
                        this.$router.push({ path: '/community' })
                    }, 500)
                }
            },
            //  跳转到编辑页面
            jumpEdit(id){
                this.$router.push('/editpost/'+id)
            },
            //  获取评论
            async getComments(){
                let result = await this.$API.reqComments({topicid: this.topic.id})
                if(result.code == 200){
                    const { data } = result
                    this.comments = data.comment
                    // console.log(this.comments[0])
                }else {
                    console.log(result)
                }
            },
            //获取用户提交的评论
            async Submit(){
                this.isLoading = true
                try {
                    let postData = {}
                    console.log(this.commentText)
                    //内容
                    postData['content'] = this.commentText
                    //帖子id
                    postData['topic_id'] = this.topic.id
                    console.log(postData)
                    let result = await this.$API.reqAddComments(postData)
                    if(result.code == 200){
                        this.$message.success('留言成功！')
                        //清空用户评论输入内容
                        this.commentText = "";
                        //再次获取评论
                        this.getComments()
                    }else {
                        this.$message.error('留言失败！')
                        console.log(result)
                    }
                } catch (e) {
                    // this.$buefy.toast.open({
                    //   message: `Cannot comment this story. ${e}`,
                    //   type: 'is-danger'
                    // })
                } finally {
                    this.isLoading = false
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .l{
        float: left;
    }
    .r{
        float: right;
    }
    .container{
        box-sizing: border-box;
        min-width: 1000px;
        background-color: rgb(246,246,246);
        padding-top: 10px;
    }
    //文章
    .content{
        width: 75%;
        min-width: 600px;
        margin: 10px auto;
        padding: 0 10px;
        border-width: 0;
        .head{
            text-align: center;
            .title{
                font-size: 25px;
                font-weight: bold;
                margin: 10px 0;
            }
            .info{
                color: #999;
                font-size: 12px;
            }
        }
        .below{
            //display: flex;
            .tag{
                margin: 0 5px;
            }
        }
    }
    //评论
    .comment_content{
        width: 75%;
        min-width: 600px;
        margin: 10px auto;
        padding: 0 10px;
        border-width: 0;
        .inputComment{
            margin: 15px 0;
            display: inline-block;
            width: 100%;
            .comment_input{
                width: 88%;
            }
            .comment_btn{
                width: 11%;
                margin-left:1%;
                padding: 18px 0;
            }
        }
        .percommemt{
            .username{
                font-size: 15px;
                color: #7f8c8d;
            }
            .comment{
                margin: 5px 0;
            }
            .time{
                font-size: 12px;
                color: #999999;
            }
        }
    }

    // 清楚浮动，给父元素添加
    .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
</style>
