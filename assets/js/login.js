$(function () {
    (function () {
        $('#link_reg').on('click', function () {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        $('#link_login').on('click', function () {
            $('.login-box').show()
            $('.reg-box').hide()
        })


        // layui对象是导入layui就会存在的对象
        let form = layui.form
        let layer = layui.layer
        form.verify({
            pwd: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            repwd: function (value) {
                let pwd = $('.reg-box input[name="password"]').val()
                if (pwd !== value) {

                    return '两次密码不一致'
                }


            }

        })

        $('#form_reg').on('submit', function (e) {
            e.preventDefault()
            let obj = { username: $('#form_reg input[name = username]').val(), 
            password:$('#form_reg input[name = password]').val()}
           
            $.post('/api/reguser',obj,function(res) {
                if(res.status!==0)  return layer.msg(res.message);
                layer.msg('注册成功，请登录');
                $('#link_login').click()
               
            })
        })

        $('#form_login').submit(function(e){
            e.preventDefault()
        
            $.ajax({
                method:'POST',
                url:'/api/login',
                data:$(this).serialize(),
                success:function(res){
                   if(res.status !==0) return layer.msg(res.message)
                //    console.log(res.token);
                localStorage.setItem('token',res.token)
                    layer.msg('登录成功')
                     location.href ='/index.html'
                }
            })
        })
    })()
})