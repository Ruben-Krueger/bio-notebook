import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "table", "chart", "metadata", "file"],
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // can be anything, validated per block type
      required: true,
    },
  },
  { _id: false }
);

const notebookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  blocks: [blockSchema], // flexible content structure
});

export const NotebookDocument = mongoose.model(
  "NotebookDocument",
  notebookSchema
);
