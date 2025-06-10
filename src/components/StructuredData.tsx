import { generateStructuredData } from '@/lib/structured-data'

interface StructuredDataProps {
  schemas: Record<string, any>[]
}

export default function StructuredData({ schemas }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateStructuredData(schemas)
      }}
    />
  )
}