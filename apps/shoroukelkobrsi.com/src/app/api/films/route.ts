import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface FilmsList {
  title: string
  slug: string
}

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'films',
    sort: '-date',
    depth: 1,
  })

  const films = data.docs.map((film) => {
    return {
      title: film,
      slug: film.slug,
    }
  })

  return Response.json(films)
}
