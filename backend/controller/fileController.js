const fileData = require("../model/dataSchema");

const getFile = async (req, res) => {
  try {
    const data = await fileData.find();
    return res.status(200).send({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

const submitFile = async (req, res) => {
  try {
    const { name, isFolder, id, expand, editorData } = req.body;
    const userForm = new fileData({
      name,
      isFolder,
      id,
      expand,
      editorData,
    });
    await userForm.save();
    res.status(200).send({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const editFile = () => {};
const deleteFile = () => {};

const getCompleteFileData = async (req, res) => {
  try {
    const data = await fileData.find();
    return res.status(200).send({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

const submitCompleteFileData = async (req, res) => {
  try {
    const { name, isFolder, id, expand, editorData ,items } = req.body;
    const userForm = new fileData({
      name,
      isFolder,
      id,
      expand,
      editorData,
      items,
    });
    await userForm.save();
    res.status(200).send({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getFile,
  submitFile,
  editFile,
  deleteFile,
  getCompleteFileData,
  submitCompleteFileData,
};
