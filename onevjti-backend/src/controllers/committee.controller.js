// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { Committee } from "../models/committee.model.js";
// import { User } from "../models/user.model.js";
// import { Member } from "../models/member.model.js";
// import { Notification } from "../models/notification.model.js";

// //CREATE
// const createCommittee = asyncHandler(async (req, res) => {
//     const { name, description, headUserId } = req.body; // Fixed typo from 'headserId'

//     if (!name || !description) {
//         throw new ApiError(400, "Name and description required");
//     }
//     //Generate a simple slug from the name
//     const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

//     if (req.user.role !== "admin") {
//         throw new ApiError(403, "Only admin can create committee");
//     }

//     let logoUrl = "";
//     if (req.file?.path) {
//         const logo = await uploadOnCloudinary(req.file.path);
//         if (logo?.secure_url) logoUrl = logo.secure_url;
//     }

//     const committee = await Committee.create({
//         name,
//         description,
//         logo: logoUrl,
//         slug: slug
//     });

//     //Assign the head: Use provided headUserId, otherwise the admin who created it
//     const targetHeadId = headUserId || req.user._id;

//     await Member.create({
//         user: targetHeadId,
//         committee: committee._id,
//         role: "head",
//     });

//     return res.status(201).json(
//         new ApiResponse(201, committee, "Committee created successfully")
//     );
// });

// //UPDATE
// const updateCommittee = asyncHandler(async (req, res) => {
//     const { committeeId } = req.params;
//     const { name, description } = req.body;

//     // Authorization Check
//     const isAdmin = req.user.role === "admin";
//     const member = await Member.findOne({ user: req.user._id, committee: committeeId });
//     const isAuthorizedMember = member && ["head", "core"].includes(member.role);

//     if (!isAdmin && !isAuthorizedMember) {
//         throw new ApiError(403, "You do not have permission to edit this committee");
//     }

//     let logoUrl;
//     if (req.file?.path) {
//         const logo = await uploadOnCloudinary(req.file.path);
//         if (logo?.secure_url) logoUrl = logo.secure_url;
//     }

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (description) updateData.description = description;
//     if (logoUrl) updateData.logo = logoUrl;

//     const updatedCommittee = await Committee.findByIdAndUpdate(
//         committeeId,
//         { $set: updateData },
//         { new: true }
//     );

//     if (!updatedCommittee) throw new ApiError(404, "Committee not found");

//     return res.status(200).json(
//         new ApiResponse(200, updatedCommittee, "Committee updated successfully")
//     );
// });

// //DELETE
// const deleteCommittee = asyncHandler(async (req, res) => {
//     const { committeeId } = req.params;

//     // Admin can delete anything. Heads can delete their own committee.
//     const isAdmin = req.user.role === "admin";
//     const member = await Member.findOne({ user: req.user._id, committee: committeeId });
//     const isHead = member && member.role === "head";

//     if (!isAdmin && !isHead) {
//         throw new ApiError(403, "Not authorized to delete this committee");
//     }

//     const committee = await Committee.findById(committeeId);
//     if (!committee) throw new ApiError(404, "Committee not found");

//     await Member.deleteMany({ committee: committeeId });
//     await Committee.findByIdAndDelete(committeeId);

//     return res.status(200).json(
//         new ApiResponse(200, committeeId, "Committee deleted successfully")
//     );
// });

// //OTHERS
// const getAllCommittees = asyncHandler(async (req, res) => {
//     const committees = await Committee.find().select("name description logo slug");
//     return res.status(200).json(new ApiResponse(200, committees, "Fetched successfully"));
// });

// const toggleFollow = asyncHandler(async (req, res) => {
//     const { committeeId } = req.params;
//     const committee = await Committee.findById(committeeId);
//     if (!committee) throw new ApiError(404, "Committee does not exist");

//     const user = await User.findById(req.user._id);
//     const index = user.following.findIndex(id => id.toString() === committeeId);
    
//     if (index === -1) user.following.push(committeeId);
//     else user.following.splice(index, 1);

//     await user.save({ validateBeforeSave: false });
//     return res.status(200).json(new ApiResponse(200, user.following, "Follow status updated"));
// });

// const getMyNotifications = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     const notifications = await Notification.find({ committee: { $in: user.following } })
//         .populate("committee", "name logo")
//         .sort({ createdAt: -1 });

//     return res.status(200).json(new ApiResponse(200, notifications, "Feed fetched"));
// });

// const getCommitteeBySlug = asyncHandler(async (req, res) => {
//     const { slug } = req.params;
  
//     const committee = await Committee.findOne({ slug });
  
//     if (!committee) {
//       throw new ApiError(404, "Committee not found");
//     }
  
//     return res.status(200).json(
//       new ApiResponse(200, committee, "Committee fetched")
//     );
//   });
  

//   const getCommitteeMembers = asyncHandler(async (req, res) => {
//     const { committeeId } = req.params;
  
//     const members = await Member.find({ committee: committeeId })
//       .populate("user", "fullName username email")
//       .sort({ role: 1 });
  
//     return res.status(200).json(
//       new ApiResponse(200, members, "Members fetched")
//     );
//   });
  
// export { createCommittee, getAllCommittees, updateCommittee, toggleFollow, getMyNotifications, deleteCommittee, getCommitteeBySlug, getCommitteeMembers };































import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Committee } from "../models/committee.model.js";
import { User } from "../models/user.model.js";
import { Member } from "../models/member.model.js";
import { Notification } from "../models/notification.model.js";

/* ======================================================
   CREATE COMMITTEE
====================================================== */
const createCommittee = asyncHandler(async (req, res) => {
  const { name, description, headUserId } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Name and description required");
  }

  const slug = name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Only admin can create committee");
  }

  let logoUrl = "";
  if (req.file?.path) {
    const logo = await uploadOnCloudinary(req.file.path);
    if (logo?.secure_url) logoUrl = logo.secure_url;
  }

  const committee = await Committee.create({
    name,
    description,
    logo: logoUrl,
    slug,
  });

  const targetHeadId = headUserId || req.user._id;

  await Member.create({
    user: targetHeadId,
    committee: committee._id,
    role: "head",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, committee, "Committee created successfully"));
});

/* ======================================================
   UPDATE COMMITTEE
====================================================== */
const updateCommittee = asyncHandler(async (req, res) => {
  const { committeeId } = req.params;
  const { name, description } = req.body;

  const isAdmin = req.user.role === "admin";

  const member = await Member.findOne({
    user: req.user._id,
    committee: committeeId,
  });

  const isAuthorizedMember =
    member && ["head", "core"].includes(member.role);

  if (!isAdmin && !isAuthorizedMember) {
    throw new ApiError(403, "Not allowed to edit committee");
  }

  let logoUrl;
  if (req.file?.path) {
    const logo = await uploadOnCloudinary(req.file.path);
    if (logo?.secure_url) logoUrl = logo.secure_url;
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (logoUrl) updateData.logo = logoUrl;

  const updatedCommittee = await Committee.findByIdAndUpdate(
    committeeId,
    { $set: updateData },
    { new: true }
  );

  if (!updatedCommittee) {
    throw new ApiError(404, "Committee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCommittee, "Committee updated"));
});

/* ======================================================
   DELETE COMMITTEE
====================================================== */
const deleteCommittee = asyncHandler(async (req, res) => {
  const { committeeId } = req.params;

  const isAdmin = req.user.role === "admin";

  const member = await Member.findOne({
    user: req.user._id,
    committee: committeeId,
  });

  const isHead = member && member.role === "head";

  if (!isAdmin && !isHead) {
    throw new ApiError(403, "Not authorized");
  }

  const committee = await Committee.findById(committeeId);

  if (!committee) {
    throw new ApiError(404, "Committee not found");
  }

  await Member.deleteMany({ committee: committeeId });
  await Committee.findByIdAndDelete(committeeId);

  return res
    .status(200)
    .json(new ApiResponse(200, committeeId, "Committee deleted"));
});

/* ======================================================
   GET ALL COMMITTEES
====================================================== */
const getAllCommittees = asyncHandler(async (req, res) => {
  const committees = await Committee.find().select(
    "name description logo slug"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, committees, "Fetched successfully"));
});

const toggleFollow = asyncHandler(async (req, res) => {
  const { committeeId } = req.params;

  const committee = await Committee.findById(committeeId);
  if (!committee) throw new ApiError(404, "Committee not found");

  const user = await User.findById(req.user._id);

  const index = user.following.findIndex(
    (id) => id.toString() === committeeId
  );

  if (index === -1) user.following.push(committeeId);
  else user.following.splice(index, 1);

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user.following, "Follow updated"));
});


const getMyNotifications = asyncHandler(async (req, res) => {

  const notifications = await Notification.find({})
    .populate("committee", "name logo")
    .populate("event", "title")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, notifications, "All notifications fetched")
  );
});
const getCommitteeBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const committee = await Committee.findOne({ slug });

  if (!committee) {
    throw new ApiError(404, "Committee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, committee, "Committee fetched"));
});

const getCommitteeMembers = asyncHandler(async (req, res) => {
  const { committeeId } = req.params;

  const members = await Member.find({ committee: committeeId })
    .populate("user", "fullName username email")
    .sort({ role: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched"));
});

export {
  createCommittee,
  getAllCommittees,
  updateCommittee,
  toggleFollow,
  getMyNotifications,
  deleteCommittee,
  getCommitteeBySlug,
  getCommitteeMembers,
};
