function Mat(r,c){
  this.m=new Array();
  this.r=r;
  this.c=c;
  for(var i=0;i<r;i++){
    this.m[i]=new Array(c);
    for (var j=0;j<c;j++){
      this.m[i][j]=0;
    }
  }
  this.T=function(){
    var cur=new Mat(this.c,this.r);
    for (var i=0;i<cur.r;i++){
      for (var j=0;j<cur.c;j++){
        cur.m[i][j]=this.m[j][i];
      }
    }
    return cur;
  }
  this.doc=function(mat){
    if(mat.r!=this.c)return;
    var res=new Mat(this.r,mat.c);
    for (var i=0;i<this.r;i++){
      for (var j=0;j<mat.c;j++){
        var sum=0;
        for (var k=0;k<this.c;k++)sum+=this.m[i][k]*mat.m[k][j];
        res.m[i][j]=sum;
      }
    }
    return res;
  }
}
module.exports=Mat;
