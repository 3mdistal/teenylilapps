import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Payload } from 'payload'
import { unstable_cache as cache } from 'next/cache'
import Image from 'next/image'
import configPromise from '@payload-config'
import type { Film, Media } from '@/payload-types'
import AspectRatio from '@/components/ui/aspect-ratio'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import { getURL } from '@/utilities/get-url'
import { Link } from 'next-view-transitions'
import styles from './film-page.module.css'

const getCachedFilm = (slug: string): Promise<Film> =>
  cache(
    async () => {
      const payload: Payload = await getPayloadHMR({
        config: configPromise,
      })

      const response = await payload.find({
        collection: 'films',
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      return response.docs[0]
    },
    ['film-cache', slug],
    {
      tags: [`film-${slug}`],
    },
  )()

const getAllFilms = cache(
  async () => {
    const response = await fetch(`${getURL()}/fetch/films-list`, {
      next: { tags: ['films'] },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch films')
    }
    return response.json() as Promise<Array<Pick<Film, 'title' | 'slug'>>>
  },
  ['all-films'],
  {
    tags: ['films'],
  },
)

export default async function FilmPage({ slug }: { slug: string }): Promise<React.ReactElement> {
  const film = await getCachedFilm(slug)
  const films = await getAllFilms()
  const currentIndex = films.findIndex((film) => film.slug === slug)
  const prevFilm = currentIndex > 0 ? films[currentIndex - 1] : null
  const nextFilm = currentIndex < films.length - 1 ? films[currentIndex + 1] : null

  const adjacentFilms = {
    prev: prevFilm ? { title: prevFilm.title, slug: prevFilm.slug } : null,
    next: nextFilm ? { title: nextFilm.title, slug: nextFilm.slug } : null,
  }

  // Define sizes based on the grid layout
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <article className={styles.filmArticle}>
      <h1 className={styles.filmTitle} tabIndex={-1}>
        {film.title}
      </h1>
      <section className={styles.filmDetails} aria-labelledby="film-details-heading">
        <h2 id="film-details-heading" className="sr-only">
          Film Details
        </h2>
        <dl className={styles.filmMetadata}>
          <dt>Director</dt>
          <dd>{film.director}</dd>
          <dt>Producer</dt>
          <dd>{film.producer}</dd>
          <dt>Release Date</dt>
          <dd>
            {new Date(film.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </dd>
        </dl>
        {film.trailer ? (
          <section className={styles.trailerSection} aria-labelledby="trailer-heading">
            <h3 id="trailer-heading">Trailer</h3>
            <div className={styles.trailerContainer}>
              <iframe
                className={styles.trailerEmbed}
                src={film.trailer}
                title={`${film.title} trailer`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}
      </section>
      <section className={styles.stillsSection} aria-labelledby="stills-heading">
        <h2 id="stills-heading" className="sr-only">
          Film Stills
        </h2>
        <div className={styles.stillsGrid}>
          {film.stills?.map((still, index) => {
            const { width, height } = getImageDimensions(still.image)
            return (
              <div key={still.id} className={styles.stillContainer}>
                <AspectRatio ratio={16 / 9} className={styles.stillAspectRatio}>
                  <div className={styles.stillImageWrapper}>
                    <Image
                      className={styles.stillImage}
                      src={createImageUrl(still.image)}
                      alt={`Still ${index + 1} from ${film.title}: ${(still.image as Media).alt || ''}`}
                      width={width}
                      height={height}
                      sizes={sizes}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </AspectRatio>
              </div>
            )
          })}
        </div>
      </section>
      <nav className={styles.filmNavigation} aria-label="Film navigation">
        {adjacentFilms.prev ? (
          <Link href={`/films/${adjacentFilms.prev.slug}`} className={styles.prevFilmLink}>
            <span aria-hidden="true">Previous</span>
            <span className="sr-only">Previous film:</span>
            <span>{adjacentFilms.prev.title}</span>
          </Link>
        ) : null}
        {adjacentFilms.next ? (
          <Link href={`/films/${adjacentFilms.next.slug}`} className={styles.nextFilmLink}>
            <span aria-hidden="true">Next</span>
            <span className="sr-only">Next film:</span>
            <span>{adjacentFilms.next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  )
}
