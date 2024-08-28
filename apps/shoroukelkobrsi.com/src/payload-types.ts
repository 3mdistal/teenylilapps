/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations
  }
  collections: {
    users: User
    media: Media
    films: Film
    stills: Still
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  db: {
    defaultIDType: string
  }
  globals: {
    homepage: Homepage
    'about-page': AboutPage
  }
  locale: null
  user: User & {
    collection: 'users'
  }
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string
    password: string
  }
  login: {
    email: string
    password: string
  }
  registerFirstUser: {
    email: string
    password: string
  }
  unlock: {
    email: string
    password: string
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  role?: ('admin' | 'editor') | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  alt: string
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "films".
 */
export interface Film {
  id: string
  title: string
  slug: string
  date: string
  trailer?: string | null
  director?: string | null
  producer?: string | null
  format?: string | null
  prizes?:
    | {
        prize?: string | null
        id?: string | null
      }[]
    | null
  imdbLink?: string | null
  aspectRatio?: ('4:3' | '5:4' | '16:9' | '2.35:1' | '9:16') | null
  stills?:
    | {
        image: string | Media
        featured?: boolean | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stills".
 */
export interface Still {
  id: string
  date: string
  location: string
  format?: string | null
  image: string | Media
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "homepage".
 */
export interface Homepage {
  id: string
  featuredFilms?: (string | Film)[] | null
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about-page".
 */
export interface AboutPage {
  id: string
  heading: string
  'personal-intro': {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  'personal-photo': string | Media
  'personal-intro_html'?: string | null
  'professional-intro': {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  'professional-intro_html'?: string | null
  'professional-photo': string | Media
  'professional-logos': {
    logo: string | Media
    id?: string | null
  }[]
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
