// 封装函数获取元素
var getElem = function(cls) {
    return document.querySelector(cls);
}

//获取元素样式
var getCls = function(element) {
    return element.getAttribute('class');
}

//设置元素样式
var setCls = function(element, cls) {
    return element.setAttribute('class', cls);
}

//为元素添加样式
var addCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, (baseCls + " " + cls).replace(/\s+/g, " "));
    }
}

//为元素删除样式
var delCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(" ").replace(/\s+/g, " "));
    }
}


// 获取imooc列表和姓名填写规则元素
var imoocList = getElem('.imooclist'),
    imoocListItem = getElem('.imooclist-item'),
    nameRule = getElem('.namerule'),
    explain = getElem(".explain");

// 我的IMOOC列表显示隐藏
imoocList.onmouseover = function() {
    imoocListItem.style.display = 'block';
}
imoocList.onmouseout = function() {
    imoocListItem.style.display = 'none';
}
imoocListItem.onmouseover = function() {
    imoocListItem.style.display = 'block';
}
imoocListItem.onmouseout = function() {
    imoocListItem.style.display = 'none';
}


// 姓名填写规则显示隐藏
nameRule.onmouseover = function() {
    explain.style.display = "block";
}
nameRule.onmouseout = function() {
    explain.style.display = 'none';
}


//获取输入框元素
var checkResult = document.getElementsByClassName('checkresult'),
    userName = getElem('.username'),
    pwWrongTip = getElem('.pw_wrongtip'),
    password = getElem('.password'),
    tips = getElem('.tips'),
    s = document.getElementsByClassName('s'),
    password_ = getElem('.password_'),
    fullName = getElem('.fullname'),
    nameWrongTip = getElem('.name_wrongtip'),
    nameRightTip = getElem('.name_righttip'),
    idCardNum = getElem('.idcard_num'),
    perEmail = getElem('.per_email'),
    phoneNum = getElem('.phonenum'),
    btn = getElem('.btn'),
    checkBox = getElem('.checkbox');


// 正则表达式
var pattern = {
    userName: /^[a-zA-Z]\w{5,29}$/,
    password: /^[\w\W]{6,20}$/,
    fullName: /^[\u4e00-\u9fa5]{2,15}$|^[a-zA-Z]{3,30}$/,
    idCardNum: /^\d{17}[\dx]$/i,
    perEmail: /^[\w-]+@[\w-]+\.[\w-]+$/,
    phoneNum: /^1[^12]\d{9}$/
}


//标记符
var isTrue1 = false; //用户名错误标记符
var isTrue2 = false; //密码错误标记符
var isTrue3 = false; //确认密码错误标记符
var isTrue4 = false; //姓名错误标记符
var isTrue5 = false; //证件号码错误标记符
var isTrue6 = false; //邮箱错误标记符
var isTrue7 = false; //手机号码错误标记符


//用户名验证
userName.onblur = function() {
    if (pattern.userName.test(userName.value) == false) {
        checkResult[0].innerHTML = '6-30为字母、数字或“_”，字母开头';
        checkResult[0].style.color = 'red';
        isTrue1 = false;
    } else {
        checkResult[0].innerHTML = '用户名输入正确';
        checkResult[0].style.color = 'green';
        isTrue1 = true;
    }
}

//密码验证
password.onblur = function() {
    if (pattern.password.test(password.value) == false) {
        pwWrongTip.style.display = 'block';
        tips.style.display = 'none';
        isTrue2 = false;
    } else {
        pwWrongTip.style.display = 'none';
        tips.style.display = 'inline-block';
        if (/^\d{6,20}$|^[a-zA-Z]{6,20}$|^\W{6,20}$/.test(password.value)) {
            addCls(s[0], 's1');
            delCls(s[1], 's2');
            delCls(s[2], 's3');
        } else if (/^[^\d]{6,20}$|^[^a-zA-Z]{6,20}$|^[^\W]{6,20}$/.test(password.value)) {
            addCls(s[0], 's1');
            addCls(s[1], 's2');
            delCls(s[2], 's3');

        } else {
            addCls(s[0], 's1');
            addCls(s[1], 's2');
            addCls(s[2], 's3');
        }
        isTrue2 = true;
    }

}

//确认密码验证
password_.onblur = function() {
    if (password_.value == '') {
        checkResult[2].innerHTML = '密码不能为空';
        checkResult[2].style.color = 'red';
        isTrue3 = false;
    } else if (password_.value != password.value) {
        checkResult[2].innerHTML = '两次密码输入不一致，请重新输入';
        checkResult[2].style.color = 'red';
        isTrue3 = false;
    } else {
        checkResult[2].innerHTML = '两次输入一致';
        checkResult[2].style.color = 'green';
        isTrue3 = true;
    }
}

//姓名验证
fullName.onblur = function() {
    if (fullName.value == '') {
        nameRule.style.display = 'block';
        nameWrongTip.style.display = 'none';
        nameRightTip.style.display = 'none';
        isTrue4 = false;

    } else if (pattern.fullName.test(fullName.value) == false) {
        nameWrongTip.style.display = 'block';
        nameRule.style.display = 'none';
        nameRightTip.style.display = 'none';
        isTrue4 = false;
    } else {
        nameRightTip.style.display = 'block';
        nameWrongTip.style.display = 'none';
        nameRule.style.display = 'none';
        isTrue4 = true;
    }
}

//证件号验证
idCardNum.onblur = function() {
    if (pattern.idCardNum.test(idCardNum.value) == false) {
        checkResult[5].innerHTML = '请输入18位身份证号码';
        checkResult[5].style.color = 'red';
        isTrue5 = false;
    } else {
        checkResult[5].innerHTML = '号码输入正确';
        checkResult[5].style.color = 'green';
        isTrue5 = true;
    }
}

//邮箱验证
perEmail.onblur = function() {
    if (pattern.perEmail.test(perEmail.value) == false) {
        checkResult[6].innerHTML = '请输入正确的邮箱';
        checkResult[6].style.color = 'red';
        isTrue6 = false;
    } else {
        checkResult[6].innerHTML = '邮箱格式正确';
        checkResult[6].style.color = 'green';
        isTrue6 = true;
    }
}

//手机号码验证
phoneNum.onblur = function() {
    if (pattern.phoneNum.test(phoneNum.value) == false) {
        checkResult[7].innerHTML = '您输入的手机号码不是有效的格式！';
        checkResult[7].style.color = 'red';
        isTrue7 = false;

    } else {
        checkResult[7].innerHTML = '手机格式正确';
        checkResult[7].style.color = 'green';
        isTrue7 = true;
    }
}

//下一步验证
btn.onclick = function() {
    if (isTrue1 && isTrue2 && isTrue3 && isTrue4 && isTrue5 && isTrue6 && isTrue7 && checkBox.checked == true) {
        window.open('https://www.imooc.com');

    } else if (isTrue1 && isTrue2 && isTrue3 && isTrue4 && isTrue5 && isTrue6 && isTrue7 && checkBox.checked == false) {
        alert('请勾选\"我已阅读并同意遵守\"');
    } else {
        alert("请完善填写信息！")
        return false;
    }
}