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

// 11.17 day 04 从浏览器的地址栏中获取查询参数
// 获取地址栏查询参数id
let id = getUrlParams('id')
if (id != -1) {
    // 根据id获取文章详细信息
    $.ajax({
        type: "get",
        url: `/posts/${id}`,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    // 把分类信息列表封装到详细的对象中 
                    response.categories = categories
                    // console.log(response)
                    let html = template('modifyTpl',response)
                    $('#parentBox').html(html)
                }
            });
        }
    });
}

// location.search 获取的是类似于 ?id=9&age=18
function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');//['id=9', 'age=20']

    // 循环数据
    for (let i = 0; i < paramsAry.length; i++) {
        const tmp = paramsAry[i].split('='); //['id','9']
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1;
};

// 修改表单提交时
$('#parentBox').on('submit','#modifyForm',function () {
    //获取表单的内容
    let formData = $(this).serialize()
    // console.log(formData)
    // 获取被点击的id
    let id = $(this).attr('data-id')
    console.log(id)
    $.ajax({
        type: "PUT",
        url: `/posts/${id}`,
        data: formData,
        success: function (response) {
            //跳转页面到 posts.html
            location.href = '/admin/posts.html'
        }
    });
    // 阻止表单默认行为
    return false
})

















