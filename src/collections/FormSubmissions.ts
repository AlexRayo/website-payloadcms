import type { CollectionConfig } from 'payload'

const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions', // 👈 debe coincidir EXACTO con el slug del plugin
  admin: {
    useAsTitle: 'summary', // ahora el admin mostrará este campo como título
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
        try {
          const formData = data?.submissionData || data?.data || {}
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
