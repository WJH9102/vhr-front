<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        v-model="pos.name"
        @keydown.enter.native="handleAdd"
      >
      </el-input>
      <el-button
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="handleAdd"
        >添加</el-button
      >
    </div>
    <div class="posManaMain">
      <el-table
        :data="positions"
        border
        size="small"
        stripe
        style="width: 70%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="55"> </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180">
        </el-table-column>
        <el-table-column prop="createDate" width="150" label="创建时间">
        </el-table-column>
        <el-table-column label="是否启用" width="150">
          <template slot-scope="scope">
            <el-tag size="small" type="success" v-if="scope.row.enabled"
              >已启用</el-tag
            >
            <el-tag size="small" type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="danger"
        size="small"
        style="margin-top: 8px"
        :disabled="multipleSelection.length === 0"
        @click="deleteMany"
        >批量删除</el-button
      >
    </div>
    <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <div>
          <el-tag>职位名称</el-tag>
          <el-input
            class="updatePosInput"
            size="small"
            v-model="updatePos.name"
          ></el-input>
        </div>
        <div>
          <el-tag>是否启用</el-tag>
          <el-switch
            v-model="updatePos.enabled"
            active-text="启用"
            inactive-text="禁用"
          >
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pos: {
        name: ""
      },
      dialogVisible: false,
      loading: false,
      updatePos: {
        name: "",
        enabled: false
      },
      multipleSelection: [],
      positions: []
    };
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    initPositions() {
      this.getRequest("/api/system/basic/pos/").then(res => {
        if (res) {
          this.positions = res;
        }
      });
    },
    handleEdit(pos) {
      this.dialogVisible = true;
      Object.assign(this.updatePos, pos);
    },
    doUpdate() {
      this.putRequest("/api/system/basic/pos/", this.updatePos).then(res => {
        if (res) {
          this.$message.success(res.msg);
          this.initPositions();
          this.updatePos.name = "";
          this.dialogVisible = false;
        }
      });
    },
    handleDelete(pos) {
      this.$confirm(
        "此操作将永久删除【" + pos.name + "】，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest(`/api/system/basic/pos/${pos.id}`).then(res => {
            if (res) {
              this.$message.success(res.msg);
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAdd() {
      if (!this.pos.name) {
        return this.$message.error("职位名称不能为空!");
      }
      this.postRequest("/api/system/basic/pos/", this.pos).then(res => {
        if (res) {
          this.$message.success(res.msg);
          this.initPositions();
          this.pos.name = "";
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteMany() {
      this.$confirm(
        `此操作将永久删除${this.multipleSelection.length}条记录，是否继续？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach(item => {
            ids += `ids=${item.id}&`;
          });
          this.deleteRequest(`/api/system/basic/pos/${ids}`).then(res => {
            if (res) {
              this.$message.success(res.msg);
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

.updatePosInput {
  width: 200px;
  margin-left: 8px;
}

.posManaMain {
  margin-top: 10px;
}
</style>
