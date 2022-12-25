const axiosInstance = require("../configs/axiosInstance");
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

module.exports = {
    list: async (req, res, next) => {
        const rs = await productModel.all()
        const categories = await categoryModel.getCategoryName()
        if (rs) {
            res.render('productList', { productList: rs, categories });
        }
    },
    getList: async (req, res, next) => {
        const { category } = req.body;
        console.log(req.body);
        const categories = await categoryModel.getCategoryName()
        const rs = await productModel.getProductByCategory(category)
        if (rs) {
            res.render('productList', { productList: rs, categories });
        }
    }
}