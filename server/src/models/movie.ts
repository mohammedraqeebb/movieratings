import mongoose from 'mongoose';

interface MovieAttributes {
  name: string;
  yearOfRelease: string;
  plot: string;
  poster: string;
  user: string;
  actors: string[];
  producer: string;
}

interface MovieDoc extends mongoose.Document {
  id: string;
  name: string;
  yearOfRelease: string;
  plot: string;
  poster: string;
  user: string;
  actors: string[];
  producer: string;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttributes): MovieDoc;
}

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    yearOfRelease: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: true,
      },
    ],
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producer',
      required: true,
    },
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
movieSchema.statics.build = (attrs: MovieAttributes) => {
  return new Movie(attrs);
};

export const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);
