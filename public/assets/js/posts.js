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
}