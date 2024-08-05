import { postgresAdapter } from "@payloadcms/db-postgres";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig, type EmailAdapter } from "payload";
import sharp from "sharp";
import { getURL } from "./utilities/get-url";
import { Homepage } from "./globals/homepage";
import { Users, Media, Films, Stills } from "./collections";

export default buildConfig({
  admin: {
    avatar: "gravatar",
    livePreview: {
      url: getURL(),
      globals: ["homepage"],
      collections: ["films"],
    },
    user: Users.slug,
  },
  globals: [Homepage],
  collections: [Users, Films, Stills, Media],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? "",
    },
  }),
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_KEY ?? "",
    defaultFromAddress: "admin@teenylilapps.com",
    defaultFromName: "Shorouk Elkobrsi",
  }) as EmailAdapter,
  plugins:
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview"
      ? [
          uploadthingStorage({
            collections: {
              [Media.slug]: true,
            },
            options: {
              apiKey: process.env.UPLOADTHING_SECRET,
              acl: "public-read",
            },
          }),
        ]
      : [],
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: getURL(),
  sharp,
  typescript: {
    outputFile: "src/payload-types.ts",
    declare: {
      ignoreTSError: true,
    },
  },
});
