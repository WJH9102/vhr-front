<template>
  <div>
    <el-form
      :model="loginForm"
      ref="loginFormRef"
      :rules="loginRule"
      class="loginContainer"
    >
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          @keydown.enter.native="submitLogin"
        ></el-input>
      </el-form-item>
      <el-checkbox size="normal" class="loginRemember" v-model="checked">
      </el-checkbox>
      记住密码
      <el-button
        size="normal"
        type="primary"
        @click="submitLogin"
        style="width: 100%;"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      },
      loginRule: {
        username: [{ require: true, message: "请输入用户名", trigger: blur }],
        password: [{ require: true, message: "请输入密码", trigger: blur }]
      },
      checked: true
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.postKeyValueRequest("/api/doLogin", this.loginForm).then(res => {
            if (res) {
              this.$message.success(res.msg);
              window.sessionStorage.setItem("user", JSON.stringify(res.data));
              let path = this.$route.query.redirect;
              this.$router.replace(
                path === "/" || path === undefined ? "/home" : path
              );
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
