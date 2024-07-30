import Link from 'next/link';

export function Person({name, id}) {
  return (
		<li className={`item my-2 bg-slate-300 px-2 py-1 hover:scale-[105%] transition-all duration-300 rounded-lg cursor-pointer`}>
			<Link className="block w-full" href={`/people/${id}`}>{name}</Link>
		</li>
	);
}