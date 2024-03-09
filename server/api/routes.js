const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload'});
const productController = require('./controller')


router.get('/items', upload.single('image_url'), productController.index);
router.get('/detail-items/:id', productController.view);
router.delete('/delete-item/:id', upload.single('image_url'), productController.destroy);
router.post('/add-items', upload.single('image_url'), productController.store);
router.put('/edit-items/:id', upload.single('image_url'), productController.update);


module.exports = router;
