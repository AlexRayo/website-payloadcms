// (payload)/src/globals/home.ts
import type { GlobalConfig } from 'payload'

const Home: GlobalConfig = {
  slug: 'home',
  label: 'La wea home custom',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero',
            plural: 'Heros',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'subheading',
              type: 'text',
              label: 'Subtítulo',
            },
            {
              name: 'background',
              type: 'upload',
              relationTo: 'media', // <- obligatorio para upload
              label: 'Imagen de fondo',
            },
            {
              name: 'classes',
              type: 'text',
              label: 'Clases Tailwind (opcional)',
              admin: {
                description: 'Ej: bg-teal-600 text-white',
              },
            },
            {
              name: 'variant',
              type: 'select',
              label: 'Variante',
              options: [
                { label: 'Oscuro', value: 'dark' },
                { label: 'Claro', value: 'light' },
              ],
            },
          ],
        },
        // Puedes añadir más bloques aquí siguiendo la misma estructura
      ],
    },
  ],
}

export default Home
