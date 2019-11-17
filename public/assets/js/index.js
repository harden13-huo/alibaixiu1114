// 获取文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function (response) {
        $('#post').html('<strong>'+ response.postCount +'</strong>篇文章（<strong>'+ response.draftCount +'</strong>篇草稿）')
    }
});

// 获取分类数量



// 获取评论数量



