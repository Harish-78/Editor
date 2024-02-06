const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
        data: [
         
        ],
        parentID: folderId,
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
    console.log(tree, folderId);
    const updatedFolders = deleteFolderById([...tree.items], folderId);
    if (updatedFolders) {
      tree.items = updatedFolders;
    }
  };

  const deleteFolderById = (currentFolders, targetId) => {
    let updatedFolders = null;

    const findAndDelete = (folders) => {
      for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];

        if (folder.id === targetId) {
          folders.splice(i, 1);
          updatedFolders = [...folders];
          break;
        }

        if (folder.items && folder.items.length > 0) {
          findAndDelete(folder.items);

          if (updatedFolders) {
            break;
          }
        }
      }
    };

    findAndDelete(currentFolders);

    return updatedFolders;
  };

  const renameNode = (tree, folderId, newName) => {};

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
