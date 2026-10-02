const express = require("express");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const { createQuotationSchema } = require("../validators/quotation.validator");
const { create, getMy, getForRfq } = require("../controllers/quotation.controller");

const router = express.Router();



router.get(
  "/quotations/my",
  authenticate,
  authorize("SUPPLIER"),
  getMy
);



router.get(
  "/rfqs/:id/quotations",
  authenticate,
  authorize("BUYER"),
  getForRfq
);

router.post(
  "/rfqs/:id/quotations",
  authenticate,
  authorize("SUPPLIER"),
  validate(createQuotationSchema),
  create
);

module.exports = router;