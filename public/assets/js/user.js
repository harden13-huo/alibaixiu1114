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
})