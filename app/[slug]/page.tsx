import { Metadata } from "next"
import ClientPage from "./ClientPage"

interface PageParams {
  slug: string
}

interface PageProps {
  params: PageParams
  searchParams: Record<string, string | string[] | undefined>
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  return {
    title: `Page: ${params.slug}`,
    // Add other metadata as needed
  }
}

export default function Page({ 
  params 
}: PageProps) {
  return <ClientPage slug={params.slug} />
}
