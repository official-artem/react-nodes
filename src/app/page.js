import { PeopleList } from '@/components/PeopleList/PeopleList';

export default function Home() {
  return (
    <>
      <h1 className="mb-4 font-mono font-bold text-center">StarWars Heroes</h1>
      <PeopleList />
    </>
  );
}
