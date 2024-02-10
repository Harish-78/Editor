const router = require("express").Router();

const {
  getFile,
  submitFile,
  updateFile,
  deleteFile,
  getAllFile,
} = require("../controller/fileController");

router.get("/getfile/:id", getFile);
router.post("/submitfile", submitFile);
router.patch("/updatefile/:id", updateFile);
router.delete("/deletefile", deleteFile);
router.get("/getallfiledata", getAllFile);

module.exports = router;
