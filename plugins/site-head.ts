import smallLogoPng from '~/assets/logo/small-logo.png'
import smallLogoSvg from '~/assets/logo/small-logo.svg'
import ogImage from '~/assets/logo/og-image.png'
import twitterImage from '~/assets/logo/twitter-image.png'

export default defineNuxtPlugin(() => {
  const { origin } = useRequestURL()

  useHead({
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: smallLogoSvg },
      { rel: 'icon', type: 'image/png', href: smallLogoPng },
      { rel: 'apple-touch-icon', href: smallLogoPng },
    ],
    meta: [
      { property: 'og:image', content: `${origin}${ogImage}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${origin}${twitterImage}` },
    ],
  })
})
