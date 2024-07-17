// components/ContentRenderer.js
import React from "react";

const ContentRenderer = ({ content }: { content: any }) => {
  const renderNode = (node: any) => {
    switch (node.nodeType) {
      case "paragraph":
        return <p className='mb-4'>{node.content.map(renderNode)}</p>;
      case "text":
        return node.marks.some((mark: any) => mark.type === "bold") ? <strong>{node.value}</strong> : node.value;
      case "embedded-asset-block":
        return (
          <div className='my-4'>
            <img src={node.data.target.sys.id} alt='' className='max-w-full h-auto' />
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{content.map(renderNode)}</div>;
};

export default ContentRenderer;
