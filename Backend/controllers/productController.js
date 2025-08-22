import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import productModel from '../models/productModel.js'

// controller function for add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imageURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });

                // delete file from local uploads folder
                fs.unlinkSync(item.path);
                return result.secure_url;
            })
        );


        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageURL,
            date: Date.now()
        }
        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product Added" })


    } catch (error) {
        console.error("product add error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }


}
// controller function for list product
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.error("product lists error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}
// controller function for removing product
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.error("Remove the product error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
// controller function for single product info
export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)

        res.json({ success: true, product })
    } catch (error) {
        console.error("Single product error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}