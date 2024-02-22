const router = require('express').Router();
// const router= express.Router();
const hospitalController = require('../controllers/hospitalController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')

router.get('/profile/:account_id',authMiddleware.isHospital, hospitalController.getHospitalById);
router.get('/event/:hospital_id',authMiddleware.isHospital, hospitalController.getEventByHospital);
router.post('/event/add', hospitalController.addEvent);
router.get('/detail/:id', hospitalController.getEventById);
router.put('/close/:id', hospitalController.closeEvent);
router.post('/be-hospital', userController.tobeHospital);
router.get('/userprofile/:id', hospitalController.getUserById);
router.put('/update-image/:id', authMiddleware.isHospital, hospitalController.updateEventImage);
router.put('/update-profile/:id', authMiddleware.isHospital, hospitalController.updateEventInfo);
router.put('/update-status', authMiddleware.isHospital, hospitalController.updateStatusRegister);
module.exports = router;