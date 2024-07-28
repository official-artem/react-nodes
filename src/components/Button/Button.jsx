export function Button({ title, containerStyles, buttonStyles, handleClick }) {
	return (
		<div className={`${containerStyles}`}>
			<button 
				className={buttonStyles}
				onClick={handleClick()}
			>
				{title}
			</button>
		</div>
	);
}
