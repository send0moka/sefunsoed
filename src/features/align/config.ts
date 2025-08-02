import { AlignFeature } from '@payloadcms/richtext-lexical'

/**
 * Alignment feature configuration untuk rich text editor
 *
 * Menyediakan fitur alignment dengan UI seperti Google Docs:
 * - Left align (default)
 * - Center align
 * - Right align
 * - Justify align
 *
 * UI akan menampilkan:
 * - Ikon align left sebagai default
 * - Dropdown menu dengan pilihan alignment saat diklik
 * - Pilihan ditampilkan dalam flex row layout
 */
export const alignFeature = AlignFeature
