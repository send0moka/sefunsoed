'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const englishLabel = data?.data?.link?.label
  const indonesianLabel = data?.data?.labelIndonesian

  let label = 'Nav Item'

  if (englishLabel || indonesianLabel) {
    const rowNum = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
    const labels = []

    if (englishLabel) labels.push(`EN: ${englishLabel}`)
    if (indonesianLabel) labels.push(`ID: ${indonesianLabel}`)

    label = `Nav item ${rowNum}: ${labels.join(' | ')}`
  }

  return <div>{label}</div>
}
