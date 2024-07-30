'use client';

import { getDetails, getPerson } from '@/client/person';
import { LayoutNode } from '@/components/LayoutNode/LayoutNode';
import { PersonNode } from '@/components/PersonNode/PersonNode';
import { createGraphData } from '@/helpers/createGraphData';
import { Background, Controls, ReactFlow, useEdgesState, useNodesState, useUpdateNodeInternals } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { memo, useCallback, useEffect, useState } from 'react';

const nodeTypes = { default: LayoutNode };
const initialEdges = [
  { id: 'e1-2', source: 'hero-1', target: 'movie-1' },
  { id: 'e2-3', source: 'movie-2', target: 'ship-2' },
]

export default memo(
  function Home({ params }) {
    const { slug } = params;
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [person, setPerson] = useState({});
    const [movies, setMovies] = useState([]);
    const [starships, setStarships] = useState([]);


    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );

    useEffect(() => {
      async function getPersonAsync() {
        try {
          const { heroInfo, movies, starships } = await getDetails(slug);

          setPerson(heroInfo);
          setMovies(movies);
          setStarships(starships);
        } catch (error) {
        }
      }
        getPersonAsync();
    }, [slug]);

    useEffect(() => {
      if (!person || !movies || !starships) return;

      const {
        nodes: newNodes,
        edges: newEdges
      } = createGraphData(person, movies, starships);
      setEdges(newEdges);
      setNodes(newNodes);
    }, [person, movies, starships])

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
  }
);