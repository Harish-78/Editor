const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
        data: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, folderId) => {
    let indexToRemove = -1;

    tree.items.forEach((item, index) => {
      if (item.id === folderId) {
        indexToRemove = index;
      } else if (item.isFolder) {
        deleteNode(item, folderId);
      }
    });

    if (indexToRemove !== -1) {
      tree.items.splice(indexToRemove, 1);
    }

    return tree;
  };

  const renameNode = (tree, folderId, newName) => {
    tree.items = tree.items.map((item) => {
      if (item.id === folderId) {
        item.name = newName;
      } else if (item.isFolder) {
        renameNode(item, folderId, newName);
      }
      return item;
    });

    return tree;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
