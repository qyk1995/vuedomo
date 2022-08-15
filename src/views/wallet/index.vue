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
            <el-form ref="form" :model="form" label-width="150px">
             <el-form-item label="数量" prop="count" :rules="[{ required: true, message: '请输入钱包数量', trigger: 'blur' }, { type: 'number', message: '数量必须为数字值'}]">
            <el-input v-model="form.count"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password"  :rules="[{ required: true, message: '请输入钱包密码', trigger: 'blur' },]">
                <el-input  type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="存放钱包key文件路径">
                    <el-input v-model="form.paths"></el-input>
                </el-form-item>
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {getWalletList,addWallet} from '../../api'
export default{
   data(){
        return{
            tableData: [
                
            ],
            dialogVisible: false,
            form: {
                count: '',
                password: '',
                paths: ''
            },
            dialogImageUrl: '',
            dialogVisible1: false,
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
       onSubmit(){
        this.dialogVisible = false
        this.addWallet(this.form)
        this.getWalletList()
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
        this.tableData = res.data;
      },
      // 新增钱包
      async addWallet(params){
        let res= await addWallet(params);
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
