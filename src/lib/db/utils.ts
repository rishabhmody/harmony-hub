import mongoose, { ConnectOptions } from "mongoose";

type ErrorWithCause = Error & {
  cause?: unknown;
};

const HARDCODED_MONGODB_URI =
  "mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/harmonyhub";

export function getMongoUri() {
  const trimmedUri = process.env.MONGODB_URI?.trim();

  if (trimmedUri) {
    return trimmedUri;
  }

  console.warn(
    "[db] MONGODB_URI not set; falling back to the hardcoded Atlas URI supplied by the user."
  );
  return HARDCODED_MONGODB_URI;
}

export async function connectToMongo(
  uri: string,
  opts: ConnectOptions = {}
): Promise<typeof mongoose> {
  try {
    return await mongoose.connect(uri, opts);
  } catch (error: unknown) {
    throw createFriendlyMongoError(error);
  }
}

function createFriendlyMongoError(error: unknown): Error {
  const details = extractErrorDetail(error);
  const isAuthError = detectAuthError(error);
  const baseMessage = isAuthError
    ? "MongoDB authentication failed; verify the username and password encoded in MONGODB_URI."
    : "MongoDB connection failed; double-check the connection string and your network access.";

  const friendlyError = new Error(`${baseMessage} Details: ${details}`) as ErrorWithCause;
  if (error instanceof Error) {
    friendlyError.name = error.name;
    friendlyError.cause = error;
  }

  console.error(friendlyError.message);
  return friendlyError;
}

function detectAuthError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const normalized = error.message.toLowerCase();
  return (
    normalized.includes("authentication failed") ||
    normalized.includes("bad auth") ||
    (error as { code?: number }).code === 8000
  );
}

function extractErrorDetail(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

