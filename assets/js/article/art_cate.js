$(function(){
    let layer = layui.layer
    let form = layui.form
    let indexAdd = null
    let indexEdit = null
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                let htmlStr = template('tpl_table',res)
                $('tbody').html(htmlStr)
            }
        });
    }

    $('#btnAddCate').click(function(){
         indexAdd =layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          });   
    })

    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            }

        })
        
    })

    $('tbody').on('click','.btn-edit',function(){
        indexEdit =layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
          });   
          let id = $(this).attr('data-id')
          
          $.ajax({
            method:'GET',
            url:'/my/article/cates/' +id,
            success:function(res){
               
                form.val('form-edit',res.data)
                
             
            }
          })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
               
                if(res.status !==0){
                  return  layer.msg('更新分类失败')
                }
                layer.msg('更新分类成功')
                layer.close(indexEdit)
                initArtCateList()
            }

        })
    })
    $('tbody').on('click','.btn-delete',function(){
        let id =$(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status !==0){
                 return    layer.msg('删除分类失败')
                }
                layer.msg('删除分类成功')
                layer.close(index);
                initArtCateList()
            }
           })
            
           
          });
    })
})