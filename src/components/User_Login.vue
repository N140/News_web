<template>
  <div id="login">
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
        </nav>
        <hr>
      </el-header>
      <el-main>
        <div class="form">
          <el-form ref="user" :model="user" label-width="150px">
            <el-form-item label="用户名">
              <el-input v-model="user.user_name"></el-input>
              <span class="form_info">{{name_info}}</span>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="user.pw"></el-input>
              <span class="form_info">{{pw_info}}</span>
              <a style="float:right" href="">忘记密码</a>
            </el-form-item>
          <!--<div style="margin:10% 35%">-->
            <el-form-item>
              <el-button  type="primary" v-on:click="login">  登陆  </el-button>
              <router-link to='/register'>
                <el-button type="primary" >注册</el-button>
              </router-link>
            </el-form-item>
          </el-form>
          <router-link to='/user_edit'>
            <el-button type="primary">编辑</el-button>
          </router-link>
        </div>
      </el-main>
      <el-footer></el-footer>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
export default{
  name:'login',
  data(){
    return{
      user:{
        user_name:'',
        pw:''
      },
      name_info:'',
      pw_info:''
    }
  },
  methods:{
    login:function(){
      this.name_info=""
      this.pw_name=""
      if(this.user.user_name.length===0){
        this.name_info="用户名不应为空"
        return
      }
      if(this.user.pw.length<8){
        this.user.pw=""
        this.pw_info="密码不少于8位"
        return
      }
      else if(this.user.pw.search(/[^a-z]/i)===-1 || this.user.pw.search(/[A-Z]/i)===-1 ||this.user.pw.search(/[0-9]/i)===-1){
        this.user.pw=""
        this.pw_info="密码中应包含数字及大小写字母"
        return
      }
      else if(this.user.pw.search(/[~'!@#￥$%^&*()-+_=:]/)===-1){
        this.user.pw=""
        this.pw_info="密码中应包含至少一位特殊字符，如@"
        return
      }
      //数据库验证
    }
  }
}
</script>
<style>
  div{}
  .form{margin:5% 20%;width:40%}
  span{}
  .form_info{text-align:center;font-size:15px;color:#990000}
</style>
