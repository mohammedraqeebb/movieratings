import mongoose from 'mongoose';

interface ActorAttributes {
  name: string;
  gender: string;
  dob: string;
  bio: string;
  user: string;
}

interface ActorDoc extends mongoose.Document {
  name: string;
  gender: string;
  dob: string;
  bio: string;
  user: string;
  movies: string[];
}

interface ActorModel extends mongoose.Model<ActorDoc> {
  build(attrs: ActorAttributes): ActorDoc;
}

const actorSchema = new mongoose.Schema(
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

actorSchema.statics.build = (attrs: ActorAttributes) => {
  return new Actor(attrs);
};

export const Actor = mongoose.model<ActorDoc, ActorModel>('Actor', actorSchema);
