$('#file').on('change',function () {
    // 获取用户选择的文件
    let file = this.files[0]
    // 实现二进制上传
    let formData = new FormData()
    // 将选择的文件添加到formdata中 
    //对象中插入  键formImage  值file
    formData.append('formImage',file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType:false,
        success: function (response) {
            console.log(response)
            $('#image').val(response[0].formImage)
        }
    });
});

// 添加轮播图片
$('#slidesForm').on('submit',function () {
    // 获取输入的内容
    let formData = $(this).serialize()
    // 发送请求 添加轮播数据
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    // 阻止表单默认行为
    return false
});

// 向服务器发送请求 
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        console.log(response)
        let html = template('slidesTpl',{data: response})
        $('#slidesBox').html(html)
    }
});

// 删除
$('#slidesBox').on('click','.delete',function () {
    if (confirm('确认要删除吗？')) {
        let id = $(this).attr('data-id')
        // alert(id)
        $.ajax({
            type: "delete",
            url: `/slides/${id}`,
            success: function () {
                location.reload()
            }
        });
    };
});