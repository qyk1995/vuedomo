// 集中管理api文件
import request from './request'

//创建钱包
export const addWallet = (params)=>request({url:'/basics',method:'post',data:params})
// 获取钱包list
export const getWalletList = ()=>request({url:'/basics',method:'get'})

// 获取热点列表
export const gethotspotList = (params)=>request({url:'/transfer',method:'get',params:params})
// 热点转移
export const updateHotspot = (formData)=>request({url:'/transfer',method:'post',data:formData})


//转移金额
export const transferMoney = (params)=>request({url:'/balance_pay',method:'post',data:params})
//获取历史转账信息
export const transferListByHistory = ()=>request({url:'/balance_pay',method:'get'})

