<template>
    <div>
        <div class="mybutton">
            <el-button type="primary" plain @click="dialogVisible = true"><i class="el-icon-plus"></i>创建钱包</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="address"
            align="center"
            label="钱 包 地 址"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-dialog
            title="创建钱包"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :model="form"  :rules="rules"  label-width="150px">

             <el-form-item label="数量" prop="count">
            <el-input v-model="form.count"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="存放钱包key文件路径">
                    <el-input v-model="form.paths"></el-input>
                </el-form-item>
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :plain="true" @click="onSubmit('form')">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {getWalletList,addWallet} from '../../api'
export default{
   data(){
    var checkCount = (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('数量必须大于0'));
        } else {
          callback();
        }
        
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            tableData: [  
            ],
            dialogVisible: false,
            form: {
                count: '',
                password: '',
                checkPass: '',
                paths: ''
            },
             rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    count: [
                        { validator: checkCount, trigger: 'blur' }
                    ]
                },
            dialogImageUrl: '',
            textarea:'',


        }

    },
     mounted(){
       this.getWalletList();
       
    //    res.forEach(element => {
    //         this.tableData.push(element) 
    //    });

    },
    methods:{
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
     onSubmit(formName) {
        this.dialogVisible = false
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!!');
            this.addWallet(this.form)
            

          } else {
            console.log('error submit!!');
            alert('输入信息错误,无法提交!!!');
            return false;
          }
        });

      },


      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 获取钱包列表
      async getWalletList(){
        let res =await getWalletList();
         if(res.status == 1){
             this.$message({
                message: res.msg,
                type: 'success'
            });
        }else{
              this.$message({
                message: res.msg,
                type: 'success'
            });
        }
        this.tableData = res.data;
      },
      // 新增钱包
      async addWallet(params){
        let res= await addWallet(params);
        console.log(res)
        if(res.status == 1){
             this.$message({
                message: res.msg,
                type: 'success'
            });
        }else{
            this.$message({
                message: res.msg,
                type: 'success'
            });
        }
        this.getWalletList()
      }
    }       
}
</script>
<style scoped>
    .mybutton{
        display: flex;
        justify-content: flex-start;
    }
</style>
