import { Schema } from 'mongoose';

const ImdbSchema = new Schema({
  rating: { type: Number, required: true },
  votes: { type: Number, required: true },
});
export const MovieSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    director: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
    genres: [{ type: String, required: true }],
    year: {
      type: Number,
      default: new Date().getFullYear(),
      min: 1888,
      max: new Date().getFullYear(),
    },
    imdb: { type: ImdbSchema, required: true },
  },
  { versionKey: false, timestamps: true },
);
