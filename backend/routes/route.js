const router = require("express").Router();

const {
  getFile,
  submitFile,
  editFile,
  deleteFile,
  getCompleteFileData,
  submitCompleteFileData,
  getAllFile,
} = require("../controller/fileController");

router.get("/getfile/:id", getFile);
router.post("/submitfile", submitFile);
router.patch("/editfile", editFile);
router.delete("/deletefile", deleteFile);
router.post("/submitfolderdata", submitCompleteFileData);
router.get("/getfolderData", getCompleteFileData);
router.get("/getallfiledata", getAllFile);

module.exports = router;
