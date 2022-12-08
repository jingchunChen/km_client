<template>
    <div class="column is-full">
        <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
        >
            <el-form-item prop="title">
                <el-input
                        v-model="ruleForm.title"
                        placeholder="话题名称"
                />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor"/>

            <!--            标签-->
            <div class="tag">
                <span style="line-height: 32px">添加话题标签：</span>
                <!--            <b-taginput-->
                <!--                v-model="ruleForm.tags"-->
                <!--                class="my-3"-->
                <!--                maxlength="15"-->
                <!--                maxtags="3"-->
                <!--                ellipsis-->
                <!--                placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"-->
                <!--            />-->
                <el-tag
                        v-model="ruleForm.tags"
                        :key="index"
                        v-for="(tag, index) in ruleForm.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

            </div>

            <el-form-item>
                <el-button
                        type="primary"
                        @click="submitForm('ruleForm')"
                >立即创建
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    export default {
        name: "CreatePost",
        data() {
            return {
                contentEditor: {},
                //用户输入内容
                ruleForm: {
                    title: '', // 标题
                    tags: [], // 标签
                    content: '' // 内容
                },
                //规则
                rules: {
                    //限制题目
                    title: [
                        {required: true, message: '请输入话题名称', trigger: 'blur'},
                        {
                            min: 1,
                            max: 25,
                            message: '长度在 1 到 25 个字符',
                            trigger: 'blur'
                        }
                    ]
                },
                //  标签
                //  输入样式
                inputVisible: false,
                //输入值
                inputValue: '',
                //图片路径
                imageUrl: "{{ url_for('.upload') }}"
            }
        },
        mounted() {
            this.contentEditor = new Vditor('vditor', {
                height: 500,
                placeholder: '请用markdown格式编辑话题内容……',
                theme: 'classic',
                counter: {
                    enable: true,
                    type: 'markdown'
                },
                preview: {
                    delay: 0,
                    hljs: {
                        style: 'monokai',
                        //显示行号
                        lineNumber: true
                    }
                },
                tab: '\t',
                //启用打字机模式
                typewriterMode: true,
                toolbarConfig: {
                    pin: true
                },
                cache: {
                    //使用 localStorage 进行缓存
                    enable: false
                },
                mode: 'sv',

            })
        },
        methods: {
            //创建
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    console.log(valid)
                    if (valid) {
                        if (
                            this.contentEditor.getValue().length === 1 ||
                            this.contentEditor.getValue() == null ||
                            this.contentEditor.getValue() === ''
                        ) {
                            this.$message({type: 'warning', message: '话题内容不可为空'})
                            return false
                        }
                        if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
                            this.$message({type: 'warning', message: '标签不可以为空'})
                            return false
                        }
                        this.ruleForm.content = this.contentEditor.getValue()
                        let result = await this.$API.reqCreatePost(this.ruleForm)
                        if (result.code == 200) {
                            const {data} = result
                            setTimeout(() => {
                                this.$router.push('/detailpost/' + data.topic.id)
                            }, 800)
                            this.$message({type: 'success', message: '发布成功！'})
                        }
                    } else {
                        this.$message({type: 'error', message: '创建失败！'})
                        return false
                    }
                })
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.contentEditor.setValue('')
                this.ruleForm.tags = []
            },
            //标签
            //关闭标签时触发事件
            handleClose(tag) {
                this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //添加输入
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.ruleForm.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style lang="less" scoped>
    .column {
        box-sizing: border-box;
        padding: 10px 100px;
        min-width: 850px;
        min-height: 100vh;
        .tag {
            margin: 10px 0;
            height: 33px;
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
