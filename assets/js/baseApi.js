$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net' +options.url
    // options.url = 'http://www.liulongbin.top:3007' +options.url
   if(options.url.indexOf('/my')){
    options.headers={
        Authorization:localStorage.getItem('token') || ''
    }
    options.complete=function(res){
        console.log(res.responseJSON);
        if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        localStorage.removeItem('token')
        location.href ='/login.html'
    }}
   }
    
})