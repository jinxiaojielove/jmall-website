<template>
    <div class="createProduct">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="form.productName"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
                <el-input v-model="form.categoryId"></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brandId">
                <el-input v-model="form.brandId"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="form.price "></el-input>
            </el-form-item>
            <el-form-item label="详情" prop="detail">
                <el-input type="textarea" v-model="form.detail "></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'createProduct',
        data() {
            return {
                form: {
                    productName: '',
                    description: '',
                    categoryId: '',
                    brandId: '',
                    detail: '',
                    price: ''
                },
                rules: {
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
            console.log(this.$route);
        }
    }
</script>

<style lang="stylus" type="text/stylus">

</style>
