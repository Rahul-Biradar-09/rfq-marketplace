const { createQuotation, getMyQuotations, getQuotationsForRfq } = require("../services/quotation.service");

const create = async (req, res, next) => {
  try {
    const quotation = await createQuotation({
      rfqId: req.params.id,
      supplierId: req.user.userId,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Quotation submitted successfully",
      data: quotation,
    });
  } catch (error) {
    next(error);
  }
};



const getMy = async (req, res, next) => {
  try {
    const quotations = await getMyQuotations(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Your quotations retrieved successfully",
      data: quotations,
    });
  } catch (error) {
    next(error);
  }
};



const getForRfq = async (req, res, next) => {
  try {
    const quotations = await getQuotationsForRfq({
      rfqId: req.params.id,
      buyerId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Quotations retrieved successfully",
      data: quotations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getMy,
  getForRfq,
};