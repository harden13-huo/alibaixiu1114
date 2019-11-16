// 添加文章分类
$('#addCategory').on('submit',function () {
    // 获取表单的输入内容
    let formData = $(this).serialize()
    // console.log(formData)
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function () {
            location.reload()
        }
    });
    // 阻止默认行为
    return false
});

// 展示分类列表页面
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // 拼接模板字符串
        // console.log(response)
        let html = template('categoryListTpl',{data: response})
        $('#categoryBox').html(html)
    }
});

// 点击编辑按钮
$('#categoryBox').on('click','.edit',function () {
    //获取被点击的id
    let id = $(this).attr('data-id')
    // console.log(id)
    $.ajax({
        type: "get",
        url: `/categories/${id}`,
        success: function (response) {
            console.log(response)
            // 模板引擎渲染
            let html = template('modifyCategoryTpl',response)
            $('#formBox').html(html)
        }
    });
});
// 确认修改 
$('#formBox').on('submit','#modifyCategory',function () {
    // 获取id
    let id = $(this).attr('data-id')
    let formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: `/categories/${id}`,
        data: formData,
        success: function () {
            location.reload()
        }
    });
    // 阻止默认行为
    return false
});

// 点击删除按钮
$('#categoryBox').on('click','.delete',function () {
    if(confirm('您真的要删除吗？')) {
        // 获取被点击的id值
        let id = $(this).attr('data-id')
        $.ajax({
            type: "DELETE",
            url: `/categories/${id}`,
            success: function () {
                location.reload()
            }
        });
    }
    
})
