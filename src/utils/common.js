import $ from 'jquery'
// import { pageJump } from './https';


/**
 * 随机1-num之间的值
 * 示例:
 *    num=3, isIncludeZero=false, 返回 0,1,2,3
 *    num=3, isIncludeZero=true, 返回 1,2,3
 *
 * @param num
 * @param isIncludeZero
 * @returns {number}
 */
export function random (num, isIncludeZero) {
    var result = Math.floor((Math.random() * 10)) % 3;
    return isIncludeZero ?
        Math.floor((Math.random() * 10)) % (num + 1) : Math.floor((Math.random() * 10)) % num + 1;
}

/**
 * 日期格式转换
 *
 * @param date
 * @param fmt
 * @returns {*}
 */
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt

    function padLeftZero (str) {
        return ('00' + str).substr(str.length)
    }
}

/**
 * 返回农历日期
 *
 * @returns {*}
 */
export function showCal (date) {
    //定义全局变量
    let CalendarData = new Array(100);
    let madd = new Array(12);
    const tgString = "甲乙丙丁戊己庚辛壬癸";
    const dzString = "子丑寅卯辰巳午未申酉戌亥";
    const numString = "一二三四五六七八九十";
    const monString = "正二三四五六七八九十冬腊";
    const weekString = "日一二三四五六";
    const sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    let cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    let D = date || new Date();
    let yy = D.getFullYear();
    let mm = D.getMonth() + 1;
    let dd = D.getDate();
    if (yy < 100) yy = "19" + yy;
    return GetLunarDay(yy, mm, dd);


    function GetBit (m, n) {
        return (m >> n) & 1;
    }

    //农历转换
    function e2c () {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        let total, m, n, k;
        let isEnd = false;
        let tmp = TheDate.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true;
                    break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
            }
            if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
            }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
            }
        }
    }

    function GetcDateString () {
        let tmp = "";
        /*显示农历年：（ 如：甲午(马)年 ）*/
		/*tmp+=tgString.charAt((cYear-4)%10);
		 tmp+=dzString.charAt((cYear-4)%12);
		 tmp+="(";
		 tmp+=sx.charAt((cYear-4)%12);
		 tmp+=")年 ";*/
        if (cMonth < 1) {
            tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1);
        } else {
            tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) {
            tmp += numString.charAt((cDay - 1) % 10);
        }
        return tmp;
    }

    function GetLunarDay (solarYear, solarMonth, solarDay) {
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString();
        }
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 获取url中的参数
 *
 * @param key
 * @returns {string}
 */
export function getUrlParam (key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

/**
 * 判断是否为空对象
 *
 * @param obj
 * @returns {Boolean}
 */
export function isObj (obj) {
    for (let key in obj) {
        return true;
    }
    return false;
}

/**
 * 前端分页
 *        pageSize 每页显示条数
 *        pageNum  当前页码
 *        listdata 当前列表数据
 *
 * @param pageSize pageNum listdata
 */
export function staticpage (pageSize, pageNum, listdata) {
    let min = pageSize * (pageNum - 1);
    let max = pageSize * (pageNum);
    let len = listdata.length;
    let list = []
    for (let i = 0; i < len; i++) {
        if (i >= min && i < max) {
            list.push(listdata[i])
        }
    }
    return list
}

/**
 * 提示模态框
 * opt ： 配置项
 */
export function ConfirmBox (opt) {
    var textTemplate = {
        title: opt.title || '提示',
        content: opt.content || '',
        contentColor: opt.contentColor || '#fff',
        okBtn: opt.okBtn || '确 定',
        cancelBtn: opt.cancelBtn || '取 消',
        okBtnColor: opt.okBtnColor || '#227AE6',
        cancelBtnColor: opt.cancelBtnColor || '#fff',
        onOkbtn: opt.onOkbtn || '',
        oncancelBtn: opt.oncancelBtn || '',
    };

    var modal = '<div class="ConfirmBox-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<div class="modal-title"><i class="iconfont icon-info-circle"></i><span class="title-txt">' + textTemplate.title + '</span></div>' +
        '<div class="modal-info">' + textTemplate.content + '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button class="btn btn-gray canclebtn btnCancelHover" style="background-color:' + textTemplate.cancelBtnColor + ';">' + textTemplate.cancelBtn + '</button>' +
        '<button class="btn btn-custom surebtn btnHover" style="background-color:' + textTemplate.okBtnColor + ';border:1px solid ' + textTemplate.okBtnColor + '">' + textTemplate.okBtn + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(document.body).append(modal);
    var $ConfirmBoxdialog = $(".ConfirmBox-dialog")
    $ConfirmBoxdialog.fadeIn()
    //确定
    $(".surebtn").on("click", function () {
        $(this).attr('disabled', true);
        setTimeout(function () {
            $(this).attr('disabled', false)
        }, 500)
        if (textTemplate.onOkbtn) {
            textTemplate.onOkbtn();
        }
        removemodaldialog()
    });

    //取消
    $(".canclebtn,.ConfirmBox-dialog").on("click", function () {
        if (textTemplate.oncancelBtn) {
            textTemplate.oncancelBtn();
        }
        removemodaldialog()
    });

    $(".ConfirmBox-dialog .modal-content").click(function (e) {
        e.stopPropagation();
    });

    function removemodaldialog () {
        $ConfirmBoxdialog.fadeOut()
        setTimeout(function () {
            $ConfirmBoxdialog.remove()
        }, 500)
    }
}

/**
 * 简单消息模态框
 * opt ： 配置项
 */
export function MessageBox (opt) {
    if ($(".MessageBox-dialog").length > 0) {
        $(".MessageBox-dialog").remove();
    }
    var textTemplate = {
        title: opt.title || '提示',
        content: opt.content || '',
        contentColor: opt.contentColor || '#fff',
        position: opt.position || 'topright',
        autohide: opt.autohide || false,
        state: opt.state || '消息',
    };


    var $position = '';
    if (textTemplate.position === 'topleft') {
        $position = 'left: -500px;top: 80px;'
    } else if (textTemplate.position === 'topright') {
        $position = 'right: -500px;top: 80px;'
    } else if (textTemplate.position === 'bottomleft') {
        $position = 'left: -500px;bottom: 60px;'
    } else if (textTemplate.position === 'bottomright') {
        $position = 'right: -500px;bottom: 60px;'
    } else if (textTemplate.position === 'center') {
        $position = 'top: -150px; left:50%; margin-left:-150px;'
    }

    var $fontcolor = '#909399',
        $fontfamily = 'icon-info-circle';
    if (textTemplate.state === '消息') {
        $fontcolor = '#909399'
        $fontfamily = 'icon-info-circle';
    } else if (textTemplate.state === '成功') {
        $fontcolor = '#67c23a'
        $fontfamily = 'icon-check-circle';
    } else if (textTemplate.state === '警告') {
        $fontcolor = '#e6a23c'
        $fontfamily = 'icon-info-circle';
    } else if (textTemplate.state === '错误') {
        $fontcolor = '#f56c6c'
        $fontfamily = 'icon-close-circle';
    }

    var modal = '<div class="MessageBox-dialog" style="' + $position + '">' +
        '<div class="modal-content" style="background-color: ' + textTemplate.contentColor + '">' +
        '<div class="modal-body">' +
        '<a href="javascript:void(0)" class="messageclosed">×</a>' +
        '<p class="modal-title"><i class="iconfont ' + $fontfamily + '" style="color: ' + $fontcolor + '"></i><span class="title-txt">' + textTemplate.title + '</span></p>' +
        '<p class="modal-info">' + textTemplate.content + ' </p>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(document.body).append(modal);
    var $MessageBoxdialog = $(".MessageBox-dialog");
    $MessageBoxdialog.fadeIn()
    if (textTemplate.position === 'topleft') {
        $MessageBoxdialog.animate({ left: '20px' })
    } else if (textTemplate.position === 'topright') {
        $MessageBoxdialog.animate({ right: '20px' })
    } else if (textTemplate.position === 'bottomleft') {
        $MessageBoxdialog.animate({ left: '20px' })
    } else if (textTemplate.position === 'bottomright') {
        $MessageBoxdialog.animate({ right: '20px' })
    } else if (textTemplate.position === 'center') {
        $MessageBoxdialog.animate({ top: '60px' })
    }

    //取消
    $(".MessageBox-dialog .messageclosed,.MessageBox-dialog").on("click", function () {
        removemodalmessage()
    });
    $(".MessageBox-dialog .modal-content").click(function (e) {
        e.stopPropagation();
    });

    function removemodalmessage () {
        $MessageBoxdialog.fadeOut()
        setTimeout(function () {
            $MessageBoxdialog.remove();
        }, 500)
    }

    if (textTemplate.autohide) {
        setTimeout(function () {
            removemodalmessage()
        }, 3000)
    }
}

/**
 * 简单消息条
 * opt ： 配置项
 */
export function MessageHint (opt) {
    var textTemplate = {
        // title: opt.title || '提示',
        content: opt.content || '',
        state: opt.state || '消息',
        autohide: opt.autohide || false,
    };

    let $contentColor = '#ebeef5', $fontcolor = '#909399', $fontfamily = 'icon-info-circle';
    if (textTemplate.state === '消息') {
        $contentColor = '#ebeef5'
        $fontcolor = '#909399'
        $fontfamily = 'icon-info-circle';
    } else if (textTemplate.state === '成功') {
        $contentColor = '#f0f9eb'
        $fontcolor = '#67c23a'
        $fontfamily = 'icon-check-circle';
    } else if (textTemplate.state === '警告') {
        $contentColor = '#fdf6ec'
        $fontcolor = '#e6a23c'
        $fontfamily = 'icon-info-circle';
    } else if (textTemplate.state === '错误') {
        $contentColor = '#fef0f0'
        $fontcolor = '#f56c6c'
        $fontfamily = 'icon-close-circle';
    }

    let modal = '<div class="MessageBox-hint">' +
        '<div class="modal-content" style="background-color: ' + $contentColor + '">' +
        '<div class="modal-body">' +
        '<a href="javascript:void(0)" class="messageclosed">×</a>' +
        '<p class="modal-title"><i class="iconfont ' + $fontfamily + '" style="color: ' + $fontcolor + '"></i><span class="title-txt">' + textTemplate.content + '</span></p>' +
        '</div>' +
        '</div>' +
        '</div>';

    $(document.body).append(modal);
    let $MessageBoxhint = $(".MessageBox-hint")
    $MessageBoxhint.fadeIn()

    //取消
    $(".MessageBox-hint .messageclosed,.MessageBox-hint").on("click", function () {
        removemodalmessage()
    });
    $(".MessageBox-hint .modal-content").click(function (e) {
        e.stopPropagation();
    });

    function removemodalmessage () {
        $MessageBoxhint.fadeOut()
        setTimeout(function () {
            $MessageBoxhint.remove();
        }, 500)
    }

    if (textTemplate.autohide) {
        setTimeout(function () {
            removemodalmessage()
        }, 3000)
    }
}

/**
 * 滚动到目标位置
 * opt ： e
 */
export function totarget (e) {
    let $id = e,
        tempheight
    if ($('#basicinfo .topbox').height() > 100) {
        tempheight = 255
    } else {
        tempheight = 115
    }
    if ($($id).offset()) {
        //$(".menunode .section").css({'height': 'auto', 'opacity': '1'})
        // 移动页面到对应的楼层
        let _top = $($id).offset().top
        let _hight = $(".indexscroll .__panel").scrollTop();
        $(".indexscroll .__panel").stop().animate({ scrollTop: (_hight + _top - tempheight) }, 300);
    } else {
        return
    }
}

/**
 * 阻止默认浏览器动作
 * opt ： e
 */
export function stopDefault (e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.preventDefault) {
        //阻止默认浏览器动作(W3C)
        e.preventDefault();
    } else {
        //IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}

/**
 * 获取router url
 * opt ： key
 */
export function getRouterUrl (key) {
    let routerUrl = {
        /** 一级菜单 **/
        '360view': '/search',
        'relation-path': '/associatedpath',
        'risk-warning': '/riskwarning',
        'decision-engine': '/ruleEngine',
        'stat-analysis': '',
        'sys-manage': '/systemManage',
        'lookout': '',
        'business-analysis': '',
        'subject-focus': '/subjectFocus',
        /** 风险预警 **/
        'monitor-board': '/Yjkb',
        'monitor-list': '/Yjjk',
        'monitor-stat': '',
        /** 决策引擎**/
        'data-set': '/',
        'data-signal': '/RiskSignal',
        'data-label': '/LabelManagement',
        /** 系统管理**/
        'role-info': '/',
        'account-info': '/AccountConfig',
        /** 主题聚焦 **/
        'focus-law-cases': '/',
        'focus-bond-issuance': '/focusBondIssuance',
        'focus-financing-lease': '/focusFinancingLease',
        'focus-ent-market': '/focusEntMarket',
        'focus-region-finance': '/focusRegionFinance',
        'focus-finance-analysis': '/focusFinanceAnalysis',
        'focus-stock-pledge': '/focusStockPledge',
        /** 业务分析 **/
        'industry-classify': '/',
        'industry-economic': '/EconomicProperty',
        'industry-provice': '/ProviceClassify',
        'industry-risk-indicate': '/RiskIndicate',
        'industry-tenancy': '/TenancyRegister',
    }
    return routerUrl[key]
}

/**
 * 获取浏览器版本
 * opt ： ''
 */
export function IEVersion () {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 0;//edge
    } else if (isIE11) {
        function addie11mr () {
            let _panel = $(".__panel.__native");
            _panel.each(function () {
                if ($(this).attr("style")) {
                    $(this).addClass('ie11mr')
                } else {
                    $(this).removeClass('ie11mr')
                }
            })
        }

        addie11mr()
        window.addEventListener("resize", function (e) {
            addie11mr()
        });
        return 11; //IE11
    } else {
        return -1;//不是ie浏览器
    }
}

/**
 * 获取验证码倒计时
 * opt ： ''
 */
export function setTime (obj) {
    var countdown = 60;
    timer(obj)

    function timer (obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value = "获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value = "重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function () {
            timer(obj)
        }, 1000)
    }
}

/**
 * 密码格式验证   密码为6到16位数字、字母和特殊字符任意组合
 * opt ： ''
 */
export function checkPassword (password) {
    let msg;
    if (password) {
        if (password.length > 5 && password.length < 17) {
            // let patt = /^[a-zA-Z0-9`~!@#$%^&*()_\-+=<>?:\"{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+$/
            //  /^(?=.[a-zA-Z])(?=.\d)(?=.[~!@#$%^&()_+`-={}:”;’<>?,.\/])$/

            let patt = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[`~!@#$%^&*()_\-+=<>?:\"{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])[a-zA-Z0-9`~!@#$%^&*()_\-+=<>?:\"{}|,.\/;'\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+$/;
            // let pattRegex = new RegExp(patt, "g");3
            if (!patt.test(password)) {
                msg = '格式错误！密码为数字/字母/特殊符号的组合'
            }
            else {
                return true
            }
        }
        else {
            msg = '格式错误！密码长度为6-16位'
        }
    }
    else {
        msg = '密码不能为空'
    }
    if (msg) {
        MessageBox({
            content: msg,
            autohide: true
        })
        return false
    }
}

/**
 * 手机号码验证
 * opt ： phone
 */
export function checkPhone (phone) {
    if (!phone) {
        MessageBox({
            title: '提示',
            content: '请输入手机号码',
            contentColor: '#fff', // 提示框背景颜色
            position: 'topright', // 弹框位置  topright/topleft/bottomleft/bottomright/center
            autohide: true, // 是否自动隐藏 true/false
            state: '消息',  // 状态类型：消息/成功/错误/警告
        })
        return false;
    }
    if (!(/^[1]([3-9])[0-9]{9}$/.test(phone))) {
        MessageBox({
            title: '提示',
            content: '手机号码有误，请重填',
            contentColor: '#fff', // 提示框背景颜色
            position: 'topright', // 弹框位置  topright/topleft/bottomleft/bottomright/center
            autohide: true, // 是否自动隐藏 true/false
            state: '消息',  // 状态类型：消息/成功/错误/警告
        })
        return false;
    } else {
        return true;
    }
}

/**
 * 监控下载windows弹窗
 * opt ： url
 * opt ： 函数
 */
export function newWindowDownLoad (url, fn) {
    var newWindow = window.open(url, "_blank");
    newWindow.focus();

    var loop = setInterval(function () {
        if (newWindow.closed) {
            clearInterval(loop);
            if (fn) fn()
        }
    }, 1000);
}

/*
* 狐火兼容输入框
* */
export function compaNumber (obj) {
    let loanNumber = obj.target.value.replace(/[^\d.]/g, '');
    // 通过正则过滤小数点后两位
    if (loanNumber.toString() !== (loanNumber.match(/^\d*(\.?\d{0,2})/g)[0])) {
        loanNumber = (loanNumber.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    }
    return loanNumber;
}
