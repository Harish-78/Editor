const yourArray = [
    {
      "_id": "65c1aa67cd931eb77d5ed443",
      "editorData": [],
      "id": "1707132387367",
      "isFolder": [true],
      "name": "hvbj",
      "items": [],
      "__v": 0
    },
    {
      "_id": "65c1aa82cd931eb77d5ed445",
      "editorData": [],
      "id": "1706949891941",
      "isFolder": [true],
      "name": "df",
      "items": [],
      "__v": 0
    }
  ];
  
  const sortedArray = yourArray.sort((a, b) => {
    const timestampA = parseInt(a.id, 10); 
    const timestampB = parseInt(b.id, 10);
  
    return timestampA - timestampB;
  });
  
  console.log(sortedArray);
  