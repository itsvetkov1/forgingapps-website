interface DiagramNodeProps { tag: string; name: string; sub: string }
export default function DiagramNode({ tag, name, sub }: DiagramNodeProps) {
  return <div className="diagram-node"><div className="node-tag">{tag}</div><div className="node-name">{name}</div><div className="node-sub">{sub}</div></div>
}
