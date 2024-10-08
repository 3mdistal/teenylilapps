import type { Metadata } from 'next'
import type { Payload } from 'payload'
import type { StillsPage } from '@/payload-types'
import { unstable_cache as cache } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import StillImageFrame from '@/components/still/still-image-frame'
import { baseMetadata } from '@/components/base-metadata'
import { shuffleArray } from '@/utilities/shuffle'
import { createImageUrl, getImageDimensions } from '@/utilities/media'
import styles from './stills.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const stillsPage = await getCachedStills()

  if (stillsPage['og-info'].length > 0) {
    return {
      ...baseMetadata,
      description: stillsPage['og-info'][0].ogDescription,
      openGraph: {
        ...baseMetadata.openGraph,
        title: 'Stills - Anthropotpourri',
        description: stillsPage['og-info'][0].ogDescription,
        images: [
          {
            url: createImageUrl(stillsPage['og-info'][0].ogImage),
            width: 1200,
            height: 630,
            alt: 'Anthropotpourri',
          },
        ],
        url: `https://shoroukelkobrosi.com/stills`,
      },
    }
  } else {
    return baseMetadata
  }
}

const getCachedStills = cache(
  async (): Promise<StillsPage> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    })

    const stills = await payload.findGlobal({
      slug: 'stills-page',
    })

    return stills
  },
  ['stills-cache'],
  {
    tags: ['stills'],
  },
)

export default async function StillsPage(): Promise<React.ReactElement> {
  const stillsPage = await getCachedStills()
  const stills = stillsPage.stills
  const shuffledStills = shuffleArray(stills)

  // Define the sizes based on the masonry grid layout
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div className={styles.stillsPage}>
      <div className={styles.masonryGrid}>
        {shuffledStills.map((still) => {
          const { width, height } = getImageDimensions(still.still)
          return (
            <div key={still.id} className={styles.gridItem}>
              <StillImageFrame
                imageUrl={createImageUrl(still.still)}
                location={still.location ? still.location : ''}
                width={width}
                height={height}
                sizes={sizes}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
