<template>
    <div>
        <!-- 导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
        <el-row :gutter="20">
        <!-- 搜索与添加区域 -->
            <el-col :span="8">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>

            <el-col :span="4">
                <el-button type="primary"> 添加用户 </el-button>
            </el-col>
        </el-row>
        
        <!-- 用户列表区域 -->
        <el-table :data="userList" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="姓名" prop="username"> </el-table-column>
            <el-table-column label="邮箱" prop="email"> </el-table-column>
            <el-table-column label="电话" prop="mobile"> </el-table-column>
            <el-table-column label="角色" prop="role_name"> </el-table-column>
            <el-table-column label="状态"> 
                <template slot-scope="scope"> 
                <el-switch @change="userStateChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                </template>
            </el-table-column>
            
            <el-table-column label="操作"> 
                <template>
                    <el-tooltip effect="dark" content="编辑信息" placement="top">
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    </el-tooltip>

                    <el-tooltip effect="dark" content="删除信息" placement="top">
                    <el-button type="danger" icon="el-icon-delete"></el-button>
                    </el-tooltip>

                    <el-tooltip effect="dark" content="分配角色" placement="top">
                    <el-button type="warning" icon="el-icon-setting"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>



        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        :page-sizes="[1,2,5,10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        
        
        </el-card>


    </div>
</template>

<script>

export default {
    data() {
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                query:'',
                pagenum: 1,
                pagesize: 2
            },
            userList: [],
            total: 0,
        }
    },
    created() {
        this.getUsersList();
    },
    methods: {
        async getUsersList(){
            const {data : res} = await this.$http.get('users',{params: this.queryInfo})
            if (res.meta.status !== 200) return this.$message.error("获取用户列表失败！")
            this.userList = res.data.users
            this.total = res.data.total 
            console.log(res)
        },

        handleSizeChange(newSize){ // 监听pagesize改变的事件
            this.queryInfo.pagesize = newSize
            this.getUsersList()
        },

        handleCurrentChange(newPage) { // 监听页码值改变的事件
            this.queryInfo.pagenum = newPage
            this.getUsersList()
        },

        async userStateChange(userInfo){ // 监听switch开关状态的改变
            const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if (res.meta.status !== 200) {
                userInfo.mg_state = !userInfo.mg_state
                return this.$message.error("更新用户状态失败")
            }
            this.$message.success("更新用户状态成功")
        }
    }
}

</script>

<style lang="less" scoped>

.text {
font-size: 14px;
}

.item {
padding: 18px 0;
}

.box-card {
width: 480px;
}

</style>

