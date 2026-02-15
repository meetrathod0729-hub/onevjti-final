import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";
import { Member } from "../models/member.model.js";

const createNotification = asyncHandler(async (req, res) => {

  const { message, type, committee, event } = req.body;

  if (!message || !committee) {
    throw new ApiError(400, "Message and committee required");
  }

  const requester = await Member.findOne({ user: req.user._id });

  if (!requester || !["head","core","admin"].includes(requester.role)) {
    throw new ApiError(403, "Unauthorized");
  }

  const notification = await Notification.create({
    message,
    type: type || "general",
    committee,
    event,
    user: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(201, notification, "Notification created")
  );
});

const getMyNotifications = asyncHandler(async (req, res) => {

  const notifications = await Notification.find({})
    .populate("committee", "name logo")
    .populate("event", "title")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, notifications, "Notifications fetched")
  );
});

const updateNotification = asyncHandler(async (req, res) => {

  const { notificationId } = req.params;
  const { message, type } = req.body;

  const requester = await Member.findOne({ user: req.user._id });

  if (!requester || !["head","core","admin"].includes(requester.role)) {
    throw new ApiError(403, "Unauthorized");
  }

  const updated = await Notification.findByIdAndUpdate(
    notificationId,
    { message, type },
    { new: true }
  );

  if (!updated) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updated, "Updated successfully")
  );
});

const deleteNotification = asyncHandler(async (req, res) => {

  const { notificationId } = req.params;

  const requester = await Member.findOne({ user: req.user._id });

  if (!requester || !["head","core","admin"].includes(requester.role)) {
    throw new ApiError(403, "Unauthorized");
  }

  await Notification.findByIdAndDelete(notificationId);

  return res.status(200).json(
    new ApiResponse(200, {}, "Deleted successfully")
  );
});

export {
  createNotification,
  getMyNotifications,
  updateNotification,
  deleteNotification
};
