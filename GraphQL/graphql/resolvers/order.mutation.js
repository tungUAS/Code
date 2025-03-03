const db = require("../../models");
const Order = db.order;
const {verifyTokenUser} = require("../../middleware/auth.middleware");

module.exports = {
  Mutation: {
    bulkCreateOrder: async (parent, args, context) => {
      verifyTokenUser(context);
      try {
        let res = await Order.insertMany(args.orders);

        return res;
      } catch (err) {
        console.log("err", err);
        throw new Error(err);
      }
    },
  },
};
