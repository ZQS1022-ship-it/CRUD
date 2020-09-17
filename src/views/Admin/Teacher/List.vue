<template>
  <div id="teacherlist">
    <div>
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>
          <router-link to="/admin">首页</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/admin/teacher">教师管理</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>教师列表</a-breadcrumb-item>
      </a-breadcrumb>

      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <a-button type="primary" @click="visibleAdd=true">
          添加讲师
          <a-icon type="inbox" />
        </a-button>

        <div v-if="loading">
          <a-spin tip="加载中...">
            <div class="spin-content">教师列表</div>
          </a-spin>
        </div>
        <div v-if="!loading">
          <a-table :columns="columns" :data-source="teacher_list">
            <span slot="img" slot-scope="text,record">
              <img :src="record.img" class="profile" />
            </span>

            <span slot="action" slot-scope="text,record">
              <a-button type="link" @click="goTo('/admin/teacher/detail/'+record.id)">详情</a-button>
              <a-divider type="vertical" />
              <a-button type="link" @click="handleEdit(record)">修改</a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                title="你确定要删除吗"
                ok-text="是的"
                cancel-text="我在想想..."
                @confirm="confirmDel(record.id)"
                @cancel="cancelDel"
              >
                <a-button type="link">删除</a-button>
              </a-popconfirm>
            </span>
          </a-table>
        </div>
      </a-layout-content>
    </div>

    <a-modal title="添加讲师" :destroyOnClose="true" :visible="visibleAdd" :footer="null" @cancel="handleCancelAdd">
      <p>
        这里是添加讲师的表单
        <a-form
          :form="add_form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="addSubmit"
        >
          <a-form-item label="姓名">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入姓名' }] }]" />
          </a-form-item>

          <a-form-item label="上传头像">
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleUploadChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="profile" />
              <div v-else>
                <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="性别">
            <a-select
              v-decorator="[
          'gender',
          { rules: [{ required: true, message: '请选择你的性别!' }] },
        ]"
              placeholder="Select a option and change input text above"
              @change="handleSelectChange"
            >
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </a-form-item>

           <a-form-item label="描述">
             
           </a-form-item>

      
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">添加教师</a-button>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>

    <a-modal title="修改讲师" :visible="visibleEdit" :footer="null" @cancel="handleCancelEdit">
      <p>
        这里是修改讲师的表单
           <a-form
          :form="edit_form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="editSubmit"
        >
          <a-form-item label="姓名">
            <a-input v-model="editItem.name"  />
          </a-form-item>

          <a-form-item label="上传头像">
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleEditUploadChange"
            >
              <img v-if="editItem.img" :src="editItem.img" alt="avatar" class="profile" />
              <div v-else>
                <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="性别">
            <a-select  v-model="editItem.gender"
            
              placeholder="Select a option and change input text above"
              @change="handleSelectChange"
            >
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </a-form-item>

           <a-form-item label="描述">
             
           </a-form-item>

      
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">修改教师</a-button>
          </a-form-item>
        </a-form>
      </p>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "讲师头像",
    dataIndex: "img",
    key: "img",
    scopedSlots: { customRender: "img" },
  },
  {
    title: "讲师简介",
    dataIndex: "desc",
    key: "desc",
  },

  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      imgLoading: false,
      imageUrl: "",
      columns: columns,
      visibleAdd: false,
      visibleEdit: false,
      editItem: {},
      add_form: this.$form.createForm(this, { name: "addteacher" }),
      edit_form: this.$form.createForm(this, { name: "editteacher" }),
    };
  },
  computed: {
    ...mapState(["loading", "teacher_list"]),
  },
  methods: {
    ...mapActions(["getTeacherList", "deleteTeacher", "updateTeacher"]),
    goTo(url) {
      this.$router.push(url);
    },

    confirmDel(id) {
      console.log("id", id);
      this.deleteTeacher(id);
      this.$message.success("Click on Yes");
    },
    cancelDel(e) {
      console.log(e);
    },

    handleCancelAdd() {
      this.visibleAdd = false;
    },

    handleCancelEdit() {
      this.visibleEdit = false;
    },
    handleEdit(item) {
      //todo 修改
      this.editItem = {...item};
      this.visibleEdit = true;
    },

    //提交添加教师的表单
    addSubmit(e) {
      e.preventDefault();
      this.add_form.validateFields((err, values) => {
         console.log("Received values of form: ", values);
        if (!err) {
          values.id = "";
          values.key = "";
          values.img =this.imageUrl;
          console.log("after 处理后: ", values);
          this.updateTeacher(values);
          this.visibleAdd = false;
        }
      });
    },


  //提交修改教师的表单
    editSubmit(e){
     e.preventDefault();
     this.edit_form.validateFields((err)=>{
       if(!err){
        
         console.log('进入提交动作',this.editItem );
          this.updateTeacher(this.editItem);
          this.visibleEdit=false;
       }
     })
    },
    handleSelectChange(value) {
      console.log(value);
      this.add_form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`,
      });
    },

    handleUploadChange(info) {
      if (info.file.status === "uploading") {
        this.imgLoading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.imgLoading = false;
        });
      }
    },

      handleEditUploadChange(info) {
      if (info.file.status === "uploading") {
        this.imgLoading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
        //  this.imageUrl = imageUrl;
          this.imgLoading = false;
          this.editItem.img=imageUrl;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("你只允许上传jpg或者png格式的图片!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片必须小于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
  created() {
    console.log("created 方法执行了...");
    this.getTeacherList();
    console.log("this.$route", this.$route);
  },
};
</script>
<style scoped>
.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>