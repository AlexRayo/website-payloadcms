import type { CollectionConfig } from 'payload'

const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions', // debe coincidir con el slug original del plugin
  admin: {
    useAsTitle: 'summary',
  },
  fields: [
    {
      name: 'summary',
      type: 'text',
      label: 'Resumen',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        // 🔒 Aseguramos que data exista antes de acceder a sus propiedades
        if (!data) return

        try {
          // Payload puede guardar los datos del formulario en `submissionData` o `data`
          const formData: Record<string, any> =
            data.submissionData || data.data || {}

          const name = formData.name || formData.nombre || ''
          const email = formData.email || ''
          const subject = formData.subject || formData.asunto || ''
          const message = formData.message || formData.mensaje || ''

          const parts = []
          if (name) parts.push(name)
          if (email) parts.push(`<${email}>`)
          if (subject) parts.push(`— ${subject}`)

          const preview =
            message?.length > 0
              ? `: ${message.slice(0, 100)}${message.length > 100 ? '…' : ''}`
              : ''

          data.summary = `${parts.join(' ')}${preview}`.trim() || 'Nueva sumisión'
        } catch (e) {
          data.summary = data.summary || 'Nueva sumisión'
        }

        return data
      },
    ],
  },
}

export default FormSubmissions
