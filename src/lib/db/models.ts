// src/lib/db/models.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
  },
  password: {
    type: String,
    required: false, // Make password optional for OAuth users
  },
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  provider: {
    type: String,
  },
  role: {
    type: String,
    enum: ['artist', 'venue'],
    required: [true, 'Please specify a role (artist or venue).'],
  },
  xp: {
    type: Number,
    default: 0,
  },
  gigsPlayed: { // Can be gigs played by artist or gigs hosted by venue
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the gig/event.'],
  },
  author: { // Curator/Venue name
    type: String,
    required: [true, 'Please provide the author/host name.'],
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre.'],
  },
  xpValue: {
    type: Number,
    default: 0,
  },
  image: { // Optional, for display
    type: String,
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Gig = mongoose.models.Gig || mongoose.model('Gig', GigSchema);
