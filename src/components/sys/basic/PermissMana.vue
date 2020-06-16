<template>
  <div>
    <div class="permissManaTool">
      <el-input placeholder="请输入权限英文名称" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        v-model="role.nameZh"
        placeholder="请输入权限中文名称"
        @keydown.enter.native="addRole"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="addRole"
        >添加</el-button
      >
    </div>
    <div class="permissManaMail">
      <el-collapse v-model="activeName" @change="change" :accordion="true">
        <el-collapse-item
          :title="r.nameZh"
          :name="r.id"
          v-for="(r, i) in roles"
          :key="i"
        >
          <el-card>
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button
                style="float: right; padding: 3px 0;color: #ff0000;"
                icon="el-icon-delete"
                type="text"
                size="big"
                @click="deleteRole(r)"
              ></el-button>
            </div>
            <div>
              <el-tree
                :props="defaultProps"
                :data="allMenus"
                node-key="id"
                :key="i"
                :default-checked-keys="selectedMenus"
                show-checkbox
                ref="tree"
              >
              </el-tree>
              <div style="display: flex;justify-content: flex-end">
                <el-button @click="cancelUpdate">取消修改</el-button>
                <el-button type="primary" @click="doUpdate(r.id, i)"
                  >确认修改</el-button
                >
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        name: "",
        nameZh: ""
      },
      roles: [],
      activeName: -1,
      defaultProps: {
        children: "children",
        label: "name"
      },
      allMenus: [],
      selectedMenus: []
    };
  },
  mounted() {
    this.initAllRoles();
  },
  methods: {
    addRole() {
      if (this.role.name && this.role.nameZh) {
        this.postRequest("/api/system/basic/permiss/", this.role).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg);
            this.initAllRoles();
            this.role.name = "";
            this.role.nameZh = "";
          }
        });
      } else {
        this.$message.error("添加角色内容不能为空！！！");
      }
    },
    deleteRole(role) {
      this.$confirm(
        "此操作将永久删除【" + role.nameZh + "】角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest(`/api/system/basic/permiss/role/${role.id}`).then(
            resp => {
              if (resp) {
                this.$message.success(resp.msg);
                this.initAllRoles();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    initAllRoles() {
      this.getRequest("/api/system/basic/permiss/").then(res => {
        if (res) {
          this.roles = res;
        }
      });
    },
    initAllMenus() {
      this.getRequest("/api/system/basic/permiss/menus").then(res => {
        if (res) {
          this.allMenus = res;
        }
      });
    },
    initSelectedMenus(rid) {
      this.selectedMenus = [];
      this.getRequest(`/api/system/basic/permiss/mids/${rid}`).then(res => {
        if (res.status === 200) {
          this.selectedMenus = res.data;
        }
      });
    },
    change(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let url = "/api/system/basic/permiss/?rid=" + rid;
      const selectKeys = this.$refs.tree[index].getCheckedKeys(true);
      selectKeys.forEach(key => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then(resp => {
        if (resp) {
          this.$message.success(resp.msg);
          this.activeName = -1;
        }
      });
    }
  }
};
</script>

<style>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}
.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}
.permissManaMail {
  margin-top: 10px;
  width: 700px;
}
</style>
