'use client';

import { PersonNode } from '@/components/PersonNode/PersonNode';
import { Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { memo, useCallback, useEffect, useState } from 'react';

const initialNodes = [
  { id: '1', position: { x: 600, y: 250 }, data: { label: '1' } },
];
const rfStyle = {
  backgroundColor: '#23ar32',
};

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const nodeTypes = { customNode: PersonNode };

export default memo(
  function Home({ params }) {
    const { slug } = params;
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [person, setPerson] = useState({});

    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );

    useEffect(() => {
      async function getPersonAsync() {
        try {
          const person = await getPerson(slug);

          setPerson(person);

          const newNode = {
            id: 2,
            type: 'custom',
            data: { name: 'New Node', description: 'This is a new node' },
            position: { x: 600, y: 300 },
          };
          setNodes((els) => [...els, newNode]);
          setEdges(prevEdges => [...prevEdges, { id: 'e22', source: '1', target: '2' }])

          console.log(nodes)
        } catch (error) {
        }
      }
        getPersonAsync();
    }, []);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === '3' ? { ...node, data: { ...node.data, name: person.name } } : node
        )
      );

    // useEffect(() => {
    //   console.log(nodes)
    // }, [nodes])



    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          style={rfStyle}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
  }
);