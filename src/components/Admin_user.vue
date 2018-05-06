<template>
  <div id="admin">
    <el-header>
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">科研教育新闻后台管理</el-menu-item>
        <el-menu-item index="2">
          <router-link to='/'>
            <el-button size="small">退出<i class="el-icon-caret-right al-icon--right"></i></el-button>
          </router-link>
        </el-menu-item>
      </el-menu>
      <div class="nav_left">
        <el-menu
          default-active="1"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1"><i class="el-icon-caret-right"></i>用户管理</el-menu-item>
          <router-link to='/Admin_news'>
            <el-menu-item index="2"><i class="el-icon-news"></i>科教新闻管理</el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-header>
    <div class="right_cnt">
      <el-main>
        <el-table
          :data="users"
          style="width:100%"
          stripe
          max-height="800"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
          >
          </el-table-column>
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            v-for="u in user_cols"
            :key="u.id"
            :prop="u.prop"
            :label="u.label"
            width=""
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"

          >
            <template slot-scope="scope">
              <el-button @click="handleCheck(scope.raw)" type="primary" size="small">查看</el-button>
              <el-button @click.native.prevent="DelRow(scope.$index,users)" icon="el-icon-delete" type="danger" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <el-footer></el-footer>
  </div>
</template>
<script>
export default{
  name:'admin',
  data(){
    return{
      user_cols:[
        {prop:'name',label:'用户名'},
        {prop:'email',label:'e-mail'}
      ],
      users:[
        {id:'1',name:'',email:''},
        {id:'2',name:'',email:''},
        {id:'3',name:'',email:''},
        {id:'4',name:'',email:''},
        {id:'5',name:'',email:''},
        {id:'6',name:'',email:''},
        {id:'7',name:'',email:''},
        {id:'8',name:'',email:''},
      ]
    }
  },
  methods:{
    handleOpen(key,keyPath){
      console.log(key,keyPath)
    },
    handleClose(key,keyPath){
      console.log(key,keyPath)
    },
    handleCheck(row){
      console.log(row)
    },
    DelRow(index,data){
      data.splice(index,1)
    },
    indexMethod(index){
      return index+1
    }
  }
}
</script>
<style>
div{}
  .nav_left{width:20%;height:80%;background-color:rgb(84,92,100)}
  .right_cnt{margin-left:24%}
</style>
