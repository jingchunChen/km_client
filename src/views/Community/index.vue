<template>
    <div class="community">
        <div class="main clearfix">
            <!--      头部-->
            <div class="header">
                <div class="search">
                    <el-input type="text" v-model="input" placeholder="请输入关键词" />
                    <el-button type="primary" @click="find(input)">搜索</el-button>
                </div>
                <div class="right r">
                    <el-button class="editor" @click="jumpCreate">
                    <span>
                        <i class="el-icon-edit"></i>
                        进行帖子创作
                    </span>
                    </el-button>
                    <el-button class="announcement" type="text" @click="fetchBillBoard">
                        <i class="el-icon-message-solid" style="color: orange; font-size: 16px"></i>
                    </el-button>
                </div>
            </div>
            <!--      帖子列表-->
            <el-tabs v-model="activeName" class="posts" @tab-click="handleClick">
                <el-tab-pane label="最新" name="latest" :disabled="labelSearch">
                    <el-card v-for="(item) in articleList" :key="item.id" class="box-card">
                        <div>
                            <el-row :gutter="20" @click.native="jumpDetail(item.id)">
                                <el-col :span="2">
                                    <div class="grid-content bg-purple">
                                        <el-image
                                                class= "image"
                                                :src= "item.avatar"
                                                fit= "contain">
                                        </el-image>
                                    </div>
                                </el-col>
                                <el-col :span="21">
                                    <div class="grid-content bg-purple">
                                        <h3>{{item.title}}</h3>
                                        <div class="tags">
                                            标签：
                                            <span v-for="(item,index) in item.tags" :key="index" class="tag">
                                                {{item.name}}
                                            </span>
                                        </div>
                                        <div class="time">
                                            <span>{{item.alias}} 发布于 {{add_time(item.createTime)}} 浏览量:{{item.view}}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="最热" name="hot" :disabled="labelSearch">
                    <el-card v-for="(item,index) in articleList" :key="index" class="box-card">
                        <div>
                            <el-row :gutter="20" @click.native="jumpDetail(item.id)">
                                <el-col :span="2">
                                    <div class="grid-content bg-purple">
                                        <el-image
                                                class= "image"
                                                :src= "item.avatar"
                                                fit= "contain">
                                        </el-image>
                                    </div>
                                </el-col>
                                <el-col :span="21">
                                    <div class="grid-content bg-purple">
                                        <h3>{{item.title}}</h3>
                                        <div class="tags">
                                            标签：
                                            <span v-for="(item,index) in item.tags" :key="index" class="tag">
                                              {{item.name}}
                                            </span>
                                        </div>
                                        <div class="time">
                                            <span>{{item.alias}} 发布于 {{add_time(item.createTime)}} &nbsp;&nbsp; 浏览量:{{item.view}}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-pagination
                        style="text-align: center; margin-bottom: 10px"
                        :currentPage="page.current"
                        :page-size="page.size"
                        :page-sizes="[5,10, 20, 30, 50]"
                        v-show="page.total >= 10"
                        background
                        layout=" prev, pager, next, jumper, ->, sizes, total"
                        :total="page.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </el-tabs>
        </div>
        <!--    公告-->
        <el-dialog :visible.sync="announcement">
            <div>
                <div slot="title" class="dialog-title">{{billboard.title}}</div>
                <div class="dialog-time">发布人: {{billboard.author}} &nbsp; 发布时间: {{billboard.time}}</div>
                <div class="dialog-content">
                    {{billboard.content}}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'Community',
        components:{
        },
        data() {
            return {
                //搜索输入
                input: "",
                //公告内容
                billboard: {
                    title:'',
                    time:'',
                    author: '',
                    content: ''
                },
                //公告弹窗
                announcement: false,
                //获取帖子
                articleList: [],
                //帖子类型
                activeName : 'latest',
                //分页
                page:{
                    current: 1,
                    size: 10,
                    total: 20,
                    tab: 'latest'
                },
                //标志是否展示搜索结果
                labelSearch: false
            };
        },
        created() {
            //获取公告
            // this.fetchBillBoard()
            //获取帖子
            this.init(this.activeName,)
        },
        methods: {
            //搜索
            async find(input,pageNum,pageSize){
                if(input){
                    //获取当前页和页数，只有第一次搜索没用输入当前页和获取页数，使用默认值
                    let current = pageNum?pageNum:1;
                    let size = pageSize?pageSize:10;
                    this.labelSearch = true;
                    // request.get('/searchList',{params:{keyword:this.input,pageNum:current,pageSize:size}}).then(res=>{
                    //     console.log(res)
                    //     const { data } = res
                    //     this.page.current = data.results.current;
                    //     this.page.total = data.results.total;
                    //     this.page.size = data.results.size;
                    //     this.articleList = data.results.records;
                    // })
                    let result = await this.$API.reqGetList({keyword:this.input,pageNum:current,pageSize:size})
                    if(result.code == 200){
                        console.log(result)
                        const { data } = result
                        this.page.current = data.results.current;
                        this.page.total = data.results.total;
                        this.page.size = data.results.size;
                        this.articleList = data.results.records;
                    }
                }else{//展示非搜索内容
                    this.labelSearch = false;
                    this.init();
                }
            },
            // 公告
            async fetchBillBoard(){
                this.announcement = true
                let result = await this.$API.reqGetBillboard()
                if(result.code == 200){
                    console.log(result)
                    const { data } = result
                    this.billboard.title = data.notice.title;
                    this.billboard.time = this.add_time(data.notice.createTime)
                    this.billboard.content = data.notice.content
                    this.billboard.author = data.notice.author
                }else {
                    console.log(result.message)
                }
                this.announcement = true
            },
            //时间戳转换
            add_time(cellValue) {
                if (cellValue == null || cellValue == "") return "";
                let date = new Date(parseInt(cellValue));
                let Y = date.getFullYear() + '年';
                let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '月' : date.getMonth() + 1 + '月';
                let D = date.getDate() < 10 ? '0' + date.getDate() + '日 ' : date.getDate() + '日 ';
                // let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
                // let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
                // let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return Y + M + D;
            },
            //帖子
            async init() {
                let result = await this.$API.reqGetPostList({pageNo:this.page.current,size:this.page.size,tab:this.activeName})
                if(result.code == 200){
                    const { data } = result
                    this.page.current = data.list.current;
                    this.page.total = data.list.total;
                    this.page.size = data.list.size;
                    this.articleList = data.list.records;
                }else {
                    console.log(result.message)
                }
            },
            //帖子类型变化
            handleClick() {
                this.page.current = 1;
                this.page.size = 10;
                this.init()
            },
            //分页数目变化
            handleSizeChange(value){
                this.page.size = value
                //判断帖子类型
                if(this.labelSearch){//为搜索贴
                    this.find(this.input,this.page.current,this.page.size)
                }else{//非搜索帖
                    this.init()
                }
            },
            //当前分页变化
            handleCurrentChange(value){
                this.page.current = value
                if(this.labelSearch){//为搜索贴
                    this.find(this.input,this.page.current,this.page.size)
                }else{//非搜索帖
                    this.init()
                }
            },
            //帖子创作页面跳转
            jumpCreate(){
                this.$router.push('/createpost')
            },
            //帖子详情页面跳转
            jumpDetail(id){
                this.$router.push('/detailpost/'+id)
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

    .community{
        min-width: 1000px;
        background-color: rgb(246,246,246);
        min-height: calc(100vh - 65px);
        padding-top: 10px;
        .main{
            width: 1100px;
            margin: 0 auto;
            .header{
                padding: 20px;
                //搜索
                .search{
                    display: inline-block;
                    width: 50%;
                    .el-input{
                        width: 80%;
                    }
                    .el-button{
                        width: 20%;
                    }
                }
                .right {
                    display: inline-block;
                    //编辑帖子
                    .editor{
                        height: 40px;
                        width: 200px;
                        background-color: rgb(64, 158, 255);
                        color: #FFFFFF;
                    }
                    /*公告*/
                    .announcement{
                        width: 40px;
                        background-color: white;
                        padding: 10px;
                        border-radius: 20px;
                        border: solid 1px #409eff;
                        text-align: center;
                        color: #444;
                        font-weight: bold;
                        .icon{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .posts{
                width: 100%;
                margin: 0 auto;
                //background-color: #EEEEEE;
                .box-card{
                    margin-bottom: 10px;
                    .tags{
                        margin: 5px 0;
                        font-size:14px;
                        color:#444;
                        .tag{
                            border:0.1px solid #d9534f;
                            border-radius: 5px;
                            padding: 0 2px;
                            margin: 0 3px;
                            background-color: #fbc4c4;
                            color: #FFFFFF;
                        }
                    }
                    .time{
                        font-size: 12px;
                        color: #999999;
                    }
                }

            }
        }
        .el-dialog {
            .dialog-title{
                font-weight: bold;
                font-size: 20px;

            }
            .dialog-time{
                padding:10px 0;
                border-bottom: 1px solid #999999;
            }
            .dialog-content{
                font-size: 16px;
                line-height: 25px;
            }
        }

    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
