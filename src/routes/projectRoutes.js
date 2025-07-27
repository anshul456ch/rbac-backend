const express = require('express');
const router = express.Router();

// ✅ import middlewares
const { verifyToken } = require('../middlewares/auth');
const checkPermission = require('../middlewares/checkPermission');

// ✅ Example protected route
router.delete(
  '/:id',
  verifyToken,
  checkPermission('delete', 'project'),
  (req, res) => {
    // here you would call your controller or logic
    res.json({ message: `Project with id ${req.params.id} deleted` });
  }
);

module.exports = router;
