/* eslint-disable react-hooks/rules-of-hooks */

import { env } from '@env'
import type { MetadataRoute } from 'next'
import { _staticSitemapUrls } from '@/libs/sitemap'

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: 1.4 -Add Url and dynamic sitemap urls here
  const baseURL = env.BASE_URL || 'https://arch.nexellab.com'
  return [
    ..._staticSitemapUrls.map(({ url, ...staticUrl }) => ({
      url: baseURL + url,
      ...staticUrl,
    })),
  ] as MetadataRoute.Sitemap
}
