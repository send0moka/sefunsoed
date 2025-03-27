import { Metadata } from 'next';
import ClientPage from './ClientPage';

type Props = {
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Page: ${params.slug}`,
    // Add other metadata as needed
  };
}

export default function Page({ params }: Props) {
  return <ClientPage slug={params.slug} />;
}
