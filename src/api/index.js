import request from "@/api/request";
//登录
export const reqLogin = (data)=>request({url: '/user/login', method: 'post', data})
//退出登录
export const reqLogout = ()=>request({url: '/user/logout', method: 'get'})
//注册
export const reqRegister = (data)=>request({url: '/user/register', method: 'post', data})

//首页
//获取关系图数据
export const reqMapData = ()=>request({url: '/map', method: 'get'})
//搜索节点，获取关联节点数据
export const reqSearch = (data)=>request({url: '/search', method: 'get', params: data})
//获取路径信息
export const reqPath = (data)=>request({url: '/findPath', method: 'get', params: data})

//思维导图
//获取
export const reqJsMind = (data)=>request({url: '/jm/getMind', method: 'get', params: data})
//存储
export const reqSaveJsMind = (data)=>request({url: '/jm/saveMind', method: 'post', data})

//交流社区
//搜索帖子
// export const reqGetList = (data)=>request({url: '', method: '', data})
export const reqGetList = (data)=>request({url: '/searchList', method: 'get', params: data})
//获取公告
export const reqGetBillboard = ()=>request({url: '/billboard/show', method: 'get'})
//初始化列表
export const reqGetPostList = (data)=>request({url: '/post/list', method: 'get',  params: data})

//帖子
//获取帖子信息
export const reqGetPost = (data)=>request({url: '/post', method: 'get', params: data})
//创建帖子
export const reqCreatePost = (data)=>request({url: '/post/create', method: 'post', data})
//更新帖子
export const reqUpdatePost = (data)=>request({url: '/post/update', method: 'post', data})
//删除帖子
export const reqDeletePost = (id)=>request({url: `/post/delete/${id}`, method: 'delete'})
//获取评论
export const reqComments = (data)=>request({url: `/comment/get_comments`, method: 'get', params: data})
//评论
export const reqAddComments = (data)=>request({url: `/comment/add_comment`, method: 'post', data})

//用户
//获取用户信息
export const reqUserInfo = ()=>request({url: '/user/display', method: 'get'})
//修改用户信息
export const reqModifyUserInfo = (data)=>request({url: '/user/modify', method: 'post', data})
//上传头像
export const reqUploadAvatar = (param, headers)=>request({url: '/uploadAvatar', method: 'post', data: param, headers})
//修改密码
export const reqChangePassword = (data)=>request({url: '/user/changePassword', method: 'post', data})

