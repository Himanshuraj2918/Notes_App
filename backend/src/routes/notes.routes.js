import {Router} from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { addNote, editNote, deleteNote ,allNotes, pinnedNote,searchNote} from "../controllers/notes.controllers.js";

const router = Router();

router.route("/add-note").post(verifyJwt,addNote)
router.route("/edit-note/:noteId").patch(verifyJwt,editNote)
router.route("/delete-note/:noteId").delete(verifyJwt,deleteNote)
router.route("/pinned-note/:noteId").patch(verifyJwt,pinnedNote)
router.route("/get-all-note").get(verifyJwt,allNotes)
router.route("/search-note").post(verifyJwt,searchNote)

export default router