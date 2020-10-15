<template>
  <div>
    <div>
      <el-dialog
        :title="info.isAdd ? '添加角色' : '编辑角色'"
        :visible.sync="info.isshow"
        @closed="close"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="角色权限">
            <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children', label:'title',}"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/aletr";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form:{
        rolename:'',
        menus:'[]',
        status:1,
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
       reqRoleList:"role/reqListActios"
    }),
    //取消
    cancel() {
      this.info.isshow = false;
    },
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([])
    },
     add() {
    this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
    reqRoleAdd(this.form).then((res) => {
      if (res.data.code == 200) {
        successAlert(res.data.msg);
        this.empty();
        this.cancel();
        this.reqRoleList();
      } else {
        warningAlert(res.data.msg);
      }
    });
  },
 look(id) {
    reqRoleDetail(id).then((res) => {
      if (res.data.code == 200) {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
      } else {
        warningAlert(res.data.msg);
      }
    });
  },
 update() {
    this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    reqRoleUpdate(this.form).then((res) => {
      if (res.data.code == 200) {
        successAlert(res.data.msg);
        this.empty();
        this.cancel();
        this.reqRoleList();
      } else {
        warningAlert(res.data.msg);
      }
    });
  },

  },
  mounted() {
    if(this.menuList.length==0){
      this.reqMenuListAction()
    }
  },
};
</script>
<style scoped>
</style>