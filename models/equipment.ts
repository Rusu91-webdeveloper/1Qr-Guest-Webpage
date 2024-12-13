import mongoose, { Schema, model, models } from "mongoose";

// Define the color mapping for muscles
const MUSCLE_COLORS = {
  Chest: "#FF0000", // Red
  Back: "#0000FF", // Blue
  Biceps: "#00FF00", // Green
  Triceps: "#FFFF00", // Yellow
  Shoulders: "#800080", // Purple
  Legs: "#FFA500", // Orange
  Abs: "#FFC0CB", // Pink
  Glutes: "#A52A2A", // Brown
  Calves: "#808080", // Gray
  Cardio: "#008080", // Teal
};

// Sub-Schema for Muscle Target
const MuscleTargetSchema = new Schema({
  muscle: {
    type: String,
    enum: Object.keys(MUSCLE_COLORS), // Dynamically populate enum with muscle groups
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

// Main Schema for Machine
const MachineSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrls: {
    type: [String],
    required: false,
  },
  imageUrls: {
    type: [String],
    required: false,
  },
  contraindications: {
    type: [String],
    required: false,
  },
  qrCodeImage: {
    type: String, // Base64-encoded image of the QR code
    required: false,
  },
  qrCodeUrl: {
    type: String, // URL encoded in the QR code
    required: false,
  },
  qrCodeColor: {
    type: String, // Hex code or predefined color name
    required: true,
  },
  groupLabel: {
    type: String, // Example: "Chest 1", "Back 2", etc.
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  skillLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: false,
  },
  usageInstructions: {
    type: String,
    required: false,
  },
  recommendedReps: {
    type: String,
    required: false,
  },
  targetMuscles: {
    type: [MuscleTargetSchema],
    required: true,
    validate: {
      validator: function (v) {
        return (
          v.length >= 2 &&
          v.reduce((sum, muscle) => sum + muscle.percentage, 0) === 100
        );
      },
      message:
        "At least two muscle groups must be targeted, and percentages must sum to 100%",
    },
  },
  mainTargetMuscle: {
    type: MuscleTargetSchema,
    required: true,
  },
  exerciseType: {
    category: {
      type: String,
      enum: [
        "Compound Exercises",
        "Isolation Exercises",
        "Aerobic (Cardio) Exercises",
        "Anaerobic Exercises",
        "Plyometric Exercises",
        "Stability and Core Exercises",
        "Functional Training",
        "Mobility and Flexibility Exercises",
        "Isometric Exercises",
        "Bodyweight Exercises",
      ],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    examples: {
      type: [String],
      required: false,
    },
  },
});

const Machine = models.Machine || model("Machine", MachineSchema);
export default Machine;
