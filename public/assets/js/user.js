// 当表单发生提交行为时
$('#userForm').on('submit',function () {
    // 获取用户在表单输入的内容并转为字符串
    let userData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: userData,
        success: function () {
            // 刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败');
        }

    });
    // 阻止表单默认行为
    return false
});

// 用户头像的提交
$('#modifyBox').on('change','#avatar',function () {
    // 用户选择到的文件
    // this.files[0]

    const formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉ajax不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response)
            // 实现头像预览
            $('#preview').attr('src',response[0].avatar)
            // 设置隐藏域的值 到时候点击提交时会发送给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });

})

// 展示用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response)
        // 模板引擎字符串拼接
        var html = template('userTpl',{data: response})
        $('#userBox').html(html)
    }
});