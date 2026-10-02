const prisma = require("../utils/prisma");

const createRfq = async ({
  buyerId,
  productName,
  description,
  quantity,
  deliveryLocation,
  deadline,
}) => {
  const rfq = await prisma.rFQ.create({
    data: {
      buyerId,
      productName,
      description,
      quantity,
      deliveryLocation,
      deadline: new Date(deadline),
    },
  });

  return rfq;
};



const getMyRfqs = async (buyerId) => {
  const rfqs = await prisma.rFQ.findMany({
    where: {
      buyerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rfqs;
};




const getRfqById = async (rfqId) => {
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

  return rfq;
};




const getAvailableRfqs = async ({ search, deliveryLocation }) => {
  const rfqs = await prisma.rFQ.findMany({
    where: {
      deadline: {
        gt: new Date(),
      },

      ...(search && {
        productName: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(deliveryLocation && {
        deliveryLocation: {
          contains: deliveryLocation,
          mode: "insensitive",
        },
      }),
    },

    orderBy: {
      deadline: "asc",
    },
  });

  return rfqs;
};




const updateRfq = async ({
  rfqId,
  buyerId,
  productName,
  description,
  quantity,
  deliveryLocation,
  deadline,
}) => {
  const existingRfq = await prisma.rFQ.findUnique({
    where: {
      id: rfqId,
    },
  });

  if (!existingRfq) {
    const error = new Error("RFQ not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingRfq.buyerId !== buyerId) {
    const error = new Error(
      "You do not have permission to update this RFQ"
    );
    error.statusCode = 403;
    throw error;
  }

  const updatedRfq = await prisma.rFQ.update({
    where: {
      id: rfqId,
    },
    data: {
      productName,
      description,
      quantity,
      deliveryLocation,
      deadline: new Date(deadline),
    },
  });

  return updatedRfq;
};




const deleteRfq = async ({ rfqId, buyerId }) => {
  const existingRfq = await prisma.rFQ.findUnique({
    where: {
      id: rfqId,
    },
  });

  if (!existingRfq) {
    const error = new Error("RFQ not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingRfq.buyerId !== buyerId) {
    const error = new Error(
      "You do not have permission to delete this RFQ"
    );
    error.statusCode = 403;
    throw error;
  }

  await prisma.rFQ.delete({
    where: {
      id: rfqId,
    },
  });
};

module.exports = {
  createRfq,
  getMyRfqs,
  getRfqById,
  getAvailableRfqs,
  updateRfq,
  deleteRfq,
};