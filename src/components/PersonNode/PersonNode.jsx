"use client";

import { Handle, Position } from "@xyflow/react";

const style = {
	color: "#fff",
};

export function PersonNode({ data }) {
	return (
		<>
			<Handle type='target' position={Position.Top} />
			<div className=' text-black bg-white border-[1px] border-black py-2 px-14'>
				<h2>{data.name}</h2>
			</div>
			<Handle type='source' position={Position.Bottom} id='a' />
		</>
	);
}
