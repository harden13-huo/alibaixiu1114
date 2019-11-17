$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response)
        let html = template('postsTpl',response)
        $('#postsBox').html(html)
        // 获取分页页码
        let page = template('pageTpl',response)
        $('#page').html(page)
    }
});
// 处理时间格式的
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate()
};

// 分页封装函数 changePage
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {page: page},
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
};

// 向服务器发送请求获取分类列表的数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response)
        let html = template('categoryTpl',{data: response})
        $('#categoryBox').html(html)
    }
});

// 当用户进行分类列表删选时
$('#filterForm').on('submit',function () {
    //获取数据
    let formData = $(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            let page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    // 阻止默认行为
    return false
});

// 11.17删除文章 
$('#postsBox').on('click','.delete',function () {
    if (confirm('您真的要删除吗？')) {
        let id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: `/posts/${id}`,
            success: function () {
                location.reload()
            }
        });
    }
});

// 11.17 添加评论的
var id, userId;
$('#postsBox').on('click', ".postCom", function () {
    id = $(this).data('id')
    console.log(id, 678);
    userId = JSON.parse(localStorage.getItem('user'))._id
    console.log(userId, 444);
    $('#exampleModal').modal('show')
})
/* 点击发布 */
$('.addCom').on('click', function () {
    var content = $('#message-text').val()
    console.log(content, 1111);
    $.ajax({
    type: 'post',
    url: '/comments',
    data: {
        author: userId,
        content: content,
        post: id
    },
    success: function (res) {
        console.log(res, 543);
        $('#exampleModal').modal('hide')
    }
    })
});


