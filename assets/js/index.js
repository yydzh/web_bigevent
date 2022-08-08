$(function () {
    let layer = layui.layer
    getUserInfo()
    $('#btnLogout').click(function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href ='/login.html'
            layer.close(index);
        })
    })
})

function getUserInfo() {
    console.log(localStorage.getItem('token'))

    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
        
    });
}

// 头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    console.log(user)
    $('#welcome').html(`欢迎  ${name}`)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}