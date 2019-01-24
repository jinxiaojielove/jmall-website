<!--表格功能 一个表头，每个单元的操作-->
<!--设想：表头通过配置传入一个json， 操作也是通过一个配置把对应的操作传入，当然数据也是通过传入一个json-->

<template>
    <div class="tableFun">
        <el-table :data="excelData">
            <el-table-column :label="item.label" :prop="item.prop" v-for="(item, index) in excelHead"
                             :key="index"></el-table-column>
            <el-table-column label="操作" prop="opt">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <span class="demonstration">完整功能</span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "tableFun",
        data() {
            return {
                excelHead: [
                    {label: '名称', prop: 'name'},
                    {label: '分量', prop: 'size'},
                    {label: '口味', prop: 'taste'},
                    {label: '单价(元)', prop: 'price'},
                    {label: '剩余(份)', prop: 'remain'},
                ],
                excelData: [  // 测试数据
                    {
                        name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
                    },
                    {
                        name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
                    },
                    {
                        name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
                    },
                    {
                        name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
                    },
                    {
                        name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
                    },
                    {
                        name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
                    },
                    {
                        name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
                    },
                    {
                        name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
                    },
                    {
                        name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
                    },
                    {
                        name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
                    },
                    {
                        name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
                    },
                    {
                        name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
                    },
                    {
                        name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
                    },
                    {
                        name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
                    },
                    {
                        name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
                    }
                ],
                currentPage4: 4
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                console.log(row);
            }
        },
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        padding: 0.5rem 0;
        align-items: center;
    }

    .demonstration {
        flex: 0 0 10rem;
    }
</style>
