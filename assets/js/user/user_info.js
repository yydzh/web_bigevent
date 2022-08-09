$(function(){
    let form =layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
           if(value.length>6){
            return '昵称只能小于六位'
           } 
        }
    })
    initUserInfo()

    $('#btnReset').click(function(e){
        e.preventDefault();
        initUserInfo()
        
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })

    function initUserInfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !==0){
                    layer.msg('获取用户失败')
                }
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }
})

