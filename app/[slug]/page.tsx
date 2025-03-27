import { Metadata } from 'next';
import ClientPage from './ClientPage';

type Props = {
  params: { slug: string }
}

// This is a server component function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Page: ${params.slug}`,
    // Add other metadata as needed
  };
}

// This is the page component (also a server component)
export default function Page({ params }: Props) {
  return <ClientPage slug={params.slug} />;
}
