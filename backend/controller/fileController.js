const fileData = require("../model/fileSchema");

const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fileData.findOne({ id: id });
    return res.status(200).send({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

const getAllFile = async (req, res) => {
  try {
    const { id } = req.params;
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



module.exports = {
  getFile,
  submitFile,
  editFile,
  deleteFile,
 
  getAllFile,
};
