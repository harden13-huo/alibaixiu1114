$('#logout').on('click',function(){
    let isConfirm = confirm('您真的要退出吗？')
    // alert('用户点击了确定')
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function () {
                // 成功跳转到登录页面
                location.href = 'login.html'
            },
            error: function () {
                alert('退出失败')
            },
        });
    };
});

// // 处理时间格式的
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate()
};

// 显示用户的登录状态
$.ajax({
    type: "get",
    url: `/users/${userId}`,
    success: function (response) {
        console.log(response)
        $('.profile .avatar').attr('src',response.avatar)
        $('.profile .name').html(response.nickName)
    }
});