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
    const file = new fileData({
      name,
      isFolder,
      id,
      expand,
      editorData,
    });
    await file.save();
    res.status(200).send({ message: "Data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const updateFile = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    console.log("Data :", updateData);
    console.log("Id :", _id);
    const updatedFile = await fileData.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res
      .status(200)
      .json({ message: "Updated successfully", user: updatedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteFile = () => {};

module.exports = {
  getFile,
  submitFile,
  updateFile,
  deleteFile,

  getAllFile,
};
