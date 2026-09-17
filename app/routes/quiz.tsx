import CardQuiz from '~/components/effect/CardQuiz';
import type { Route } from './+types/quiz';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Jedi Trial | Star Wars Explorer' },
    { name: 'description', content: 'Discover your true nature in the Force' },
  ];
}

export default function Quiz() {
  return (
    <div className="bg-main min-h-screen p-4 sm:p-8">
      <CardQuiz />
    </div>
  );
}
