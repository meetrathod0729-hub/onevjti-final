import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Achievement } from "../models/achievement.model.js";
import { Member } from "../models/member.model.js";
import { Committee } from "../models/committee.model.js";

const addAchievement=asyncHandler(async(req,res)=>{
    const { committeeId } = req.params
    const {
        title,
        description,
        contestDate,
        winners,
        year,
        department,
    } = req.body;


    if(!title || !description || !year || !department){
        throw new ApiError(400, "Required Fields are not filled") 
    }
    //const requester = await Member.findOne({ user : req.user._id })

    const requester = await Member.findOne({
        user: req.user._id,
      }).populate("committee");
    
    if(!requester) {
            throw new ApiError(403, "Unauthorized Access")
        }
    
    if(!["head","core"].includes(requester.role)) {
            throw new ApiError(403, "Must me a head or core member of the committee")
    }
    if(!committeeId){
        throw new ApiError(400, "Committee ID is required")
    }
    const committee = await Committee.findById(committeeId)

    if(!committee){
        throw new ApiError(404, "Committee not found")
    }

    if( !requester.committee ||
        requester.committee._id.toString() !== committee._id.toString()
    ) {
        throw new ApiError(403, "Unauthorized Access")
    }


    const achievements=await Achievement.create({
        committee: committeeId,
        title,
        description,
        contestDate,
        winners,
        year,
        department
    })

    return res.status(201).json(
        new ApiResponse(201, achievements, "Achievement added successfully")
    );
})

const getAchievement=asyncHandler(async(req,res)=>{
    const { committeeId }=req.params
    if(!committeeId){
        throw new ApiError(400, "Committee ID is required")
    }

    const committee=await Committee.findById(committeeId)
    if(!committee){
        throw new ApiError(404, "Committee not found")
    }

    const achievementsFound=await Achievement.find({ committee: committeeId }).sort({createdAt: -1})
    return res.status(200).json(
        new ApiResponse(200, achievementsFound, "Achievements found successfully")
    )
})

const deleteAchievement = asyncHandler(async (req, res) => {
    const { achievementId } = req.params;

    if (!achievementId) {
        throw new ApiError(400, "Achievement ID is required");
    }

    const requester = await Member.findOne({ user: req.user._id }).populate("committee");

    if (!requester) {
        throw new ApiError(403, "Not a committee member");
    }

    if (!["head", "core"].includes(requester.role)) {
        throw new ApiError(403, "Only head or core members can delete achievements");
    }

    const achievement = await Achievement.findById(achievementId);

    if (!achievement) {
        throw new ApiError(404, "Achievement not found");
    }

    if (
        !requester.committee ||
        achievement.committee.toString() !==
          requester.committee._id.toString()
    ) {
        throw new ApiError(403, "Unauthorized access");
    }

    await achievement.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Achievement deleted successfully"
        )
    );
});
// Get single achievement (for edit page)
const getSingleAchievement = asyncHandler(async (req, res) => {

    const { achievementId } = req.params;
  
    const achievement = await Achievement.findById(achievementId);
  
    if (!achievement) {
      throw new ApiError(404, "Achievement not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, achievement, "Achievement found")
    );
  });

const updateAchievement = asyncHandler(async (req, res) => {

    const { achievementId } = req.params;
  
    const { title, description, contestDate, winners, year, department } = req.body;
  
    const requester = await Member.findOne({
      user: req.user._id,
    }).populate("committee");
  
    if (!requester || !["head", "core"].includes(requester.role)) {
      throw new ApiError(403, "Unauthorized");
    }
  
    const achievement = await Achievement.findById(achievementId);
  
    if (!achievement) {
      throw new ApiError(404, "Achievement not found");
    }
  
    if (
      !requester.committee ||
      requester.committee._id.toString() !==
        achievement.committee.toString()
    ) {
      throw new ApiError(403, "Unauthorized");
    }
  
    achievement.title = title;
    achievement.description = description;
    achievement.contestDate = contestDate;
    achievement.winners = winners;
    achievement.year = year;
    achievement.department = department;
  
    await achievement.save();
  
    return res.status(200).json(
      new ApiResponse(200, achievement, "Updated successfully")
    );
  });

  
export {
    addAchievement,
    getAchievement,
    getSingleAchievement,
    updateAchievement,
    deleteAchievement
  };