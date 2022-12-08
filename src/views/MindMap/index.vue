<template>
    <div class="jsmind_layout">
        <div class="jsmind_toolbar" v-if="showBar">
            <el-upload
                    :multiple="false"
                    ref="upload"
                    action="action"
                    :before-upload="beforeUpload"
                    :http-request="upload">
                <el-button type="primary" size="small">导入</el-button>
            </el-upload>
            <el-button @click="save_nodearray_file" size="small">本地存储</el-button>
            <el-button @click="saveFile" size="small">后台存储</el-button>
            <el-button @click="screen_shot" size="small">下载导图</el-button>
            <!--无-->
            <!--      <el-upload
                      :multiple="false"
                      ref="upload"
                      action="action"
                      :before-upload="add_image_node"
                      :http-request="upload">
                    <el-button size="small">添加图片节点</el-button>
                  </el-upload>
                  <el-button @click="get_nodearray_data" size="medium">获取数据</el-button>
                  <el-button @click="addNode" size="medium">新增节点</el-button>
                  <el-button @click="addBrotherNode" size="medium">新增兄弟节点</el-button>
                  <el-button @click="editNode" size="medium">编辑节点</el-button>
                  <el-button @click="removeNode" size="medium">删除节点</el-button>-->
            <span> 展开:</span>
            <el-select v-model="level" placeholder="展开节点" @change="expand_to_level" size="small">
                <el-option
                        v-for="item in nodeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
            <!--无-->
             <!--     <span>主题：</span>
                  <el-select v-model="localTheme" placeholder="选择主题" @change="set_theme" size="small">
                    <el-option
                        v-for="item in themeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>-->
            <span>导图:</span>
            <el-select v-model="value" class="m-2" placeholder="Select" @change="set_demo" size="small">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                />
            </el-select>
            <router-link target="_blank" :to="{path:'/book'}" underline>课本书籍</router-link>
        </div>
        <div id="jsmind_container">
            <div class="zoom_in_out">
                <span>
                    <i class="zoom-icon el-icon-plus" @click="zoomIn" :class="isZoomIn === true ? 'disabled' : ''">
                        <el-icon><plus/></el-icon>
                    </i>
                </span>
                <span>
                    <i class="zoom-icon el-icon-minus" @click="zoomOut" :class="isZoomOut === true ? 'disabled' : ''">
                        <el-icon><minus/></el-icon>
                    </i>
                </span>
            </div>
        </div>
        <!--有-->
        <el-drawer
                title="编辑节点"
                :visible.sync="dialogVisible"
                size="500px">
            <el-form label-width="80px" class="form-con">
                <el-form-item label="字体大小">
                    <el-input-number controls-position="right" v-model.number="nodeOption.fontSize" class="ele-width" :min="1" :max="30" maxLength="2"></el-input-number>
                </el-form-item>
                <el-form-item label="字体粗细">
                    <el-select v-model="nodeOption.fontWeight" class="ele-width">
                        <el-option value="normal" label="常规"></el-option>
                        <el-option value="bold" label="粗体"></el-option>
                        <el-option value="bolder" label="更粗"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体样式">
                    <el-select v-model="nodeOption.fontStyle" class="ele-width">
                        <el-option value="normal" label="标准"></el-option>
                        <el-option value="italic" label="斜体"></el-option>
                        <el-option value="oblique" label="倾斜"></el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="nodeOption.bgColor" show-alpha size="mini"></el-color-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="字体颜色">
                            <el-color-picker v-model="nodeOption.fontColor" show-alpha size="mini"></el-color-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="节点内容">
                    <el-input type="textarea" :rows="2" v-model="nodeOption.content" class="ele-width" maxLength="64"></el-input>
                </el-form-item>
            </el-form>
            <template v-slot:footer>
                <div class="right mr-10">
                    <el-button type="primary" class="common-btn" @click="sureEditNode" size="medium">确 定</el-button>
                </div>
            </template>
        </el-drawer>
        <div style="display:none">
            <input class="file" type="file" id="image-chooser" accept="image/*"/>
        </div>
    </div>
</template>

<script>
    import 'jsmind/style/jsmind.css'
    import jsMind from 'jsmind/js/jsmind.js'
    window.jsMind = jsMind

    require('jsmind/js/jsmind.draggable-node')
    require('jsmind/js/jsmind.screenshot.js')
    export default {
        name: "MindMap",
        props: {
            showBar: { // 是否显示工具栏，显示启用编辑
                type: Boolean,
                default: true
            },
            isEdit: { // 是否启用编辑，启用编辑可以显示右键功能
                type: Boolean,
                default: true
            },
            theme: { // 主题
                type: String,
                default: 'info'
            },
            lineColor: { // 线条颜色
                type: String,
                default: 'skyblue'
            }
        },
        data() {
            return {
                mindMap: true,
                i: 0,
                mind: {},
                jm: null,
                isZoomIn: false,
                isZoomOut: false,
                level: 0,
                imageChooser:null,
                nodeOptions: [
                    { value: 1, label: '展开到一级节点' },
                    { value: 2, label: '展开到二级节点' },
                    { value: 3, label: '展开到三级节点' },
                    { value: 0, label: '展开全部节点' },
                    { value: -1, label: '隐藏全部节点' }
                ],
                themeOptions: [
                    { value: 'default', label: 'default' },
                    { value: 'primary', label: 'primary' },
                    { value: 'warning', label: 'warning' },
                    { value: 'danger', label: 'danger' },
                    { value: 'success', label: 'success' },
                    { value: 'info', label: 'info' },
                    { value: 'greensea', label: 'greensea' },
                    { value: 'nephrite', label: 'nephrite' },
                    { value: 'belizehole', label: 'belizehole' },
                    { value: 'wisteria', label: 'wisteria' },
                    { value: 'asphalt', label: 'asphalt' },
                    { value: 'orange', label: 'orange' },
                    { value: 'pumpkin', label: 'pumpkin' },
                    { value: 'pomegranate', label: 'pomegranate' },
                    { value: 'clouds', label: 'clouds' },
                    { value: 'asbestos', label: 'asbestos' }
                ],
                localTheme: this.theme,
                dialogVisible: false,
                nodeOption: {
                    content: '',
                    bgColor: '',
                    fontColor: '',
                    fontSize: '',
                    fontWeight: '',
                    fontStyle: ''
                },
                value : 'User',
                valuePre: 'User',
                change: 0,
                options : [
                    {
                        value: 'User',
                        label: '用户思维导图(User)',
                    },
                    {
                        value: 'One',
                        label: '计算机网络概述(One)',
                    },
                    {
                        value: 'Two',
                        label: '物理层(Two)',
                    },
                    {
                        value: 'Three',
                        label: '数据链路层(Three)',
                    },
                    {
                        value: 'Four',
                        label: '网络层(Four)',
                    },
                    {
                        value: 'Five',
                        label: '运输层(Five)',
                    },
                    {
                        value: 'Six',
                        label: '应用层(Six)',
                    },
                ]
            }
        },
        //进入路由触发的函数
        mounted() {
            this.getData('User')
            // this.mouseWheel()//鼠标滚轮放大放小
            this.keyEven()//开启键盘快捷键检测
            //检测用户是否进行关闭界面或者刷星界面的行为
            window.addEventListener('beforeunload', (e) => this.beforeunloadHandler(e));
        },
        //离开路由触发的函数
        beforeUnmount(){
            this.save_file()
        },
        methods: {
            //刷新或关闭页面触发提示框
            beforeunloadHandler(e) {
                if(this.mindMap){
                    e = e || window.event;
                    if (e) {
                        // e.returnValue = '关闭提示';
                    }
                    return '关闭提示';
                }
            },
            //跳转到新示例
            async set_demo (){
                //保存前个mind
                this.save_file()
                this.valuePre = this.value
                //获取新mind
                // this.$API({
                //   name: this.value
                // }).then(res => {
                //   this.mind = res.data
                //   this.jm.show(this.mind)
                // }).catch(error => {
                //   this.$message.error(error)
                // })
                let result = await this.$API.reqJsMind({name:this.value})
                if(result.code == 200){
                    this.mind = JSON.parse(result.data.jm.content)
                    this.jm.show(this.mind)
                }else {
                    console.log(result.message)
                }
            },
            //导入
            beforeUpload (file) {
                //保存前个mind
                this.save_file()
                //获取新mind
                this.value = ''//不指向系统的任何思维导图
                if (file) {
                    jsMind.util.file.read(file, (jsmindData) => {
                        const mind = jsMind.util.json.string2json(jsmindData)
                        //修改思维导图名为文件名
                        mind.meta.name = file.name.slice(0,-3)
                        if (mind) {
                            this.jm.show(mind)
                            this.$message({ type: 'success', message: '打开成功' })
                        } else {
                            this.prompt_info('请选择后缀为.jm的文件！')
                        }
                    })
                } else {
                    this.prompt_info('请先选择文件')
                    return false
                }
            },
            //添加图片节点
            // add_image_node(file){
            //   let selected_node = this.jm.get_selected_node(); //获取父节点
            //   // console.log(selected_node);
            //   if(!selected_node){
            //     this.$message({ type: 'warning', message: '请先选择一个节点!'});
            //     return;
            //   }
            //   let jm=this.jm
            //   let reader = new FileReader()
            //   reader.onloadend = (function () {
            //     let nodeid = jsMind.util.uuid.newid()
            //     let topic = undefined;
            //     let data = {
            //       "background-image": reader.result,
            //       "width": "100",
            //       "height": "100"};
            //     let node = jm.add_node(selected_node, nodeid, topic, data)
            //   })
            //   if (file) {
            //     reader.readAsDataURL(file)
            //   }
            // },
            upload() {
            },
            //取得数据文件，在public/data.json
            async getData() {
                // this.$API({
                //   name: name
                // }).then(res => {
                //   this.mind = res.data
                //   this.open_empty()
                // }).catch(error => {
                //   this.$message.error(error)
                // })
                let result = await this.$API.reqJsMind({name:this.value})
                if(result.code == 200){
                    this.mind = JSON.parse(result.data.jm.content)
                    this.open_empty()
                }else {
                    console.log(result.messages)
                }
            },
            open_empty() {
                const options = {
                    container: 'jsmind_container', // 必选，容器ID
                    editable: this.isEdit, // 可选，是否启用编辑
                    theme: this.localTheme, // 可选，主题
                    view: {
                        line_width: 2, // 思维导图线条的粗细
                        line_color: this.lineColor // 思维导图线条的颜色
                    },
                    shortcut: {
                        enable: false // 禁用快捷键
                    },
                    layout: {
                        hspace: 40, // 节点之间的水平间距
                        vspace: 10, // 节点之间的垂直间距
                        pspace: 10 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
                    },
                    mode: 'side', // 显示模式，子节点只分布在根节点右侧
                    menuOpts:{  // 这里加入一个专门配置menu的对象
                        showMenu: this.isEdit, //showMenu 为 true 则打开右键功能 ，反之关闭
                        injectionList: [
                            { target: 'edit', text: '编辑'},
                            { target: 'delete', text: '删除节点(delete)' },
                            { target: 'addChild', text: '添加子节点(Tab)' },
                            { target: 'addBrother', text: '添加兄弟节点(Alt)' },
                            { target: 'changeTextRed', text:'字体标红'},
                            { target: 'changeTextWhite', text:'字体标白'},
                            // { target: 'changeBackgroundColor',text: '背景标红'}
                        ],
                        style: {
                            menuItem:{
                                'line-height': '28px'
                            }
                        }
                    }
                }
                this.jm = jsMind.show(options, this.mind)
                // 改变窗口大小重置画布
                window.onresize = () => {
                    this.jm.resize()
                }
                this.getDepth(this.jm.mind.root, 1)
            },
            // 获取层级数 i
            getDepth(obj, k) {
                this.i = Math.max(this.i, k)
                if (obj.children) {
                    obj.children.forEach((v) => {
                        this.getDepth(v, k+1)
                    })
                }
            },
            //保存文件到本地
            save_nodearray_file() {
                const mindData = this.jm.get_data('node_array')
                const mindName = mindData.meta.name
                const mindStr = jsMind.util.json.json2string(mindData)
                jsMind.util.file.save(mindStr, 'text/jsmind', mindName + '.jm')
            },
            //保存到后台
            saveFile(){
                this.save_file();
                this.$message({type:"success",message:"覆盖"+name+"成功！！"})
            },
            async save_file(){
                //获取当前页面mind对象
                const mindData = this.jm.get_data('node_array')
                // console.log(mindData)
                //检查当前mind是否指向数据库mind，不是则提醒覆盖
                if(this.value=='') {
                    //不覆盖
                    if (!confirm("将用当前导图覆盖"+this.valuePre+"导图！！")) {
                        return
                    }else {//覆盖
                        this.value = this.valuePre
                        mindData.meta.name = this.valuePre//修改导图名字
                        this.jm.show(mindData)//渲染导图到页面
                    }
                }
                //覆盖
                const name = mindData.meta.name
                const content = jsMind.util.json.json2string(mindData)//导图字符串
                const jm = {name, content}
                let result = await this.$API.reqSaveJsMind(jm)
                if(result.code == 200){
                    this.$message({type:"success",message:"保存"+name+"成功！！"})
                }else {
                    this.$message({type:"error",message:"覆盖失败"})
                }
            },
            //

            //下载导图
            screen_shot() {
                this.jm.screenshot.shootDownload()
            },
            //展开全部节点
            expand_all() {
                this.jm.expand_all()
            },
            //收起全部节点
            collapse_all() {
                this.jm.collapse_all()
            },
            //展开到num层
            expand_to_level(num) {
                switch (num) {
                    case -1:
                        this.collapse_all()
                        break
                    case 0:
                        this.expand_all()
                        break
                    default:
                        this.jm.expand_to_depth(num)
                        break
                }
            },
            //放大
            zoomIn() {
                if (this.jm.view.zoomIn()) {
                    this.isZoomOut = false
                } else {
                    this.isZoomIn = true
                }
            },
            //缩小
            zoomOut() {
                if (this.jm.view.zoomOut()) {
                    this.isZoomIn = false
                } else {
                    this.isZoomOut = true
                }
            },
            //弹出提示
            prompt_info(msg) {
                this.$message({ type: 'warning', message: msg})
            },
            get_nodearray_data() {
                const mindData = this.jm.get_data('node_array')
                const mindString = jsMind.util.json.json2string(mindData)
                this.$message({ type: 'info', message: mindString})
            },
            //设置主题
            // set_theme(themeName) {
            //   this.jm.set_theme(themeName)
            // },
            //滚轮放大放小
            // scrollFunc(e) {
            //   e = e || window.event
            //   if (e.wheelDelta) {
            //     if (e.wheelDelta > 0) {
            //       this.zoomIn()
            //     } else {
            //       this.zoomOut()
            //     }
            //   } else if (e.detail) {
            //     if (e.detail > 0) {
            //       this.zoomIn()
            //     } else {
            //       this.zoomOut()
            //     }
            //   }
            //   this.jm.resize()
            // },
            // 鼠标滚轮放大缩小
            // mouseWheel() {
            //   if (document.addEventListener) {
            //     document.addEventListener('domMouseScroll', this.scrollFunc, false)
            //   }
            //   this.$refs.container.onmousewheel = this.scrollFunc
            // },
            //快捷键操作
            keyWordEven(e){
                if(this.jm.get_selected_node()!=null) {
                    if (e.keyCode == 46) {
                        this.removeNode()
                    } else if (e.keyCode == 18) {
                        this.addBrotherNode()
                        // this.editNode()
                    } else if (e.keyCode == 9) {
                        this.addNode()
                        // this.editNode()
                    }
                }
            },
            keyEven(){
                if (document.addEventListener) {
                    document.addEventListener('keyup', this.keyWordEven, false)
                }
                // this.$refs.container.onmousewheel = this.scrollFunc
            },
            // 新增节点
            addNode() {
                this.change = 1
                let selectedNode = this.jm.get_selected_node()
                if (!selectedNode) {
                    this.$message({ type: 'warning', message: '请先选择一个节点!'})
                    return
                }
                let nodeid = jsMind.util.uuid.newid()
                let topic = 'new Node'
                let newNode = this.jm.add_node(selectedNode, nodeid, topic)
                if (newNode) {
                    this.jm.select_node(nodeid)
                    this.jm.begin_edit(nodeid)
                    this.jm.menu._mount_events()
                    this.getDepth(this.jm.mind.root, 1)
                }
            },
            // 新增兄弟节点
            addBrotherNode() {
                this.change = 1
                let selectedNode = this.jm.get_selected_node()
                if (!selectedNode) {
                    this.$message({ type: 'warning', message: '请先选择一个节点!'})
                    return
                } else if (selectedNode.isroot) {
                    this.$message({ type: 'warning', message: '不能在根节点添加，请重新选择节点!'})
                    return
                }
                let nodeid = jsMind.util.uuid.newid()
                let topic = 'new Node'
                let newNode = this.jm.insert_node_after(selectedNode, nodeid, topic)
                if (newNode) {
                    this.jm.select_node(nodeid)
                    this.jm.begin_edit(nodeid)
                    this.jm.menu._mount_events()
                }
            },
            // 获取选中标签的 ID
            get_selected_nodeid () {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    return selectedNode.id
                } else {
                    return null
                }
            },
            // 删除节点
            removeNode() {
                this.change = 1
                let selectedId = this.get_selected_nodeid()
                if (!selectedId) {
                    this.$message({
                        type: 'warning',
                        message: '请先选择一个节点!'
                    })
                    return
                }
                this.jm.remove_node(selectedId)
                this.i = 0
                this.getDepth(this.jm.mind.root, 1)
            },
            //编辑节点
            editNode () {
                this.change = 1
                let selectedId = this.get_selected_nodeid()
                if (!selectedId) {
                    this.$message({ type: 'warning', message: '请先选择一个节点!'})
                    return
                }
                let nodeObj = this.jm.get_node(selectedId)
                this.nodeOption.content = nodeObj.topic
                this.nodeOption.bgColor = nodeObj.data['background-color']
                this.nodeOption.fontColor = nodeObj.data['foreground-color']
                this.nodeOption.fontSize = nodeObj.data['font-size']
                this.nodeOption.fontWeight = nodeObj.data['font-weight']
                this.nodeOption.fontStyle = nodeObj.data['font-style']
                this.dialogVisible = true
            },
            sureEditNode () {
                this.change = 1
                let selectedId = this.get_selected_nodeid()
                this.jm.update_node(selectedId, this.nodeOption.content)
                this.jm.set_node_font_style(selectedId, this.nodeOption.fontSize, this.nodeOption.fontWeight, this.nodeOption.fontStyle)
                this.jm.set_node_color(selectedId, this.nodeOption.bgColor, this.nodeOption.fontColor)
                this.nodeOption = {
                    content: '',
                    bgColor: '',
                    fontColor: '',
                    fontSize: '',
                    fontWeight: '',
                    fontStyle: ''
                }
                this.dialogVisible = false
            }
        },
        beforeDestroy() {
            //滚轮放大放小事件
            // document.removeEventListener('domMouseScroll', this.scrollFunc, false)
            //键盘事件关闭
            document.removeEventListener('keyEven',this.keyWordEven,false);
        }
    }
</script>

<style lang="less" scoped>
    .el-button {
        margin: 0 3px;
    }
    .el-select {
        margin: 0 3px;
    }
    .jsmind_layout {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 1000px;
        height: 100%;
        overflow: hidden;
        .jsmind_toolbar {
            width: 100%;
            padding: 5px;
            height: 42px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            background-color: #f8f9fa;
            box-shadow: 0 0 4px #b8b8b8;
        }
        /deep/ .el-button--medium, /deep/ .el-input--medium {
            margin-top: 10px;
        }
        #jsmind_container {
            overflow: auto;
            width:100%;
            height:calc(100vh - 110px);
            .zoom_in_out {
                position: absolute;
                bottom: 20px;
                right: 20px;
                height: auto;
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 5px;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 2px 2px 4px #e0e0e0;
                border: 1px solid #f5f5f5;
                z-index: 999;
            }
            .zoom-icon {
                cursor: pointer;
                font-size: 20px;
                padding: 6px 5px;
            }
        }
        ///deep/.jsmind-inner {
        //  overflow: auto !important;
        //}
        /deep/.el-upload-list {
            display: none !important;
        }

        /* 隐藏滚动条 */
        .jsmind-inner::-webkit-scrollbar {
            display: none;
        }
        /deep/ jmnode.selected {
            background-color: #b9b9b9;
            color: #fff;
            box-shadow: 2px 2px 8px #777;
        }
        /deep/ jmnode:hover {
            box-shadow: 2px 2px 8px #777;
        }
        .form-con {
            padding-top:20px;
        }
        .ele-width {
            width: 96%;
        }
        a {
            text-decoration: none;
            margin: 0 10px;
        }
        /* 未被访问的链接 */
        a:link {
            color: #409eff;
        }
        /* 已被访问的链接 */
        a:visited {
            color: #409eff;
        }
        /* 被选择的链接 */
        a:active {
            color: blue;
        }
    }
</style>
