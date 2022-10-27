import mongoose from 'mongoose';

interface ProducerAttributes {
  name: string;
  gender: string;
  dob: string;
  bio: string;
  user: string;
}

interface ProducerDoc extends mongoose.Document {
  id: string;
  name: string;
  gender: string;
  dob: string;
  bio: string;
  user: string;
  movies: string[];
}

interface ProducerModel extends mongoose.Model<ProducerDoc> {
  build(attrs: ProducerAttributes): ProducerDoc;
}

const producerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

producerSchema.statics.build = (attrs: ProducerAttributes) => {
  return new Producer(attrs);
};

export const Producer = mongoose.model<ProducerDoc, ProducerModel>(
  'Producer',
  producerSchema
);
