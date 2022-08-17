<template>
    <div>
        <div class="queryButton">
            <el-input v-model="input.wallet" placeholder="请输入钱包地址" style="width:300px;margin-right: 10px;"></el-input>
            <el-button type="primary" :plain="true"  @click="queryHospot">查询钱包热点</el-button>
        </div>
        <div class="mybutton">
             <el-tooltip class="item" effect="light" content="请选择下列热点地址，未选择下列热点地址需要输入热点地址" placement="right-end">
             <el-button type="primary" :plain="true" @click="transferHospot">热点转移</el-button>

    </el-tooltip>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
             @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
            type="selection"
            align="center"
            width="55">
            </el-table-column>
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="hotspont"
            align="center"
            label="热点地址"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-dialog
            title="转移热点"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :model="form"  :rules="rules" label-width="180px">
                <el-form-item label="密码" prop="password" >
                    <el-input type="password"  v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass" >
                    <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="热点所属的钱包地址" :rules="[{ required: true, message: '请输入钱包地址', trigger: 'blur' },]">
                    <el-input v-model="form.wallets"></el-input>
                </el-form-item>
                

                <el-form-item   label="自定义热点地址"   :rules="[{ required: true, message: '请输入热点地址,以逗号隔开', trigger: 'blur' },]">
                    <el-input  :disabled="this.dishostpost"    v-model="form.hotspots"></el-input>
                </el-form-item>


                <el-form-item label="热点所属的钱包key路径"  :rules="[{ required: true, message: '请输入钱包key文件路径', trigger: 'blur' },]">
                    <el-input v-model="form.srckey_paths"></el-input>
                </el-form-item>
  
                <el-form-item label="自定义目的钱包的地址文件" class="itemdemo">
                    <el-upload
                        ref="my-upload1"
                        class="upload-demo"
                        action=""
                        :limit="1"
                        :on-exceed="handleExceed"
                        :auto-upload="false"
                        :on-change="onchange1">
                        <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
                    </el-upload>
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
import {gethotspotList, updateHotspot} from '../../api'
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
                password: '',
                wallets: '',
                srckey_paths: '',
                hotspots:[]
            },
            input:{
            },
            rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
            file:null,
            dishostpost: false
            
        }
    },
    mounted(){
    },
     methods:{

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件,本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

     onSubmit(formName){
        this.dialogVisible = false

        this.$refs[formName].validate((valid) => {
        if (valid) {
            console.log('submit!!');
            let fileFormData = new FormData();
            console.log(this.file)
            fileFormData.append("file",this.file)
            fileFormData.append("password",this.form.password)
            fileFormData.append("hotspots",this.form.hotspots)
            fileFormData.append("wallets",this.form.wallets)
            fileFormData.append("srckey_paths",this.form.srckey_paths)
            this.updateHotspot(fileFormData)
            
          } else {
            console.log('error submit!!');
            alert('输入信息错误,无法提交!!!');
            return false;
          }

        });
        },
      handleSelectionChange(vil){
        this.form.hotspots = []
         vil.forEach(element => {
            this.form.hotspots.push(element.hotspont)
         });
      },
      onchange1(files) {
        
        this.file = files.raw
        //this.$refs.upload.submit();
      },
     
      // 获取热点列表
     async hotspontList(params){
        let res = await gethotspotList(params);
        let hotspontArr = res.data.hotspots;
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
        hotspontArr.forEach(element => {
            this.tableData.push({hotspont:element})
        });
     },
     //热点转移
     async updateHotspot(fileFormData){
        //  let config={
        //     Headers:{"Content-Type": "multipart/form-data"}
        //  }
        let res = await updateHotspot(fileFormData);
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
     },
     // 点击查询
     queryHospot(){
        this.hotspontList(this.input)
     },
     // 打开热点转移弹窗
     transferHospot(){        
      if(this.form.hotspots == undefined || this.form.hotspots.length <= 0) {
            // this.$message.error("未选择热点");
            this.dialogVisible = true;

            this.dishostpost = false

        }else{
           this.dialogVisible = true;
            this.dishostpost = true

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
    .queryButton{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
    }
    .upload-demo{
        display: flex;
        justify-content: flex-start;
}
</style>
