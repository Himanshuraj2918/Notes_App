import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Notes } from "../models/notes.models.js";

const addNote = asyncHandler(async(req,res)=>{
    // console.log(req);
    
    const {title,content,tags} = req.body;
    const {user} = req

    if(
        [title,content].some((field)=>field.trim()=="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const notes = await Notes.create({
        title,
        content,
        tags:tags || [],
        userId:user?._id
    })
    
    if(!notes) throw new ApiError(500,"Something went wrong")

    return res
    .status(200)
    .json(
        new ApiResponse(200,notes,"Notes added")
    )
})

const editNote = asyncHandler(async(req,res)=>{
        const noteId = req.params;
        const {title,content,tags,isPinned} = req.body;
        
        if(!title && !content && !tags ) throw new ApiError(400,"No changes provided")

        const note = await Notes.findByIdAndUpdate(
            noteId,
            {
                $set:{
                    title,
                    content,
                    tags,
                    isPinned
                }
            },
            {
                new:true
            }
        )

        if(!note) throw new ApiError(400,"Note not found")

        return res
        .status(200)
        .json(
            new ApiResponse(200,note,"Note updated")
        )
})

const deleteNote = asyncHandler(async(req,res)=>{
    const notesId = req.params;

    const note = await Notes.findByIdAndDelete(notesId)

    if(!note) throw new ApiError(400,"Note not found")

    return res
    .status(200)
    .json(
        new ApiResponse(200,note,"Note deleted")
    )
})

const allNotes = asyncHandler(async(req,res)=>{
    const {user} = req

    const note = await Notes.find({
        userId:user?._id
    }).sort({isPinned:-1})

    if(!(note.length>0)) throw new ApiError(400,"Note not found")

    return res
    .status(200)
    .json(
        new ApiResponse(200,note,"Note reterived successfully")
    )
})

const pinnedNote = asyncHandler(async(req,res)=>{
    const {noteId} = req.params;

    const {isPinned} = req.body

    if(typeof isPinned === 'undefined') throw new ApiError(400,"No choice")

    const note = await Notes.findByIdAndUpdate(
        noteId,
        {
            $set:{
                isPinned,
            }
        },
        {
            new:true
        }
    )

    // console.log(note);
    
    if(!note) throw new ApiError(400,"Notes not found")

    return res
    .status(200)
    .json(
        new ApiResponse(200, isPinned ? "Note pinned" : "Note unpinned")
    )
})

export 
{
    addNote,
    editNote,
    deleteNote,
    allNotes,
    pinnedNote
}