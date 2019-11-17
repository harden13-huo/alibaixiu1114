$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        console.log(response)
        let html = template('commentsTpl',response)
        $('#commentsBox').html(html)
        let pagehtml = template('pageTpl',response)
        $('#pageBox').html(pagehtml)
    }
});

// 分页的ajax
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {page: page},
        success: function (response) {
            let html = template('commentsTpl',response)
            $('#commentsBox').html(html)
            let pagehtml = template('pageTpl',response)
            $('#pageBox').html(pagehtml)
        }
    });
};

// 点击批准评论状态
$('#commentsBox').on('click','.status',function () {
    // 获取被点击的状态
    let status = $(this).attr('data-status')
    // alert(status)   0  
    let id = $(this).attr('data-id')
    // alert(id)
    $.ajax({
        type: "put",
        url: `/comments/${id}`,
        data: {state: status == 0 ? 1 : 0},
        success: function () {
            location.reload()
        }
    });
});

// 删除评论
$('#commentsBox').on('click','.delete',function () {
    if (confirm('您确认要删除此评论吗？')) {
        let id = $(this).attr('data-id')
        // alert(id)
        $.ajax({
            type: "delete",
            url: `/comments/${id}`,
            success: function () {
                location.reload()
            }
        });
    };
});

