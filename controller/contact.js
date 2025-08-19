import { Contact } from "../models/Contact.js";

export const getALLContact = async (req, res) => {
  const userContact = await Contact.find();

  if (!userContact)
    return res
      .status(201)
      .json({ message: "no contatact exist", success: false });

  res.json({ message: "ALL contact fetched", userContact });
};

// update contact by id

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone, type },
    { new: true }
  );

  //   agr maan lo wo id hai hi nhi to
  if (!updatedContact)
    return res.json({ message: "this id will not exist", success: false });

  //   id mil gayi aur update ho jaane par
  res.json({
    message: "contact updated succesfully ....!",
    updatedContact,
    success: true,
  });
};

//  delete contact by id

export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  let deleteContact = await Contact.findByIdAndDelete(id);

  //   agr maan lo wo id hai hi nhi to
  if (!deleteContact)
    return res.json({ message: "this id will not exist", success: false });

  //   id mil gayi aur update ho jaane par
  res.json({
    message: "delete contact succesfully ....!",

    success: true,
  });
};

// create new  contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == "" || email == "" || phone == "" || type == "")
    return res.json({ message: "all feilds are required", success: false });

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });
  res.status(201).json({
    message: "contact saved successfully ",
    saveContact,
    success: true,
  });
};

// get contact by id
export const getContactById = async (req, res) => {
  const id = req.params.id;

  const usercontact = await Contact.findById(id);
  if (!usercontact)
    return res.json({ message: "no contact find", success: false });

  res.json({ message: "Contact fetched", usercontact, success: true });
};

// get contact by userid
export const getContactByUserId = async (req, res) => {
  const id = req.params.id;

  const usercontact = await Contact.find({ user: id });
  if (!usercontact)
    return res.json({ message: "no contact find", success: false });

  res.status(202).json({
    message: "user specific Contact fetched",
    usercontact,
    success: true,
  });
};
