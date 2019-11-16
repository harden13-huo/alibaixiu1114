$.ajax({
    type: "get",
    url: '/categories',
    success: function (response) {
        let html = template('categoryTpl',{data: response})
        $('#category').html(html)
    }
});

// 上传文件部分的
$('#feature').on('change',function () {
    // 获取到选择的文件
    let file = this.files[0]
    // 实现二进制文件的上传
    let formData = new FormData()
    // 文件进行追加到formdata中
    formData.append('cover',file)
    //文章封面上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 不要处理data属性的参数
        processData: false,
        // 不要设置参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#thumbnail').val(response[0].cover)
        }
    });
});

// 保存文章的输入
$('#addForm').on('submit',function () {
    //获取表单数据内容
    let formData = $(this).serialize()
    // console.log(formData)
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
    // 阻止默认行为
    return false
});