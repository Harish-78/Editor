const { folderData } = require("../model/folderSchema");

const getCompleteFileData = async (req, res) => {
  try {
    const data = await folderData.find();
    return res.status(200).send({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

const submitCompleteFileData = async (req, res) => {
  try {
    const { name, isFolder, id, expand, editorData, items } = req.body;
    const folderData = new folderData({
      name,
      isFolder,
      id,
      expand,
      editorData,
      items,
    });
    await folderData.save();
    res.status(200).send({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { getCompleteFileData, submitCompleteFileData };
