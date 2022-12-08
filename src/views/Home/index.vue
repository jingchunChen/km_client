<template>
    <div class="back">
        <!-- 搜索 -->
        <div class='header'>
            <div class="search">
                <MyInput placeholder="请输入你要搜寻的节点" size="middle" type="text"
                         :value="input" @input="input = $event"/>
                <MyButton size="middle" type="primary" @click="find(input)">节点搜索</MyButton>
            </div>

            <div class="findPath">
                <MyInput type="text" v-model="src" size="middle" placeholder="起始节点"/>
                <MyInput type="text" v-model="dst" size="middle" placeholder="结束节点"/>
                <MyButton size="middle" type="primary" @click="findPath">路径搜索</MyButton>
            </div>
        </div>

        <!-- 知识图谱 -->
        <MyCard class="mapCard">
            <div id="map" class="map"></div>
        </MyCard>

        <!--节点介绍-->
        <div class="detail" v-show="node.name != ''">
            <h2>{{node.name}}</h2>
            <p>{{node.content}}</p>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "Home",
        mounted() {
            this.getData()
        },
        data() {
            return {
                //收集用户输入
                input: '',
                //起始节点名称
                src: '',
                //结束节点名称
                dst: '',
                //存储点击节点内容
                node: {
                    name: '',
                    content: ''
                },
                //存储节点数据【节点名称+节点详情】
                nodes: [],
                //存储关系数据【关系名称+起始节点+目标节点】
                links: [],
                //存储关系图数据
                mapData:{
                    //存储关系图所需 节点数据
                    mNodes: [],
                    //存储关系图所需 关系数据
                    mLinks: []
                }
            }
        },
        methods: {
            //生成关系图
            map(id){
                const color1 = '#006acc';
                const color2 = '#10a050';
                this.mapData.mNodes.forEach(res => {
                    if (res.name == this.input) {
                        res.symbolSize = 80;
                        res.itemStyle = {
                            color: color1,
                        };
                    } else if (res.name != this.input) {
                        res.itemStyle = {
                            color: color2
                        };
                    }
                });
                this.input = ''
                this.mapData.mLinks.forEach(link => {
                    link.label = {
                        align: 'center',
                        fontSize: 12,
                    };
                    link.lineStyle = {
                        color: color1
                    }
                });
                // 初始化实例
                document.getElementById(id).setAttribute('_echarts_instance_', '');
                let myChart = echarts.init(document.getElementById(id))
                // 绘制图表，定义数据(一般直接通过复制option进行使用，再调样式)
                let option = {
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 58,
                        draggable: true,//鼠标拖动
                        roam: true,//滑轮收缩
                        focusNodeAdjacency: true,
                        edgeSymbol: ['', 'arrow'],
                        edgeLabel: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 20
                                },
                                formatter(x) {
                                    return x.data.name;
                                }
                            }
                        },
                        label: {
                            show: true
                        },
                        force: {
                            repulsion: 1800,
                            edgeLength: 20
                        },
                        data: this.mapData.mNodes,
                        links: this.mapData.mLinks
                    }]
                }
                //为节点和关系绑定点击事件
                myChart.on('click', params =>{
                    //点击节点
                    if(params.dataType == 'node'){
                        this.input=params.name
                        //获取详情
                        this.getContent()
                        //查早该节点
                    }else if(params.dataType == 'edge'){//点击关系
                        //展示在路径搜索框中
                        this.src = params.data.source
                        this.dst = params.data.target
                    }
                })
                //渲染数据后添加，实现echarts图表的自适应宽度
                myChart.setOption(option, true)
                setTimeout(function (){
                    window.onresize = function () {
                        myChart.resize();
                    }
                },500)
            },
            //获取关系图初始数据
            async getData(){
                let result = await this.$API.reqMapData()
                if(result.code == 200){
                    this.upData(result.data, '')
                }
            },
            //更新节点信息,生成关系图
            upData(data, type){
                this.nodes = data.nodes
                this.links = data.links
                //清空前图表数据
                this.mapData.mNodes = []
                this.mapData.mLinks = []
                //处理数据
                this.nodes.forEach(item=>{
                    this.mapData.mNodes.push({name:item.node})
                })
                this.links.forEach(item=>{
                    this.mapData.mLinks.push({source:item.source,target:item.target,name:item.relation})
                })
                if(type == 'node'){
                    //获取搜寻节点详细信息
                    this.getContent()
                }else if(type == 'edge'){
                    //清空
                    this.node= {
                        name: '',
                        content: ''
                    }
                    this.input = ''
                }
                //生成关系图
                this.map("map")

            },
            //获取节点详情
            getContent(){
                this.nodes.forEach(item => {
                    if(item.node == this.input){
                        // console.log(this.input, item.content)
                        this.node.name = this.input
                        this.node.content = item.content
                    }
                })
            },
            async find(){
                //请求与搜索节点相关联数据
                let result = await this.$API.reqSearch({node: this.input})
                if(result.code == 200){
                    //更新关系图
                    this.upData(result.data, 'node')
                }
            },
            //查询路径
            async findPath(){
                let result = await this.$API.reqPath({src: this.src, dst: this.dst})
                this.upData(result.data, 'edge')
            }
        },

    }
</script>

<style scoped lang="less">
    .back {
        text-align: center;
        height: calc(100vh - 55px);
        .search {
            display: inline-block;
        }
        .findPath {
            display: inline-block;
        }
        .mapCard {
            height: calc(100% - 75px);
            width: 98%;
            .map {
                height: 100%;
                width: 100%;
                /*background-color: #66B1FF;*/
            }
        }
        .detail {
            position: fixed;
            width: calc( 100vw - 84px );
            bottom: 0;
            text-align: center;
            padding: 20px;
            margin: 0 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border: 2px solid #aaa;
            border-radius: 15px 15px 0 0;
            border-bottom: none;
        }

    }

</style>
