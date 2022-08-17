<template>
    <div>
        <div class="mybutton">
            <el-button type="primary" plain @click="dialogVisible = true">转移金额</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            type="index"
            prop="id"

            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="source_wallet"
            align="center"
            label="源钱包地址"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="dest_wallet"
            align="center"
            label="目的钱包地址"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="blance"
            align="center"
            label="转移金额"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="status"
            align="center"
            label="转移是否成功"
            show-overflow-tooltip>
            <template slot-scope="scope">
                <p>{{ scope.row.status?'失败':'成功' }}</p>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="创建钱包"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" status-icon :rules="rules" label-width="150px">
                
                <el-form-item label="密码" prop="password" >
                    <el-input type="password" v-model="form.password" ></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="目的钱包地址" :rules="[{ required: true, message: '请输入目的钱包地址', trigger: 'blur' },]">
                    <el-input v-model="form.wallets"></el-input>
                </el-form-item>
                <el-form-item label="源钱包的key文件路径">
                    <el-input v-model="form.srckey_paths"></el-input>
                </el-form-item>
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {transferMoney,transferListByHistory} from '../../api'
export default {
    data(){

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
                wallets: '',
                password: '',
                srckey_paths: ''
            },
            rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
            },
            
        }

    },
    mounted(){
        this.transferListByHistory();
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
            this.transferMoney(this.form)
            console.log(this.form.count)

          } else {  
            console.log('error submit!!');
            alert('输入信息错误,无法提交!!!');
            return false;
          }
        });
      },
      // 转移金额
      async transferMoney(params){
        let res = await transferMoney(params);
        if(res.status == 1){
            this.$message({
            message: res.msg,
            type: 'success'
            });
        }else{
            this.$message.error(res.msg);
        }
        this.transferListByHistory();
      },
      // 历史转移金额信息
      async transferListByHistory(){
        let res = await transferListByHistory();
        this.tableData = res.data
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
