import express from "express";
import {
  deleteContactById,
  getALLContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../controller/contact.js";
import { isAuthenticated } from "../Middleware/auth.js";

const router = express.Router();

//user contact
//@api dsc:-creating contact
//@api method:-post
//@api endpoint:-/api/contact/new
// jab jab koi /new pe click karega sabse pehle isauthenticated waala function chalega

router.post("/new", isAuthenticated, newContact);

// get all contacts
router.get("/", getALLContact);

// get contact by id
router.get("/:id", getContactById);

// update contact by id
router.put("/:id", isAuthenticated, updateContactById);

// delete contact successfully

router.delete("/:id", isAuthenticated, deleteContactById);

// get user specific contact
router.get("/userid/:id", getContactByUserId);
export default router;
