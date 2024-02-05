const router = require("express").Router();

const {
  getFile,
  submitFile,
  editFile,
  deleteFile,
  getCompleteFileData,
  submitCompleteFileData,
} = require("../controller/fileController");

router.get("/getfile", getFile);
router.post("/submitfile", submitFile);
router.patch("/editfile", editFile);
router.delete("/deletefile", deleteFile);
router.post("/submitfolderdata", submitCompleteFileData);
router.get("/getfolderData", getCompleteFileData);

module.exports = router;
