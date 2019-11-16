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