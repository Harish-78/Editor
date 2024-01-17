import React, { useState } from 'react';
import Tree from 'react-animated-tree';
 
const Sidebar = () => {
  const [folders, setFolders] = useState([]);
 
  const addFolder = (parentId = null) => {
    const newFolder = {
      id: new Date().getTime(),
      name: parentId ? `Child ${parentId}-${folders.length + 1}` : `Folder ${folders.length + 1}`,
      children: [],
      parentId,
    };
 
    setFolders([...folders, newFolder]);
  };
 
  const addChild = (parentId) => {
    const newChild = {
      id: new Date().getTime(),
      name: `Child ${parentId}-${folders.length + 1}`,
      children: [],
      parentId,
    };
 
    const updatedFolders = addChildToFolder([...folders], parentId, newChild);
 
    setFolders(updatedFolders);
  };
 
  const addChildToFolder = (currentFolders, parentId, newChild) => {
    return currentFolders.map((folder) => {
      if (folder.id === parentId) {
        return { ...folder, children: [...folder.children, newChild] };
      } else if (folder.children && folder.children.length > 0) {
        return { ...folder, children: addChildToFolder(folder.children, parentId, newChild) };
      } else {
        return folder;
      }
    });
  };
 
  const renderTree = (nodes, level = 0) => (
    <Tree key={nodes.id} node={nodes} open={!nodes.parent} style={{ marginLeft: `${level * 20}px` }}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node, level + 1))
        : null}
      <button onClick={() => addChild(nodes.id)}>Add Child</button>
    </Tree>
  );
  console.log(folders)
  return (
    <div>
      <button onClick={() => addFolder()}>Add Folder</button>
      {folders.map((folder) => renderTree(folder))}
    </div>
  );
};
 
export default Sidebar;