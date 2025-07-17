import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import RegistrationFormComponent from '@/blocks/RegistrationForm/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  TimelineBlock as TimelineBlockProps,
  AccordionBlock as AccordionBlockProps,
  RegistrationFormBlock as RegistrationFormBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import { CarouselBlock } from '@/blocks/CarouselBlock/Component'
import { cn } from '@/utilities/ui'

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
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | TimelineBlockProps
      | AccordionBlockProps
      | RegistrationFormBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    timeline: ({ node }) => <TimelineBlock {...node.fields} />,
    accordion: ({ node }) => <AccordionBlock {...node.fields} />,
    registrationForm: ({ node }: { node: SerializedBlockNode<RegistrationFormBlockProps> }) => (
      <RegistrationFormComponent
        title={node.fields.title || undefined}
        programs={node.fields.programs?.map((program) => {
          const extractedDescription = program.description
            ? extractTextFromRichText(program.description)
            : undefined

          // Debug logging
          console.log('Program from CMS:', {
            programId: program.programId,
            title: program.title,
            originalDescription: program.description,
            extractedDescription,
          })

          return {
            programId: program.programId,
            title: program.title,
            description: extractedDescription,
            price: program.price || undefined,
            duration: program.duration || undefined,
            isAvailable: program.isAvailable !== false,
          }
        })}
        personalFields={node.fields.personalFields?.map((field) => ({
          fieldName: field.fieldName,
          label: field.label,
          type: field.type,
          required: Boolean(field.required),
          placeholder: field.placeholder || undefined,
          selectOptions: field.selectOptions || undefined,
        }))}
        submitButtonText={node.fields.submitButtonText || undefined}
      />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
