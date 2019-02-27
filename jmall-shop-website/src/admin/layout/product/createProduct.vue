<template>
    <div class="createProduct">

        <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small">
                <el-form-item label="分类" prop="categoryId">
                    <el-select v-model="form.categoryId" placeholder="请选择" @change="changeAttribute">
                        <el-option v-for="item in categories" :key="item.id" :label="item.categoryName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="品牌" prop="brandId">
                    <el-select v-model="form.brandId" placeholder="请选择">
                        <el-option v-for="item in brands" :key="item.id" :label="item.brandName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产品名称" prop="productName">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="form.price "></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="detail">
                    <el-input type="textarea" v-model="form.detail "></el-input>
                </el-form-item>
                <el-form-item v-if="attributes.length > 0">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>类目属性</span>
                        </div>

                        <el-form-item :label="item.attributeName" label-width="50px" prop="detail"
                                      v-for="(item,index) in attributes" :key="item.id">
                            <el-input v-model="form.attributes[index].attributeValue"></el-input>
                        </el-form-item>
                    </el-card>
                </el-form-item>

                <el-form-item v-if="saleAttributes.length > 0">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>销售属性</span>
                        </div>
                        <el-form-item :label="item.attributeName" label-width="50px" prop="detail"
                                      v-for="(item,index) in saleAttributes" :key="item.id">

                            <el-tag
                                :key="tag"
                                v-for="tag in saleAttributeValues[index]"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag,saleAttributeValues[index],index)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisibles[index]"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm(saleAttributeValues[index],index)"
                                @blur="handleInputConfirm(saleAttributeValues[index],index)"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ {{item.attributeName}}</el-button>

                        </el-form-item>
                        <v-table
                            :cell-edit-done="cellEditDone"
                            v-if="tableData.length>0"
                            :width="tableWidth"
                            :columns="columns"
                            :table-data="tableData"
                            :show-vertical-border="true"
                            :show-horizontal-border="true"
                            :cell-merge="cellMerge"
                        ></v-table>
                    </el-card>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                    price: '',
                    skus: []
                },
                rules: {},
                categories: [],
                brands: [],
                attributes: [],
                saleAttributes: [],
                saleAttributeCodes: [],
                saleAttributeValues: [],
                inputVisibles: [],
                inputValue: '',
                tableWidth: 1000,
                tableData: [],
                columns: [],
                saleAttributeCodeIdMap: {}
            }
        },
        methods: {
            submitForm(formName) {
                this.form.skus = [];
                for(let i = 0;i<this.tableData.length;i++){
                    let sku = {};
                    let attributes = [];
                    sku.price = this.tableData[i].price;
                    for(let key in this.tableData[i]){
                        if(key != 'price'){
                            let attr = {};
                            attr.attributeValue = this.tableData[i][key];
                            attr.attributeId = this.saleAttributeCodeIdMap[key];
                            attributes.push(attr)
                        }
                    }
                    sku.saleAttributes = attributes;
                    this.form.skus.push(sku);
                }
                console.log(this.form)


                this.$alls.product.createProduct(this.form).then(res => {
                    Message({
                        type: 'success',
                        duration: 5 * 1000,
                        message: 'success'
                    });
                });
            },
            changeAttribute(categoryId) {
                this.$alls.product.queryAttributeByCategoryId(categoryId).then(res => {
                    this.attributes = res.data;
                    this.form.attributes = [{
                        attributeId: '',
                        attributeValue: ''
                    }];

                    for (let i = 0; i < res.data.length; i++) {
                        this.form.attributes[i] = {
                            attributeId: res.data[i].id,
                            attributeValue: ''
                        }

                    }
                });


                this.$alls.product.querySaleAttributeByCategoryId(categoryId).then(res => {
                    this.saleAttributes = res.data;

                    let width = 200;
                    let length = res.data.length + 1;
                    if(length  < 4){
                        this.tableWidth = 1000 + 2;
                        width = 1000 / res.data.length;
                    }else{
                        this.tableWidth = width * length;
                    }

                    let i = 0
                    for (i = 0; i < res.data.length; i++) {
                        this.saleAttributeValues[i] = [];
                        this.saleAttributeCodes[i] = res.data[i].attributeCode;
                        this.inputVisibles[i] = false;
                        this.columns[i] = {field: res.data[i].attributeCode, title:res.data[i].attributeName, width: width, titleAlign: 'center',columnAlign:'center'};
                        this.saleAttributeCodeIdMap[res.data[i].attributeCode] = res.data[i].id;
                    }
                    this.columns[i] = {field: 'price', title:"价格", width: width, titleAlign: 'center',columnAlign:'center',isEdit:true};

                });



            },

            handleClose(tag,tags,index) {
                tags.splice(tags.indexOf(tag), 1);
                this.$set(this.saleAttributeValues,index,tags);
                this.buildTable();
            },

            showInput(index) {
                this.$set(this.inputVisibles,index,true);
            },

            handleInputConfirm(tags,index) {
                let inputValue = this.inputValue;

                if(inputValue == null || inputValue.trim()==''){
                    this.inputValue = '';
                    this.inputVisibles[index] = false;
                    return;
                }

                if (inputValue) {
                    tags.push(inputValue);
                }
                this.inputVisibles[index] = false;
                this.inputValue = '';

                this.buildTable();
            },
            buildTable(){
                let rowNum = 1;
                for(let i= 0;i<this.saleAttributeValues.length;i++){
                    if(this.saleAttributeValues[i].length == 0){
                        this.tableData = [];
                        return;
                    }
                    rowNum *= this.saleAttributeValues[i].length;
                }

                let datas = [];

                let i=0;

                for(i= 0;i<this.saleAttributeValues.length;i++){
                    let values = this.saleAttributeValues[i];

                    let rn = 1;
                    for(let m=i+1;m<this.saleAttributeValues.length;m++){
                        rn *= this.saleAttributeValues[m].length
                    }

                    let r=0;
                    while(r<rowNum){
                        for(let j= 0;j<values.length;j++){
                            for(let k= 0;k<rn;k++) {
                                if(datas[r] == null){
                                    datas[r] = {}
                                }
                                let name = this.saleAttributes[i].attributeCode;
                                datas[r][name] = this.saleAttributeValues[i][j];
                                r++;
                            }
                        }
                    }

                }

                let oldData = this.tableData;

                let oldDataMap = {};
                for(let i = 0;i< oldData.length ;i++ ){
                    let oldDatum = oldData[i];
                    let price = oldDatum['price'];
                    delete oldDatum['price'];
                    oldDataMap[JSON.stringify(oldDatum)] = price
                }

                for(let i = 0 ; i<datas.length;i++){
                    let price = oldDataMap[[JSON.stringify(datas[i])]];
                    if(price != null){
                        datas[i].price = price;
                    }
                }

                this.tableData = datas;
            },
            cellMerge(rowIndex,rowData,field){
                if(field == 'price'){
                    return {
                        colSpan: 1,
                        rowSpan: 1,
                        content: rowData[field],
                        componentName: ''
                    }
                }

                let rowNum = 1;

                for(let i= 0;i<this.saleAttributeValues.length;i++){
                    rowNum *= this.saleAttributeValues[i].length;
                }

                let c = this.saleAttributeCodes.indexOf(field);

                let rn = 1
                for(let m=c+1;m<this.saleAttributeValues.length;m++){
                    rn *= this.saleAttributeValues[m].length
                }

                return {
                       colSpan: 1,
                       rowSpan: rn,
                       content: rowData[field],
                       componentName: ''

                }


            },

            cellEditDone(newValue,oldValue,rowIndex,rowData,field){
                this.$set(this.tableData[rowIndex],field,newValue);
            }
        },
        mounted() {
            this.$alls.product.queryCategories().then(res => {
                this.categories = res.data;
            });
            this.$alls.product.queryBrands().then(res => {
                this.brands = res.data;
            });
        }
    }
</script>

<style lang="stylus" type="text/stylus">
    .createProduct
        position relative
    .el-tag + .el-tag
        margin-left 10px
    .button-new-tag
        margin-left 10px
        height 32px
        line-height 30px
        padding-top 0
        padding-bottom 0

    .input-new-tag
        width 90px
        margin-left 10px
        vertical-align bottom

</style>
