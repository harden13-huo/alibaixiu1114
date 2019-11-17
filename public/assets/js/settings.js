// 当管理员选择logo图片时
$('#logo').on('change',function () {
    let file = this.files[0]
    // 创建空的formData对象并设置他的键值
    let formData = new FormData()
    // 将管理员选择到的文件添加到formData对象中
    formData.append('formLogo',file)
    $.ajax({
        type: "POST",
        url: "/upload",
        data: formData,
        //告诉ajax方法，不要处理formdata参数的格式
        processData: false,
        // 告诉ajax方法，不要设置文件类型
        contentType: false,
        success: function (response) {
            // response是个数组里放了对象 的第0个就是图片的路径
            console.log(response)
            // 图片的路径保存在隐藏域中
            $('#hiddenLogo').val(response[0].formLogo)
            //显示在页面中 更改img的src属性
            $('#preview').attr('src',response[0].formLogo)
        }
    });
});


// settingsForm表单提交时
$('#settingsForm').on('submit',function () {
    // 获取表单输入的内容
    let formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function () {
            location.reload()
        }
    });
    // 阻止默认行为
    return false
});
//显示网站设置数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        console.log(response)
        if (response) {
            // 隐藏域的图片显示
            $('#hiddenLogo').val(response.logo)
            //显示图片logo
            $('#preview').attr('src',response.logo)
            // 将网站标题显示在页面中
            $('#settingsName').val(response.title)
            // 将是否开启评论功能显示在页面中
            $('#comment_status').prop('checked',response.comment)
            // 将评论是否经过人工审核显示在页面中
            $('#comment_reviewed').prop('checked',response.review)
        }
    }
});