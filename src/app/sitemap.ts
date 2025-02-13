/* eslint-disable react-hooks/rules-of-hooks */
import { MetadataRoute } from 'next'
import { env } from '@env'
import {
  _staticSitemapUrls,
} from '@/libs/sitemap'

// TODO: 1.4 -Add Url and dynamic sitemap urls here
const baseURL = env.NEXTAUTH_URL || 'https://arch.nexellab.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  return [
    ..._staticSitemapUrls.map(({ title, url, ...staticUrl }: any) => ({
      url: baseURL + url,
      ...staticUrl,
    })),
  ]
}
