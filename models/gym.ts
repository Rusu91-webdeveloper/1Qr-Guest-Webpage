import mongoose, { model, models, Schema } from "mongoose";

const GymSchema = new Schema({
  name: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  subscription: {
    plan: {
      type: String,
      enum: ["Basic", "Standard", "Premium"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  // machines: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Equipment", // Assuming you have an Equipment model
  //   },
  // ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whitelistedIPs: [{ type: String }], // Add a list of allowed IP addresses
  createdAt: { type: Date, default: Date.now },
});

const Gym = models.Gym || model("Gym", GymSchema);
export default Gym;
