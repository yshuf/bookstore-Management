<template>
  <div id="userCenter">
    <div class="top-block">
      <div class="top-block-info">
        <div class="avator">
          <img src="/static/images/ent/headimg.png" />
        </div>
        <div class="title">
          <p class="title_welcome">
            您好，
            <span>{{userName}}</span>，欢迎来到邢易融绿色金融综合服务平台
          </p>
          <p
            class="title_introduce"
          >平台介绍 &nbsp;&nbsp;|&nbsp;&nbsp; “一站式”解决中小企业“融资难，融资贵，融资慢”的问题，实现金融领域“最多跑一次”</p>
        </div>
      </div>
    </div>
    <div class="personalInfo">
      <div class="personalInfo-content">
        <div class="personalInfo-title">个人信息</div>
        <div class="personalInfo-introduce">
          <div class="left-list">
            <span class="left-txt">姓名：</span>
            <span class="right-txt">{{userInfo.realName}}</span>
          </div>
          <div class="left-list">
            <span class="left-txt">手机号码：</span>
            <span class="right-txt">
              {{userInfo.phone}}
              <i
                class="iconfont icon-bianjixiugai"
                title="修改手机号"
                @click="orgEdit('修改手机号','resetPhone',resetPhone)"
              ></i>
            </span>
          </div>
          <div class="left-list">
            <span class="left-txt">登录密码：</span>
            <span class="right-txt">
              {{userInfo.password}}
              <i
                class="iconfont icon-bianjixiugai"
                title="修改密码"
                @click="orgEdit('修改密码','resetPass',resetPass)"
              ></i>
            </span>
          </div>
          <div class="left-list">
            <span class="left-txt">所属机构：</span>
            <span class="right-txt">{{userInfo.bank}}</span>
          </div>
          <div class="left-list" v-if="userInfo.isBranch=='Y'">
            <span class="left-txt">所属支行：</span>
            <span class="right-txt">{{userInfo.branch}}</span>
          </div>
          <div class="left-list">
            <span class="left-txt">岗位：</span>
            <span class="right-txt">{{userInfo.position}}</span>
          </div>
        </div>
      </div>
      <div class="personalInfo-content">
        <div class="personalInfo-title">
          机构信息
          <span class="personalInfo-title-state">已审核</span>
        </div>
        <div class="personalInfo-introduce">
          <div class="left-list">
            <span class="left-txt">机构全称：</span>
            <span class="right-txt">{{userInfo.realName}}</span>
          </div>
          <div class="left-list">
            <span class="left-txt">机构简称：</span>
            <span class="right-txt">{{userInfo.phone}}</span>
          </div>
          <div class="left-list">
            <span class="left-txt">更多信息：</span>
            <span class="right-txt edit-txt" @click="jumpTo('editingMaterials')">编辑信息</span>
          </div>
        </div>
      </div>
      <div class="personalInfo-content">
        <div class="personalInfo-title">使用须知</div>
        <div class="instruction-list">
          <div
            class="instruction-list-item"
            v-for="(item, i) in instructionList.filter(item => item.type != 6)"
            :key="i"
            @click="getInstruction(item.type, item.content)"
          >
            <span class="order">{{i + 1}}</span>
            <span class="article">{{item.title}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改手机号模态框 -->
    <Modal :visible.sync="modelData.isVisible" :modelWidth="modelData.width*1">
      <div slot="title">
        <p class="typeface">{{modelData.title}}</p>
      </div>
      <div slot="content">
        <div class="content reset-content" v-if="modelData.modelType=='resetPhone'">
          <div class="input-row">
            <div class="input-label">手机号：</div>
            <div class="input-text">
              <input
                class="text input-border"
                type="tel"
                placeholder="请输入11位新手机号"
                v-model="modelData.data.phone"
                maxlength="11"
              />
              <input class="codebtn" type="button" value="获取验证码" @click="getSetTime" />
            </div>
          </div>
          <div class="text-tip">必须为11位的手机号（仅支持中国大陆）</div>
          <div class="input-row">
            <div class="input-label">手机验证码：</div>
            <div class="input-text">
              <input
                type="number"
                class="text input-border"
                placeholder="请输入验证码"
                v-model="modelData.data.smsCode"
                oninput="if(value.length>6)value=value.slice(0,6)"
              />
            </div>
          </div>
          <div class="submitBtnBox align-r">
            <ys-button class="btn btn-reset" @click="deleInfo">取消</ys-button>
            <ys-button @click="editPhone" type="primary" useType="debounce">确定</ys-button>
          </div>
        </div>
        <div class="content reset-content" v-if="modelData.modelType=='resetPass'">
          <div class="input-row">
            <div class="input-label">旧密码：</div>
            <div class="input-text">
              <input
                type="text"
                placeholder="请输入旧密码"
                class="text input-border"
                v-model="modelData.data.oldPassword"
              />
            </div>
          </div>
          <div class="input-row">
            <div class="input-label">新密码：</div>
            <div class="input-text">
              <input
                type="text"
                placeholder="请输入新密码"
                class="text input-border"
                v-model="modelData.data.newPassword"
              />
            </div>
          </div>
          <div class="input-row">
            <div class="input-label">再次输入：</div>
            <div class="input-text">
              <input
                type="text"
                placeholder="请再次输入密码"
                class="text input-border"
                v-model="modelData.data.newPasswordAgain"
              />
            </div>
          </div>
          <div class="submitBtnBox align-r">
            <ys-button class="btn btn-reset" @click="deleInfo">取消</ys-button>
            <ys-button @click="editPassword" type="primary" useType="debounce">确定</ys-button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import YsButton from '@/components/common/YsButton'
// import { setStore, MessageBox, setTime, checkPassword, checkPhone, getStore, removeStore } from '../../utils/common'
// import md5 from '../../../static/md5'

export default {
  name: 'userCenter',
  components: {
    YsButton,
    MessageBox
  },
  data () {
    return {
      instructionList: [],
      // 用户信息
      userInfo: {},
      // 用户名
      userName: '',
      // 模态框
      modelData: {
        isVisible: false
      },
      // 手机号信息
      resetPhone: {
        phone: '',
        smsCode: ''
      },
      // 密码信息
      resetPass: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getList()
    this.userName = JSON.parse(getStore('userInfo')).realName
  },
  methods: {
    // 获取隐私政策列表
    getList () {
      this.ajaxRequest({
        type: 'get',
        url: '/useNotice/findList',
        param: {},
        dataType: 'json',
        successfn: res => {
          console.log(res)
          this.instructionList = res.data
        },
        errorfn: e => {
          console.log(e)
        }
      })
    },
    // 查看隐私政策
    getInstruction (type, path) {
      if (type === 4) window.open('/notice.html?type=privacy', '_blank')
      else if (type === 5) window.open('/notice.html?type=userTCP', '_blank')
    },
    // 获取用户个人信息
    getUserInfo () {
      let that = this
      this.ajaxRequest({
        type: 'get',
        url: '/inst/user/userInfo',
        dataType: 'json',
        successfn: function (res) {
          console.log(res)
          if (res.code === '0000') {
            that.userInfo = res.data
            console.log(that.userInfo)
          }
        },
        errorfn (res) {
          console.log(res.data)
        }
      })
    },
    // 编辑框
    orgEdit (title, modelType, data) {
      let that = this
      let param = {
        'isVisible': true,
        'modelType': modelType,
        'title': title,
        'width': 560,
        'data': data
      }
      that.modelData = param
      console.log(that.modelData.data)
    },
    // 修改密码
    editPassword () {
      let that = this
      let param2
      let { oldPassword, newPassword, newPasswordAgain } = this.modelData.data
      param2 = { oldPassword, newPassword, newPasswordAgain }
      if (param2.newPassword !== param2.newPasswordAgain) {
        MessageBox({
          content: '两次输入的密码不相同',
          autohide: true
        })
        return
      }
      if (!checkPassword(param2.newPassword)) {
        return false
      }
      // md5???????
      for (let key in param2) {
        if (param2[key]) {
          param2[key] = $.md5(param2[key])
        }
      }
      // ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$

      that.ajaxRequest({
        type: 'post',
        param: param2,
        url: '/inst/user/resetPasswordOfBank',
        dataType: 'json',
        successfn: function (res) {
          if (res.code === '0000') {
            console.log(res.msg)
            MessageBox({
              content: `密码修改成功，请重新 <span onclick="pageJump('/login')" class="txt-primary pointer" >登录</span>，3秒后自动跳转`,
              autohide: false
            })
            that.modelData.isVisible = false
            setTimeout(function () {
              removeStore('userInfo')
              removeStore('token')
              setStore('loginType', 2)
              that.pageJump('/login')
            }, 3000)
          }
        },
        errorfn: function (error) {
          MessageBox({
            content: error.msg,
            autohide: true
          })
        }
      })
    },
    // 修改手机号
    editPhone () {
      let that = this
      if (!checkPhone(that.modelData.data.phone)) return
      that.ajaxRequest({
        type: 'get',
        param: this.modelData.data,
        url: '/inst/user/updatePhoneValidSms',
        dataType: 'json',
        successfn: function (res) {
          if (res.code === '0000') {
            that.modelData.isVisible = false
            that.resetPhone = {
              phone: '',
              smsCode: ''
            }
            MessageBox({
              content: `手机号修改成功，请重新 <span onclick="pageJump('/login')" class="txt-primary pointer" >登录</span>，3秒后自动跳转`,
              autohide: true
            })
            setTimeout(function () {
              removeStore('userInfo')
              removeStore('token')
              setStore('loginType', 2)
              that.pageJump('/login')
            }, 3000)
          }
        },
        errorfn: function (error) {
          MessageBox({
            content: error.msg,
            autohide: true
          })
        }
      })
    },
    // 获取验证码
    getSetTime (e) {
      let that = this
      if (!checkPhone(that.modelData.data.phone)) {
        return false
      }
      that.ajaxRequest({
        type: 'get',
        url: '/inst/user/sendValidCode',
        param: {
          phone: that.modelData.data.phone
        },
        dataType: 'json',
        successfn: function (res) {
          console.log(res)
          MessageBox({
            content: res.msg,
            autohide: true
          })
          setTime(e.target)
        },
        errorfn: function (e) {
          MessageBox({
            content: e.msg,
            autohide: true
          })
          // that.message(e.msg)
        }
      })
    },
    // 取消删除输入信息
    deleInfo () {
      let that = this
      that.modelData.isVisible = false
      that.resetPhone = {
        phone: '',
        smsCode: ''
      }
      console.log('phone')
      that.resetPass = {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    },
    jumpTo (d) {
      let that = this
      that.$router.push({
        path: d,

      })
    },
  }

}
</script>

<style scoped lang="scss">
#userCenter {
  width: 97%;
  margin: 1rem auto;

  .top-block {
    /*background-color: #fff;*/
    height: 161px;
    display: flex;
    align-items: center;
    background: #fff url('../../../static/images/inst/business-bg.png') bottom
      right no-repeat;
    background-size: 60% 110px;

    .top-block-info {
      display: flex;
      align-items: center;

      .avator {
        margin-left: 30px;
        margin-right: 15px;
      }

      .title {
        display: flex;
        flex-direction: column;
        font-family: PingFangSC-Mediumng;
        text-align: left;

        .title_welcome {
          height: 28px;
          line-height: 28px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 20px;
          marign-top: -10px;
          margin-bottom: 12px;

          span {
            color: #1c92ff;
          }
        }

        .title_introduce {
          height: 22px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }

  .personalInfo {
    margin: 1rem auto;
    background: #fff;
    overflow: hidden;

    .personalInfo-content {
      width: 95%;
      height: 173px;
      border-radius: 4px;
      box-sizing: border-box;
      margin: 22px auto;
      border: 1px solid rgba(233, 233, 233, 1);
      padding-top: 12px;

      .personalInfo-title {
        position: relative;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        text-align: left;
        padding-left: 30px;
        font-weight: bold;
        line-height: 26px;
        .personalInfo-title-state {
          display: inline-block;
          text-align: center;
          width: 80px;
          border: 1px solid deepskyblue;
          background-color: skyblue;
          font-size: 12px;
          font-weight: normal;
          line-height: 26px;
          margin-left: 20px;
          border-radius: 5px;
          color: #0a76ff;
        }
        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: 4px;
          height: 26px;
          border-radius: 4px;
          background-color: rgba(24, 144, 255, 1);
        }
      }

      .personalInfo-introduce {
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        padding-left: 24px;

        .left-list {
          width: 33%;
          line-height: 40px;

          span {
            font-size: 14px;
          }

          .left-txt {
            color: rgba(0, 0, 0, 0.85);
          }

          .right-txt {
            color: rgba(0, 0, 0, 0.65);

            .iconfont {
              display: inline-block;
              margin-left: 37px;
              cursor: pointer;
              color: rgba(153, 169, 169, 1);
              font-size: 16px;

              &:hover {
                color: $color-primary;
              }
            }
          }
          .edit-txt {
            color: #00ff80;
            cursor: pointer;
          }
        }
      }

      .instruction-list {
        margin: 20px 0;
      }

      .instruction-list-item {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);

        &:hover {
          color: rgba(18, 141, 233, 1);
          border-bottom: 1px dashed rgba(18, 141, 233, 1);
          transform: translateY(-1px);
        }

        .order {
          display: inline-block;
          width: 50px;
          text-align: center;
        }
      }
    }
  }
}
.reset-content {
  padding: 0 20px 0 20px;

  .input-row {
    .input-label {
      &:before {
        content: '*';
        color: rgba(255, 0, 0, 1);
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    }

    .input-text {
      width: 250px;
    }
  }

  .text-tip {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-bottom: 1rem;
    margin-left: 150px;
  }
}

.btn {
  padding: 0 10px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.btn-reset {
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-right: 8px;
}
</style>
