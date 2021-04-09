const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');

router.get('/search', auth, userCtrl.searchUser);

router.get('/user/:id', auth, userCtrl.getUser);

router.patch("/user", auth, userCtrl.updateUser);

router.patch("/user/:id/follow", auth, userCtrl.follow);
router.patch("/user/:id/unfollow", auth, userCtrl.unfollow);

router.get("/suggestionsUser", auth, userCtrl.suggestionsUser);

router.get("/get_user_notifications", auth, userCtrl.getUserNotifications);
router.get("/clear_user_notifications", auth, userCtrl.clearUserNotifications);



module.exports = router;