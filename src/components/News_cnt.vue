<template>
  <div id="cnt">
    <el-header>
      <nav>
        <span class="span1">科研教育新闻
          <router-link to='/'>
            <el-button type="primary" >首页</el-button>
          </router-link>
        </span>
        <router-link to="/Search">
          <span class="span2">
            <el-button type="primary" icon="el-icon-search"></el-button>
          </span>
          <span class="span2">
            <input
            v-on:keyup.enter="Search"
            placeholder="查询"
            >
          </span>
        </router-link>
      </nav>
    </el-header>
    <hr>
    <el-main>
      <div>
        <p>作者：{{news.author}} 发布日期：{{news.date}}</p>
        <a href="news.src">来源：{{news.src}}</a>
      </div>
      <div>
        <h2>{{news.title}}</h2>
        <p>{{news.cnt}}</p>
      </div>
    </el-main>
    <el-aside></el-aside>
    <el-footer></el-footer>
  </div>
</template>
<script>
export default{
  name:'cnt',
  data(){
    return{
      news:{
        id:0,
        title:'2018年度海峡两岸水产生物资源领域学术交流研讨会在武汉召开',
        cnt:'2018年4月9-13日，由国家自然科学基金委员会（简称基金委）与台湾李国鼎科技发展基金会联合主办，中国科学院水生生物研究所承办的“2018年度海峡两岸水产生物资源领域学术交流研讨会”在武汉召开，来自海峡两岸的40余位专家学者和学生参加会议。中国科学院水生生物研究所朱作言院士、徐旭东副所长、基金委港澳台事务办公室邹立尧主任、李国鼎基金会万其超秘书长、台湾海洋大学张清风校长分别在开闭幕式上致辞。\
            \
            基金委与李国鼎科技发展基金会于2014年确定对水产生物资源领域的两岸合作研究项目进行联合资助，经过各自项目征集及评审，共有5项项目获得双方的共同资助，自2015年起正式开始执行。此次武汉会议是藉共同资助项目的实施，助推海峡两岸学者间的沟通与交流。\
            \
            研讨会议期间，来自两岸的10余位专家学者分别汇报了各自项目研究进展及双方合作经验，并就上述研究领域发展前沿、热点问题及共同感兴趣的主题进行深入交流和讨论。会议期间，台湾学者代表参观了中科院水生所养殖基地、白暨豚馆、水生生物博物馆、国家斑马鱼资源中心、分析测试中心、中国科学院淡水藻种库。\
            \
            本次研讨会增进了两岸科学家之间的沟通与交流，实现了搭建平台、促进合作的预期目的，取得圆满成功。',
        date:'2018/4/21',
        author:'南近山 王鑫昕',
        src:'url0',
        cate:0
      }
    }
  },
  methods:{

  },
  created(){
    this.news.title=this.$route.query.title
  }
}
</script>
<style></style>
