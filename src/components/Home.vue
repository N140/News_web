<template>
  <div id="sear">
    <el-header>
        <nav >
          <div class="login">
            <router-link to='/Admin_user'>
              <el-button type="primary" size="mini">管理员登陆</el-button>
            </router-link>
            <router-link to='/Login'>
              <el-button type="primary" size="mini">登陆</el-button>
            </router-link>
            <el-dropdown>
              <el-button type="primary" size="mini">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <router-link to='/user_edit'>
                  <el-dropdown-item>编辑个人信息</el-dropdown-item>
                </router-link>
                <router-link to='/Login'>
                  <el-dropdown-item>切换账号</el-dropdown-item>
                </router-link>
                <el-dropdown-item>注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="master_nav">
            <span class="span1">科研教育新闻
              <router-link to='/'>
                <el-button type="primary" >首页</el-button>
              </router-link>
            </span>
            <router-link to='/Search'>
              <span class="span2">
                  <el-button type="primary" v-on:click="Search" icon="el-icon-search"></el-button>
              </span>
            <span class="span2">
                <input
                v-model="sear_cnt"
                v-on:keyup.enter="Search"
                placeholder="查询"
                >
            </span>
            </router-link>
          </div>
          <div class="inter">
            <el-checkbox-group v-model="cur_tags">
              <el-checkbox-button
                v-for="t in tags"
                v-bind:key="t.id"
                :label="t.value"
                round>
              {{t.name}}
              </el-checkbox-button>
              <el-button type="primary" v-on:click="Reset" icon="el-icon-close" circle>重置类别</el-button>
            </el-checkbox-group>
          </div>
        </nav>
    </el-header>
    <el-main>
      <div class="list">
        <hr>
        <ul v-for="n in news_p_show">
            <li >
              <router-link :to="{path:'/n.id',query:{title:n.title}}">
                <h4>{{n.title}}</h4>
              </router-link>
              <p><label>摘要：</label>{{n.abs}}</p>
              <p>作者：{{n.author}}  日期：{{n.date}}  <el-tag >{{n.cate}}</el-tag> </p>
              <a href="n.src">来源：{{n.src}}</a>
              <hr>
            </li>
          </ul>
      </div>
    </el-main>
    <el-footer>
      <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="pi"
       :page-sizes="[5, 10, 15]"
       :page-size="p_defa_n"
       layout="total, sizes, prev, pager, next, jumper"
       :total="news_labs.length">
      </el-pagination>
    </el-footer>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
export default{
  name:'sear',
  data(){
    return {
      sear_cnt:'',
      // abs摘要,
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
      cur_tags:[],
      news:[
        {id:0,title:'2018年度海峡两岸水产生物资源领域学术交流研讨会在武汉召开',
        cnt:'2018年4月9-13日，由国家自然科学基金委员会（简称基金委）与台湾李国鼎科技发展基金会联合主办，中国科学院水生生物研究所承办的“2018年度海峡两岸水产生物资源领域学术交流研讨会”在武汉',
        date:'2018/4/21',author:'南近山 王鑫昕',src:'url0',cate:0},
        {id:1,title:'中国红十字会计划今年完成救助100名阿富汗先心病患儿目标',
        cnt:'新华社乌鲁木齐４月２１日电（记者潘莹、郭燕）２０日起，２５名阿富汗先心病患儿在新疆医科大学第一附属医院开始陆续接受免费救治，这是中国红十字会“一带一',
        date:'2018/4/21',author:'南近山 王鑫昕',src:'url1',cate:1},
        {id:2,title:'诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:3,title:'3诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:4,title:'4诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:5,title:'5诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:6,title:'6诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:7,title:'7诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:8,title:'8诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:9,title:'9诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，200奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:10,title:'10诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:11,title:'11诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:12,title:'12诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:13,title:'13诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:14,title:'14诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:15,title:'15诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,},
        {id:16,title:'16诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,}
      ],
      news_labs:[],
      al_rela_news:[],
      curPage:1,
      pages:[],
      pi:1,
      p_defa_n:5
    }
  },
  methods:{
    Search:function(){
      var tokens=this.sear_cnt.split(" ")
      this.al_rela_news=[]
      for(var i in this.news){
        var rel_news={}//{id,rela}
        var rela=0
        for(var j in tokens){
          if(this.news[i].title.search(tokens[j])>=0)rela++
          if(this.news[i].cnt.search(tokens[j])>=0)rela++
        }
        if(rela>=0){
          rel_news.id=this.news[i].id
          rel_news.rela=rela
          rel_news.title=this.news[i].title
          rel_news.abs=this.news[i].cnt.slice(0,50)+'……'
          rel_news.date=this.news[i].date
          rel_news.author=this.news[i].author
          rel_news.src=this.news[i].src
          switch(this.news[i].cate){
            case 0:rel_news.cate='生物';break;
            case 1:rel_news.cate='医学';break;
            case 2:rel_news.cate='化学';break;
            case 3:rel_news.cate='信息';break;
            case 4:rel_news.cate='地球';break;
            case 5:rel_news.cate='数理';break;
            case 6:rel_news.cate='物理';break;
            case 7:rel_news.cate='人文社会';break;
            case 9:rel_news.cate='工程技术';break;
          }
          }
          this.al_rela_news.push(rel_news)
        }
        function cmp(a,b){
          return a.rela-b.rela
        }
        this.al_rela_news.sort(cmp)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.p_defa_n=val
      console.log("每页数"+this.p_de)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pi= val
      console.log("p: "+this.pi)
    },
    Reset:function(){
      this.cur_tags=[]
    }
  },
  computed:{
    /*news_lab 拆页*/
    news_lab:function(){
      var news_cur=[]
      for(var i in this.news){
        var news_list={}
        if(this.cur_tags.length==0||this.cur_tags.indexOf(this.news[i].cate)>=0){
          news_list.id=this.news[i].id
          news_list.title=this.news[i].title
          news_list.abs=this.news[i].cnt.slice(0,50)+'……'
          news_list.date=this.news[i].date
          news_list.author=this.news[i].author
          news_list.src=this.news[i].src
          switch(this.news[i].cate){
            case 0:news_list.cate='生物';break;
            case 1:news_list.cate='医学';break;
            case 2:  news_list.cate='化学';break;
            case 3:  news_list.cate='信息';break;
            case 4:news_list.cate='地球';break;
            case 5:news_list.cate='数理';break;
            case 6:news_list.cate='物理';break;
            case 7:news_list.cate='人文社会';break;
            case 9:news_list.cate='工程技术';break;
          }
          news_cur.push(news_list)
        }
      }
      this.news_labs=news_cur
      console.log('news_lab '+this.news_labs.length)
      return news_cur
    },
    news_p_show:function(){
      if(1){
        var news_cur=[]
        for(var i in this.news){
          var news_list={}
          if(this.cur_tags.length===0||this.cur_tags.indexOf(this.news[i].cate)>=0){
            news_list.id=this.news[i].id
            news_list.title=this.news[i].title
            news_list.abs=this.news[i].cnt.slice(0,50)+'……'
            news_list.date=this.news[i].date
            news_list.author=this.news[i].author
            news_list.src=this.news[i].src
            switch(this.news[i].cate){
              case 0:news_list.cate='生物';break;
              case 1:news_list.cate='医学';break;
              case 2:  news_list.cate='化学';break;
              case 3:  news_list.cate='信息';break;
              case 4:news_list.cate='地球';break;
              case 5:news_list.cate='数理';break;
              case 6:news_list.cate='物理';break;
              case 7:news_list.cate='人文社会';break;
              case 9:news_list.cate='工程技术';break;
            }
            news_cur.push(news_list)
          }
        }
        this.news_labs=news_cur
      }
      //news_cur lab
      //lab变后。默认按每页5条news分页*/
      var pages=[]
      var news_l=this.news_labs
      var pa_i=[]
      //定义位置
      for(var i in news_l){
        pa_i.push(news_l[i])
        var cur_i=i
        cur_i++
        //console.log((cur_i)+" "+this.p_defa_n+" "+cur_i%this.p_defa_n)
        var cur_ij=cur_i
        cur_ij--
        if( ((cur_i)%this.p_defa_n===0) || cur_i==news_l.length){
          pages.push(pa_i)
          //console.log("pa_i "+pa_i.length)
          pa_i=[]
        }
      }
      var pi=0
      //console.log("ps"+pages.length)
      for(var i in pages){
        console.log("p_len "+pages[i].length)
      }
      this.pages=pages
      return pages[this.pi-1]
    }
  },
  components:{
  }
}
</script>
<style>
  .el-dropdown {
  vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
  margin-left: 15px;
  }
  .el-icon-arrow-down {
  font-size: 12px;
  }
  nav{margin-top:2%}
  span{}
  .span1{height:40px;font-size:38px}
  .span2{float:right;display: inline-block;height: 40px;}
  div{}
  .master_nav{margin-top:1%}
  .list{margin-top:8%}
  .login{text-align:right}
  .inter{margin-left:20px}
  input{height:33px;font-size:20px}

</style>
