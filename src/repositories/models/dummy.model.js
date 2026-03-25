import { Schema, model } from 'mongoose';

const dummySchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model('Dummy', dummySchema);
