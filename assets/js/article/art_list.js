$(function(){
    let layer = layui.layer
    let form  = layui.form
    let laypage = layui.laypage
    template.defaults.imports.dateFormate = function(date){
        const dt  = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() +1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return `{y}-{m}-{d} {hh}:{mm}:{ss}`

    }

    function padZero(n){
        return n>9 ? n:'0'+n
    }
    let q={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    initTable()
    initCate()

    function initTable(){
        $.ajax({
            method : 'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){

               if (res.status !==0){
                return layer.msg('获取文章列表失败！')
               }
               let htmlStr = template('tpl-table',res)
               $('tbody').html(htmlStr)
            //    分页
                renderPage(res.total)
            }

        })
    }
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if (res.status!==0){
                    return layer.msg('获取分类数据失败！')
                }
              let htmlStr =   template('tpl-cate',res)
              $('[name=cate_id]').html(htmlStr)
              form.render()
            }
        })
    }

    // 为筛选添加submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        let cate_id = $('[name = cate_id]').val()
        let state = $('[name = state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
        
    })

    // 定义渲染分页的方法
    function renderPage(total,first){

        laypage.render({
            elem:'pageBox',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            jump:function(obj){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
              if(!first){
                initTable()
              }

            },
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10]
        })
    }


    $('tbody').on('click','btn-delete',function(){
        let len = $('btn-delete').length
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            let id = $(this).attr('data-id')
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if(len ===1) {
                        q.pagenum===1?q.pagenum:q.pagenum --}
                    initTable()
                    layer.close(index);
                }
            })
           
          });
    })
})