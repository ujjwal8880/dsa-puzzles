import { notFound } from 'next/navigation';
import { QUESTIONS_BY_SLUG } from '@/data/questions';
import { ProblemPage } from '@/components/problem/ProblemPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(QUESTIONS_BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const question = QUESTIONS_BY_SLUG[slug];
  if (!question) return { title: 'Not Found' };
  return {
    title: `${question.title} — DSA Puzzles`,
    description: question.intuitionSummary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const question = QUESTIONS_BY_SLUG[slug];
  if (!question) notFound();
  return <ProblemPage question={question} />;
}
