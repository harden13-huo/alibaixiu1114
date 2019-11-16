// 当表单发生提交行为时
$('#userForm').on('submit',function () {
    // 获取用户在表单输入的内容并转为字符串
    let userData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: userData,
        success: function () {
            // 刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败');
        }

    });
    // 阻止表单默认行为
    return false
});

// 用户头像的提交
$('#modifyBox').on('change','#avatar',function () {
    // 用户选择到的文件
    // this.files[0]

    const formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉ajax不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response)
            // 实现头像预览
            $('#preview').attr('src',response[0].avatar)
            // 设置隐藏域的值 到时候点击提交时会发送给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });

})

// 展示用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response)
        // 模板引擎字符串拼接
        var html = template('userTpl',{data: response})
        $('#userBox').html(html)
    }
});

// 通过事件委托的形式为编辑按钮点击添加事件
// 点击了子元素，会通过事件冒泡给父元素
$('#userBox').on('click','.edit',function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        // url: '/users/' + id, 
        url: `/users/${id}`,  //es6 新语法
        success: function (response) {
            console.log(response)
            // m模板拼接
            let html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    });
});

// 修改后提交
$('#modifyBox').on('submit','#modifyForm',function () {
    // 获取修改用户表单内容
    let modifyData = $(this).serialize();
    // 获取修改的用户id
    let id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/users/${id}`, 
        data: modifyData,
        success: function (response) {
           location.reload()
        }
    });
    // 阻止默认提交
    return false
});

// 根据id 点击删除按钮 删除对应的用户 事件委托
$('#userBox').on('click','.delete',function () {
    // console.log(id)
    // 弹确认框
    if(confirm('您确认删除此用户吗？')) {
         // 获取用户的id
        let id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: `/users/${id}`,
            success: function (response) {
                location.reload()
            }
        });
    }
});

// 顶部全选框
let selectAll = $('#selectAll')
let deleteMany =  $('#deleteMany')
selectAll.on('change',function () {
    // 获取全选框当前的状态
    let status = $(this).prop('checked')
    // console.log(status)  true false
    if (status) {
        // 为真就显示#deleteMany
        deleteMany.show()
    } else {
        deleteMany.hide()
    };
    // 获取到userBox里的全部复选框 使其和全选框的状态一致
    $('#userBox').find('input').prop('checked',status);
});

// 当前用户前边的复选框状态改变时
$('#userBox').on('change','.userStatus',function () {
    // - 获取到所有用户 在所有用户中过滤出选中的用户
    // - 判断选中用户的数量和所有用户的数量是否一致
    // - 如果一致 就说明所有的用户都是选中的
    // - 否则 就是有用户没有被选中
    let inputs = $('#userBox').find('input');

    if(inputs.length === inputs.filter(':checked').length) {
        // 顶部全选就选中
        selectAll.prop('checked',true)
    }else{
        // 顶部全选就不选中
        selectAll.prop('checked',false)
    };

    // 批量删除的显示与隐藏
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    };
});
//  批量删除
deleteMany.on('click',function () {
    // 获取所有被checked的复选框 
    let ids = [];
    // 获取所有的选中用户
    let checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框
    checkedUser.each(function (index,element) {
        
        ids.push($(element).attr('data-id'));
    });
    // console.log(ids)
    if(confirm('您确认要删除此用户吗？')){
        $.ajax({
            type: "delete",
            url: '/users/' + ids.join('-'),
            success: function () {
                location.reload()
            }
        });
    };
})
