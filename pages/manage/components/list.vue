<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="用户编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="title" label="用户名称" sortable width="180">
    </el-table-column>
      <el-table-column prop="title" label="所属角色" sortable width="180">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
         <!-- <del-btn @confirm="dele(scope.row.uid)"></del-btn> -->
      </template>
    </el-table-column>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change="changePage"
    >
    </el-pagination>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/aletr";
import { reqManageDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
  
  list:'manage/list',
       size:'manage/size',
       total:'manage/total'
    }),
   
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      reqTotalAction:'manage/reqTotalAction',
      changePageAction:"manage/changePageAction"
    }),
   
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
   dele(uid) {
      //点了确定按钮
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
 changePage(e){
      this.changePageAction(e)
    },


  mounted() { 
    this.reqListAction();
    this.reqTotalAction();
  },
};
</script>
<style scoped>
</style>