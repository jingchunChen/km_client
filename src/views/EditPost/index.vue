<template>
    <div class="column">
        <el-form :model="topic" ref="topic" class="demo-topic">
            <el-form-item prop="title">
                <el-input
                        v-model="topic.title"
                        placeholder="输入新的主题名称"
                ></el-input>
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <div class="tag">
                            <span v-for="(tag, index) in tags" :key="index">
                              <el-tag type="success" class="tag">
                                {{ "#" + tag }}
                              </el-tag>
                            </span>
            </div>

            <el-form-item class="mt-3">
                <el-button type="primary" @click="handleUpdate">更新</el-button>
                <el-button @click="resetForm('topic')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vditor from "vditor";
    import "vditor/dist/index.css";

    export default {
        name: "EditPost",
        components: {},
        data() {
            return {
                topic: {},
                tags: [],
                //  标签
                //  输入样式
                inputVisible: false,
                //输入值
                inputValue: '',
            };
        },
        mounted() {
            this.fetchTopic();
        },
        methods: {
            renderMarkdown(md) {
                this.contentEditor = new Vditor("vditor", {
                    height: 460,
                    placeholder: "输入要更新的内容",
                    preview: {
                        hljs: {style: "monokai"},
                    },
                    mode: "sv",
                    after: () => {
                        this.contentEditor.setValue(md);
                    },
                });
            },
            //获取帖子详情
            async fetchTopic() {
                let result = await this.$API.reqGetPost({id: this.$route.params.id})
                if (result.code == 200) {
                    this.topic = result.data.topic;
                    this.tags = result.data.tags.map(tag => tag.name);
                    // console.log(this.topic.content)
                    this.renderMarkdown(this.topic.content);
                } else {
                    console.log(result.message)
                }
            },
            //更新帖子
            async handleUpdate() {
                //需要判断是否为空
                //标题
                if (!this.topic.title) {
                    this.$message({type: 'warning', message: '标题不可为空'})
                    return false
                }
                //内容
                if (
                    this.contentEditor.getValue().length === 1 ||
                    this.contentEditor.getValue() == null ||
                    this.contentEditor.getValue() === ''
                ) {
                    this.$message({type: 'warning', message: '话题内容不可为空'})
                    return false
                }
                //标签
                if (this.tags == null || this.tags.length === 0) {
                    this.$message({type: 'warning', message: '标签不可以为空'})
                    return false
                }

                this.topic.content = this.contentEditor.getValue();
                let result = await this.$API.reqUpdatePost(this.topic)
                if (result.code == 200) {
                    const {data} = result;
                    setTimeout(() => {
                        this.$router.push('/detailpost/' + data.post.id)
                    }, 800);
                } else {
                    this.$message({type: 'error', message: '更新失败！'})
                }
            },
            //重置帖子
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.contentEditor.setValue("");
            },
            //标签
            /*//关闭标签时触发事件
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加输入
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }*/
        }
    }
</script>

<style lang="less" scoped>
    .vditor-reset pre > code {
        font-size: 100%;
    }
    .column {
        box-sizing: border-box;
        min-width: 850px;
        min-height: 100vh;
        padding: 10px 100px;
        .tag {
            margin: 5px 5px;
            .el-tag + .el-tag {
                margin-left: 10px;
            }

            .button-new-tag {
                margin-left: 10px;
                height: 32px;
                line-height: 30px;
                padding-top: 0;
                padding-bottom: 0;
            }

            .input-new-tag {
                width: 90px;
                margin-left: 10px;
                vertical-align: bottom;
            }
        }
    }


</style>
