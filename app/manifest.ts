import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Minnesota Retro Technology Club',
    short_name: 'MNRTC',
    description: "A user's group for retro/vintage computer and technology enthusiasts in the Twin Cities",
    start_url: '/',
    display: 'standalone',
    background_color: '#008080',
    theme_color: '#dddddd',
    icons: [
      {
        src: '/images/full-logo.png',
        sizes: '200x200',
        type: 'image/png',
      },
    ],
  };
}

