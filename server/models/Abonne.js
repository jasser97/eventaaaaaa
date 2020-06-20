const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbonneSchema = mongoose.Schema(
  {
    // createure: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    // },

    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Abonné = mongoose.model("Abonné", AbonneSchema);
