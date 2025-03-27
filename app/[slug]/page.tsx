import { Metadata } from "next"
import ClientPage from "./ClientPage"

// Using Next.js 15 recommended patterns
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ 
  params 
}: Props): Promise<Metadata> {
  return {
    title: `Page: ${params.slug}`,
    // Add other metadata as needed
  }
}

// Make sure this matches the App Router pattern exactly
export default function Page({ 
  params,
}: Props) {
  return <ClientPage slug={params.slug} />
}
