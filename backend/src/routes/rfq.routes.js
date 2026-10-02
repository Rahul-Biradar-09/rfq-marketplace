const express = require("express");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const { createRfqSchema, updateRfqSchema } = require("../validators/rfq.validator");
const { create, getMy, getById, browse, update, remove } = require("../controllers/rfq.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("BUYER"),
  validate(createRfqSchema),
  create
);

router.get(
  "/my",
  authenticate,
  authorize("BUYER"),
  getMy
);


router.get(
  "/",
  authenticate,
  authorize("SUPPLIER"),
  browse
);

router.get(
  "/:id",
  authenticate,
  getById
);



router.put(
  "/:id",
  authenticate,
  authorize("BUYER"),
  validate(updateRfqSchema),
  update
);


router.delete(
  "/:id",
  authenticate,
  authorize("BUYER"),
  remove
);


module.exports = router;