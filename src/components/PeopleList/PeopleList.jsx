"use client";

import { getAllUsers } from "@/client/people";
import { useEffect, useState } from "react";
import { Person } from "../Person/Person";
import { Button } from "../Button/Button";
import styles from "./styles.module.css";

export function PeopleList() {
	const [people, setPeople] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		async function getUsers() {
			try {
				const data = await getAllUsers(page);
				console.log("page:", page);
				setPeople(data.results);
			} catch (error) {
				console.log(error);
			}
		}
		getUsers();
	}, [page]);

	const handlePrevPageClick = () => {
		setPage(prevPage => {
			if (prevPage === 1) return prevPage;

			return prevPage - 1;
		});
	};

	const handleNextPageClick = () => {
		setPage(prevPage => {
			if (prevPage === 9) return prevPage;

			return prevPage + 1;
		});
	};

	return (
		<>
			<ul>
				{people.map(({ id, name }) => (
					<Person key={id} name={name} index={id} />
				))}
			</ul>

			<div className={styles.buttonList}>
				<Button
					title='<'
					handleClick={() => handlePrevPageClick}
					buttonStyles='bg-slate-500 rounded-full px-2 text-white'
				/>
				<Button
					title='>'
					handleClick={() => handleNextPageClick}
					buttonStyles='bg-slate-500 rounded-full px-2 text-white'
				/>
			</div>
		</>
	);
}
