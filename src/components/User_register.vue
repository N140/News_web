<template>
  <div id="register">
    <el-header>
      <nav>
        <span class="span1">科研教育新闻
          <router-link to='/'>
            <el-button type="primary" >首页</el-button>
          </router-link>
        </span>
        <span class="span2">
          <el-button type="primary" icon="el-icon-search"></el-button>
        </span>
        <span class="span2">
          <input
          v-on:keyup.enter="Search"
          placeholder="请输入查询内容"
          >
        </span>
        <hr>
      </nav>
    </el-header>
    <el-main>
      <div class="form">
        <router-link to="/Login">
          <p style="text-align:center">已有账号？现在登录</p>
        </router-link>
      <el-form ref="user_info" status-icon :model="user_info" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user_info.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pw">
          <el-input type="password" v-model="user_info.pw"></el-input>
        </el-form-item>
        <el-form-item type="password" label="确认密码" prop="conpw">
          <el-input v-model="user_info.conpw"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker type="date" v-model="user_info.birth" placeholder="选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="e-mail" prop="email">
          <el-input placeholder="请准确填写邮箱，以便找回密码" v-model="user_info.email"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="intro">
          <el-input type="textarea" v-model="user_info.intro"></el-input>
        </el-form-item>
        <!--协同过滤修改-->
        <el-form-item label="选择新闻类别" prop="cates">
          <el-checkbox-group v-model="user_info.cates" size="medium">
            <el-checkbox-button
              v-for="(t, index) in tags"
              :key="t.id"
              :label="t.value"
              >{{index+1}}{{t.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" v-on:click="Register('user_info')" round>注册</el-button>
            <el-button v-on:click="Reset('user_info')" round>重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>
<script>
export default{
  name:'register',
  data(){
    var chec_pw =(rule,value,callback)=>{
      if(value===''){
        return callback(new Error('请输入密码'))
      }else if(value.length<8){
        callback(new Error('密码不少于8位'))
      }else if(value.search(/[^a-z]/i)===-1 || value.search(/[A-Z]/i)===-1 ||value.search(/[0-9]/i)===-1){
        callback(new Error('密码中应包含数字及大小写字母'))
      }else if(value.search(/[~'!@#￥$%^&*()-+_=:]/)===-1){
        callback(new Error('密码中应包含至少一位特殊字符，如@'))
      }else{
        callback()
      }

    };
    var chec_conpw =(rule,value,callback)=>{
      if(value===''){
        return callback(new Error('请再次输入密码'))
      }else if(value!==this.user_info.pw){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    };
    var chec_email =(rule,value,callback)=>{
      if(value===""){
        callback(new Error('请输入邮箱'))
      }else if(value.indexOf('@')===-1 || value.indexOf('@')===0 || value.indexOf('@')===(value.length-1)){
        callback(new Error('请按如下示例输入：123@qq.com'))
      }else{
        callback()
      }
    };
    return{
      tags:[
        {name:'生物',value:0},
        {name:'医学',value:1},
        {name:'化学',value:2},
        {name:'信息',value:3},
        {name:'地球',value:4},
        {name:'数理',value:5},
        {name:'物理',value:6},
        {name:'人文社会',value:7},
        {name:'工程技术',value:9}
      ],
      user_info:{
        name:'',
        pw:'',
        conpw:'',
        birth:'',
        email:'',
        intro:'',
        cates:[],
        //书签 新闻ID
      },
      email_info:'请准确填写邮箱，以便于找回丢失密码',
      rules:{
        name:[
          {required:true,message:'请如输入用户名',trigger:'blur'}
        ],
        pw:[
          {required:true,validator:chec_pw,trigger:'blur'}
        ],
        conpw:[
          {required:true,validator:chec_conpw,trigger:'blur'}
        ],
        birth:[
          {type:'date',message:"请按1990-12-02格式填写日期",trigger:'change'}
        ],
        email:[
          {required:true,validator:chec_email,trigger:'blur'}
        ],
        intro:'',
        cates:[],
      }
    }
  },
  methods:{
    Register(user){
      this.$refs[user].validate((valid)=>{
        if(valid){
          alert('提交！')
        }else{
          console.log('errro submit!')
          return false
        }
      })
    },
    Reset(user){
        this.$refs[user].resetFields()
    }
  }
}
</script>
<style>

</style>
