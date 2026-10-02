const prisma = require("../utils/prisma");

const createQuotation = async ({
  rfqId,
  supplierId,
  quotedPrice,
  estimatedDeliveryTime,
  message,
}) => {
  const rfq = await prisma.rFQ.findUnique({
    where: {
      id: rfqId,
    },
  });

  if (!rfq) {
    const error = new Error("RFQ not found");
    error.statusCode = 404;
    throw error;
  }

  if (rfq.deadline <= new Date()) {
    const error = new Error("RFQ deadline has passed");
    error.statusCode = 400;
    throw error;
  }

  try {
    const quotation = await prisma.quotation.create({
      data: {
        rfqId,
        supplierId,
        quotedPrice,
        estimatedDeliveryTime,
        message: message || "",
      },
    });

    return quotation;
  } catch (error) {
    if (error.code === "P2002") {
      const conflictError = new Error(
        "You have already submitted a quotation for this RFQ"
      );
      conflictError.statusCode = 409;
      throw conflictError;
    }

    throw error;
  }
};




const getMyQuotations = async (supplierId) => {
  const quotations = await prisma.quotation.findMany({
    where: {
      supplierId,
    },
    include: {
      rfq: {
        select: {
          id: true,
          productName: true,
          description: true,
          quantity: true,
          deliveryLocation: true,
          deadline: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return quotations;
};




const getQuotationsForRfq = async ({ rfqId, buyerId }) => {
  const rfq = await prisma.rFQ.findUnique({
    where: {
      id: rfqId,
    },
  });

  if (!rfq) {
    const error = new Error("RFQ not found");
    error.statusCode = 404;
    throw error;
  }

  if (rfq.buyerId !== buyerId) {
    const error = new Error(
      "You do not have permission to view quotations for this RFQ"
    );
    error.statusCode = 403;
    throw error;
  }

  const quotations = await prisma.quotation.findMany({
    where: {
      rfqId,
    },
    include: {
      supplier: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return quotations;
};

module.exports = {
  createQuotation,
  getMyQuotations,
  getQuotationsForRfq,
};