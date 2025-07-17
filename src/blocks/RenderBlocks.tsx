import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import RegistrationFormComponent from '@/blocks/RegistrationForm/Component'
import PlanLayoutComponent from '@/blocks/PlanLayout/Component'
import ContactInformationComponent from '@/blocks/ContactInformation/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  timeline: TimelineBlock,
  accordion: AccordionBlock,
  registrationForm: RegistrationFormComponent,
  planLayout: PlanLayoutComponent,
  contactInformation: ContactInformationComponent,
}

// Helper function to extract plain text from RichText content
const extractTextFromRichText = (richTextContent: unknown): string | undefined => {
  if (!richTextContent) return undefined

  // Handle string case (for demo page)
  if (typeof richTextContent === 'string') {
    return richTextContent.trim().length > 0 ? richTextContent : undefined
  }

  // Handle RichText object case (from CMS)
  if (typeof richTextContent === 'object') {
    const content = richTextContent as { root?: { children?: unknown[] } }
    if (!content.root?.children) return undefined

    const extractTextFromNode = (node: unknown): string => {
      if (!node || typeof node !== 'object') return ''

      const nodeObj = node as { text?: string; children?: unknown[]; type?: string }

      // Handle text nodes
      if (nodeObj.text) return nodeObj.text

      // Handle container nodes with children
      if (nodeObj.children && Array.isArray(nodeObj.children)) {
        return nodeObj.children.map(extractTextFromNode).join('')
      }

      return ''
    }

    const text = content.root.children.map(extractTextFromNode).join(' ').trim()
    return text.length > 0 ? text : undefined
  }

  return undefined
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Special handling for registrationForm to transform RichText descriptions
              if (blockType === 'registrationForm') {
                const transformedBlock = {
                  ...block,
                  programs: block.programs?.map(
                    (program: {
                      title?: string
                      description?: unknown
                      [key: string]: unknown
                    }) => ({
                      ...program,
                      description: program.description
                        ? extractTextFromRichText(program.description)
                        : undefined,
                    }),
                  ),
                }

                return (
                  <div className="my-16" key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...transformedBlock} disableInnerContainer />
                  </div>
                )
              }

              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
