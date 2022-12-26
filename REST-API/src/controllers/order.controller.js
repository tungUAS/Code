const db = require("../models");
const Order = db.orders;

exports.bulkCreateOrder = async (req, res) => {
  try {
    const orders = req.body.orders;

    if (orders?.length > 0) {
      let resData = await Order.insertMany(orders);

      return res.status(200).send({
        message: "Thành công",
        status: true,
        data: resData,
      });
    }

    return res.status(200).send({
      message: "Thất Bại",
      status: false,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
