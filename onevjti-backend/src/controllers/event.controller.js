import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Event } from "../models/event.model.js";
import { Member } from "../models/member.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const createEvent = asyncHandler(async(req, res) => {
    const {
        title,
        description,
        registrationLink,
        location,
        eventType,
        startDate,
        endDate,
    } = req.body;
    
    // 1. Validation
    if (!title || !description || !eventType || !startDate) {
        throw new ApiError(400, "Required fields are missing");
    }

    // 2. Authorization
    const member = await Member.findOne({ user: req.user._id });
    if(!member) throw new ApiError(403, "User is not part of any committee");
    if (!["core", "head"].includes(member.role)) throw new ApiError(403, "Not authorized");

    const committee = member.committee

    // 3. SAFE UPLOAD LOGIC 
    let posterUrl = ""; 
    const posterLocalPath = req.file?.path; 

    if (posterLocalPath) {
        try {
            const poster = await uploadOnCloudinary(posterLocalPath);
            if (poster && poster.url) {
                posterUrl = poster.url;
            }
        } catch (error) {
            console.log("Image upload failed, creating event without image. Error:", error);
        }
    }

    // 4. Create Event
    const event = await Event.create({
        title,
        description,
        poster: posterUrl, 
        registrationLink,
        location,
        eventType,
        startDate,
        endDate,
        createdBy: req.user._id,
        committee
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            event,
            "Event Created Successfully" + (posterUrl ? "!" : " (Image upload failed, but event created)")
        )
    )
})
const getAllEvents = asyncHandler(async(req, res) => {

    const {committee, eventType, upcoming} = req.query

    const filter = {}

    if(committee) {
        filter.committee = committee
    }

    if(eventType) {
        filter.eventType = eventType
    }

    if(upcoming == "true") {
        filter.startDate = { $gte: new Date() }
    }

    const events = await Event.find(filter)
    .populate("committee", "name logo")
    .populate("createdBy", "username fullName")
    .sort({ startDate: 1 })

    return res.status(200).json(
        new ApiResponse(
            200,
            events,
            "Events fetched successfully"
        )
    );

})

const getEventById = asyncHandler(async (req, res) => {
    console.log("🟡 getEventById HIT");
    console.log("eventId:", req.params.eventId);
  
    const { eventId } = req.params;
  
    const event = await Event.findById(eventId);
    console.log("event found:", event);
  
    const populatedEvent = await Event.findById(eventId)
      .populate("committee", "name logo")
      .populate("createdBy", "username fullName");
  
    console.log("populated event:", populatedEvent);
  
    return res.status(200).json(
      new ApiResponse(200, populatedEvent, "Event fetched successfully")
    );
  });
  
const updateEvent = asyncHandler(async (req, res) => {

    const { eventId } = req.params;
  
    const {
      title,
      description,
      registrationLink,
      location,
      eventType,
      startDate,
      endDate,
    } = req.body;
  
    if (!eventId) {
      throw new ApiError(400, "Event ID is required");
    }
  
    const requester = await Member.findOne({ user: req.user._id });
  
    if (!requester) {
      throw new ApiError(403, "Not a committee member");
    }
  
    if (!["head", "core"].includes(requester.role)) {
      throw new ApiError(403, "Not authorized");
    }
  
    const event = await Event.findById(eventId);
  
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
  
    if (event.committee.toString() !== requester.committee.toString()) {
      throw new ApiError(403, "Unauthorized access");
    }
  
    // Poster upload
    let posterUrl = event.poster;
  
    if (req.file?.path) {
      const poster = await uploadOnCloudinary(req.file.path);
  
      if (poster?.url) {
        posterUrl = poster.url;
      }
    }
  
    // Update
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        registrationLink,
        location,
        eventType,
        startDate,
        endDate,
        poster: posterUrl,
      },
      { new: true }
    );
  
    return res.status(200).json(
      new ApiResponse(200, updatedEvent, "Event Updated Successfully")
    );
  });
  
const deleteEvent = asyncHandler(async(req, res) => {
    const { eventId } = req.params

    if(!eventId) {
        throw new ApiError(400, "Event ID is required");
    }

    const requester = await Member.findOne({user: req.user._id})

    if (!requester) {
        throw new ApiError(403, "Not a committee member");
    }

    if(!["head","core","admin"].includes(requester.role))
        {
            throw new ApiError(403, "You are not authorized to delete events")
        }

    const event = await Event.findById(eventId)

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (
        event.committee.toString() !==
        requester.committee.toString()
    ) {
        throw new ApiError(403, "Unauthorized access");
    }

    await Event.findByIdAndDelete(eventId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            eventId,
            "Event deleted successfully"
        )
    )
})


const getEventsByCommittee = asyncHandler(async (req, res) => {
  const { committeeId } = req.params;

  const events = await Event.find({ committee: committeeId })
    .sort({ startDate: -1 });

  return res.status(200).json(
    new ApiResponse(200, events, "Committee events fetched")
  );
});

export {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventsByCommittee
}