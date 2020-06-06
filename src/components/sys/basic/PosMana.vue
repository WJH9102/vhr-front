<template>
  <div>
    <div>
      <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位..."
        prefix-icon="el-icon-plus"
        v-model="pos.name"
      >
      </el-input>
      <el-button icon="el-icon-plus" size="small" type="primary"
        >添加</el-button
      >
    </div>
    <div class="posManaMain">
      <el-table :data="positions" border size="small" stripe style="width: 70%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="55"> </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180">
        </el-table-column>
        <el-table-column prop="createDate" width="150" label="创建时间">
        </el-table-column>
      </el-table>
    </div>
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
