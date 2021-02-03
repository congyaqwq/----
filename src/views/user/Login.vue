<template>
  <div class="content center-flex">
    <div class="egg">
      <a
        target="_blank"
        href="https://www.iconfont.cn/illustrations/detail?spm=a313x.7781069.1998910419.d9df05512&cid=28601"
      >
        <img :src="require(`@/static/${img}.png`)" alt />
      </a>
    </div>
    <div class="login-form center-flex">
      <a-form-model :model="form" ref="form">
        <a-form-model-item label="用户名" v-bind="formItemLayout">
          <a-input v-model="form.username"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" v-bind="formItemLayout">
          <a-input type="password" v-model="form.password"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <div class="action-box center-flex">
            <a-button type="primary" @click="toLogin('')">登录</a-button>
            <a-button @click="toLogin('visitor')">访客</a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import * as localData from "@/utils/localData";
import * as Api from "@/api/user";

export default {
  data() {
    return {
      form: {},
      img: Math.floor((Math.random() * 100) % 4)
    };
  },
  methods: {
    async toLogin(type) {
      let d =
        type == "visitor"
          ? {
              username: "visitor",
              password: "visitor"
            }
          : {
              ...this.form
            };
      d.password = md5(d.password);
      const { data: token } = await Api.login(d);
      localData.set("lc_blog_manage", token, 10);
      this.$router.push("/blog");
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
}
.egg {
  position: absolute;
  top: calc(50% - 200px);
  transform: translateY(0);
  img {
    width: 100px;
    &:hover {
      animation: jump 0.5s ease-in-out;
      transform: translateY(-100px);
    }
  }
}
.login-form {
  position: relative;
  padding: 20px 20px;
  width: 400px;
  height: 300px;
  border-radius: 12px;
  border: 1px solid #eee;
  background-color: #fff;
  z-index: 2;
  & /deep/ .ant-form {
    width: 100%;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100px);
  }
}
</style>