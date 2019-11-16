// 当修改密码表单发生改变时
$('#modifyForm').on('submit',function () {
    // 获取表单数据
    let formData = $(this).serialize();
    // 调用接口修改密码
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function () {
            location.href = "/admin/login.html"
        }
    });
    //阻止表单默认行为
    return false 
});