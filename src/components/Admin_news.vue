<template>
  <div id="admin_news">
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
          <router-link to='/Admin_user'>
            <el-menu-item index="1"><i class="el-icon-caret-right"></i>用户管理</el-menu-item>
          </router-link>
          <router-link to='/Admin_news'>
            <el-menu-item index="2"><i class="el-icon-news"></i>科教新闻管理</el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-header>
    <div class="right_cnt">
      <el-main>
          <el-table
            :data="news_show"
            style="width:100%"
            stripe
            max-height="750"
            :default-sort="{prop:'date',order:'descending'}"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
            >
            </el-table-column>
            <!--<el-table-column
              v-for="n in news_cols"
              :key="n.id"
              :prop="n.prop"
              :label="n.label"
            >-->
            <el-table-column
              prop="title"
              label="标题"
            >
            </el-table-column>
            <el-table-column
              label="类别标签"
            >
              <template slot-scope="scope">
                <el-input :disabled="isEditCate" v-model="scope.row.cate_show"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{scope.row.title}}</p>
                <p>{{scope.row.cnt}}</p>
                <div slot="reference">
                  <el-tag type="success" size="small">查看内容</el-tag>
                </div>
              </el-popover>
              <el-button @click="Chang_cate(scope.$index,news_show)" type="primary" size="small" icon="el-icon-edit"></el-button>
              <el-button @click.native.prevent="DelRow(scope.$index,news_show)" type="danger" icon="el-icon-delete" size="small"></el-button>
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
  name:'admin_news',
  data(){
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
      news_cols:[
        {prop:'title',label:'标题'},
        {prop:'cate_show',label:'分类'}
      ],
      isEditCate:true,
      //News比表里多一列cate_show
      news:[
        {id:0,title:'2018年度海峡两岸水产生物资源领域学术交流研讨会在武汉召开',
        cnt:'2018年4月9-13日，由国家自然科学基金委员会（简称基金委）与台湾李国鼎科技发展基金会联合主办，中国科学院水生生物研究所承办的“2018年度海峡两岸水产生物资源领域学术交流研讨会”在武汉',
        date:'2018/4/21',author:'南近山 王鑫昕',src:'url0',cate:0,cate_show:''},
        {id:1,title:'中国红十字会计划今年完成救助100名阿富汗先心病患儿目标',
        cnt:'新华社乌鲁木齐４月２１日电（记者潘莹、郭燕）２０日起，２５名阿富汗先心病患儿在新疆医科大学第一附属医院开始陆续接受免费救治，这是中国红十字会“一带一,新华社乌鲁木齐４月２１日电（记者潘莹、郭燕）２０日起，２５名阿富汗先心病患儿在新疆医科大学第一附属医院开始陆续接受免费救治，这是中国红十字会“一带一',
        date:'2018/4/21',author:'南近山 王鑫昕',src:'url1',cate:1,cate_show:''},
        {id:2,title:'诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:3,title:'3诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:4,title:'4诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:5,title:'5诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:6,title:'6诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:7,title:'7诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:8,title:'8诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:9,title:'9诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，200奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:10,title:'10诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:11,title:'11诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:12,title:'12诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:13,title:'13诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:14,title:'14诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:15,title:'15诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''},
        {id:16,title:'16诺贝尔奖得主理查德·施罗克：一天工作“不超过24小时”',
        cnt:'中青在线讯（南近山 中国青年报·中青在线记者 王鑫昕）4月19日，2005年诺贝尔化学奖得主、美国麻省理工学院教授理查德·施罗克在成都理工大学进行了交流讲学。',
        date:'2018/4/20',author:'南近山 王鑫昕',src:'url2',cate:2,cate_show:''}
      ],
      cha_cate_show:''
    }
  },
  computed:{
    news_show:function(){
      for(var i in this.news){
        switch(this.news[i].cate){
          case 0:this.news[i].cate_show='生物';break;
          case 1:this.news[i].cate_show='医学';break;
          case 2: this.news[i].cate_show='化学';break;
          case 3: this.news[i].cate_show='信息';break;
          case 4:this.news[i].cate_show='地球';break;
          case 5:this.news[i].cate_show='数理';break;
          case 6:this.news[i].cate_show='物理';break;
          case 7:this.news[i].cate_show='人文社会';break;
          case 9:this.news[i].cate_show='工程技术';break;
        }
      }
      return this.news
    }
  },
  methods:{
    handleOpen(key,keyPath){
      console.log(key,keyPath)
    },
    handleClose(key,keyPath){
      console.log(key,keyPath)
    },
    Chang_cate(index,data){
      if(this.isEditCate===true){
        this.isEditCate=false
        return
      }else{
        if(data[index].cate_show.length>0){
          var cha_cate=-1
          //console.log("ch_cate_show:"+data[index].cate_show)
          for (var i in this.tags){
            //console.log(i+" "+this.tags[i].name)
            if(data[index].cate_show===this.tags[i].name){
              cha_cate=this.tags[i].value
              //console.log("cha_cate"+" "+cha_cate)
              break
            }
          }

          if(cha_cate!==-1){
            data[index].cate=cha_cate
            this.isEditCate=true
          }else{
            data[index].cate_show="请输入：生物/医学/化学/信息/地球/数理/物理/人文社会/工程技术"
          }
        }
        return
      }
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
<style></style>
