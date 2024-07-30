import { Handle, Position } from "@xyflow/react";

export function LayoutNode({ data, isConnectable }) {
	return (
		<div className='bg-white p-2 border-black border-[1px]'>
			<h1>{data.label}</h1>
			<Handle
				type='source'
				position={Position.Top}
				id='a'
				isConnectable={true}
			/>
			<Handle
				type='source'
				position={Position.Bottom}
				id='b'
				isConnectable={true}
			/>
		</div>
	);
}
