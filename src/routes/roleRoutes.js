const express = require('express');
const router = express.Router();

const {
  createRole,
  createPermission,
  assignRoleToUser,
  assignPermissionToRole,
  getRoles
} = require('../controllers/roleController'); // ✅ path is correct

router.get('/', getRoles);      // GET /roles
router.post('/', createRole);
router.post('/permission', createPermission);
router.post('/assign-role', assignRoleToUser);
router.post('/assign-permission', assignPermissionToRole);

module.exports = router;
