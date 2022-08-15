<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <h1 v-if="!isCollapse">Helium</h1>
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                router>
                <el-menu-item index="/wallet"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <i class="el-icon-menu"></i>
                    <span slot="title">创建钱包</span>
                </el-menu-item>
                <el-menu-item index="/hotspot" >
                    <i class="el-icon-document"></i>
                    <span slot="title">转移热点</span>
                </el-menu-item>
                <el-menu-item index="/money">
                    <i class="el-icon-setting"></i>
                    <span slot="title">转移金额</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="myheader">
                        <div>
                            <i class="el-icon-s-operation" @click="myCollapse"></i>
                        </div>
                        <div class="info">
        
                            <el-dropdown>
                                <el-button type="primary">
                                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                        </div>
                    </div>
                    
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isCollapse:false,
        }
    },
    
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 菜单是否收缩
      myCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
}
</script>
<style scoped>
    .myheader{
        height:60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .info{
        display: flex;
        align-items: center;

    }
    .mybutton{
        display: flex;
        justify-content: flex-start;
    }
</style>
