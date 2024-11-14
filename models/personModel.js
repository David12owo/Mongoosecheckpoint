import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    favoriteFoods: {
      type: [String],
      required: true,
    },
    updatedRecordAt: {
      type: String,
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("persons", personSchema);

export default Person;
