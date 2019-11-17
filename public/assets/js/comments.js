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
