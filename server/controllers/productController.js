

// controller function for add product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.file.image1 || req.file.image1[0]
        const image2 = req.file.image2 || req.file.image2[0]
        const image3 = req.file.image3 || req.file.image3[0]
        const image4 = req.file.image4 || req.file.image4[0]

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }


}
// controller function for list product
export const listProducts = async (req, res) => {

}
// controller function for removing product
export const removeProduct = async (req, res) => {

}
// controller function for single product info
export const singleProduct = async (req, res) => {

}