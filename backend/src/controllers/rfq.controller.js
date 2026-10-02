const { createRfq, getMyRfqs,
  getRfqById, getAvailableRfqs, updateRfq, deleteRfq } = require("../services/rfq.service");

const create = async (req, res, next) => {
  try {
    const rfq = await createRfq({
      buyerId: req.user.userId,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "RFQ created successfully",
      data: rfq,
    });
  } catch (error) {
    next(error);
  }
};



const getMy = async (req, res, next) => {
  try {
    const rfqs = await getMyRfqs(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Your RFQs retrieved successfully",
      data: rfqs,
    });
  } catch (error) {
    next(error);
  }
};




const getById = async (req, res, next) => {
  try {
    const rfq = await getRfqById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "RFQ retrieved successfully",
      data: rfq,
    });
  } catch (error) {
    next(error);
  }
};




const browse = async (req, res, next) => {
  try {
    const rfqs = await getAvailableRfqs({
      search: req.query.search?.trim(),
      deliveryLocation: req.query.deliveryLocation?.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Available RFQs retrieved successfully",
      data: rfqs,
    });
  } catch (error) {
    next(error);
  }
};




const update = async (req, res, next) => {
  try {
    const rfq = await updateRfq({
      rfqId: req.params.id,
      buyerId: req.user.userId,
      ...req.body,
    });

    return res.status(200).json({
      success: true,
      message: "RFQ updated successfully",
      data: rfq,
    });
  } catch (error) {
    next(error);
  }
};




const remove = async (req, res, next) => {
  try {
    await deleteRfq({
      rfqId: req.params.id,
      buyerId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "RFQ deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  create,
  getMy,
  getById,
  browse,
  update,
  remove
};