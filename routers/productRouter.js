let express = require('express');
const { getProducts, saveProduct, updateProduct, deleteProduct } = require('../controllers/productController');
let app = express();
let router = express.Router();

router.get('/fetch',getProducts)
router.post('/save',saveProduct)
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;
