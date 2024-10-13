import React,{useState} from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'


const AddEditNotes = ({noteData, type,onClose,getAllNotes}) => {


    const [title,setTitle]= useState(noteData?.title||"")
    const [content,setContent] = useState(noteData?.content||"")
    const [tags,setTags]= useState(noteData?.tags||[])

    const[error,setError] = useState(null)

  //Add NoteCard
  const addNewNote =async ()=>{
    try {
        const response = await axiosInstance.post("/notes/add-note",{
            title,
            content,
            tags
        })

        if(response.data){
            getAllNotes()
            onClose()
        }
    } catch (error) {
        setError(error)
    }
  }

  //Edit note
  const editNote =async ()=>{

    const  noteId = noteData?._id
    try {
        const response = await axiosInstance.patch("/notes/edit-note/"+noteId,{
            title,
            content,
            tags
        })

        if(response.data){
            getAllNotes()
            onClose()
        }
    } catch (error) {
        setError(error)
    }
  }


    const handleAddNote = ()=>{
        if(!title){
            setError("Please enter the title");
            return
        }
        if(!content){
            setError("Please enter the content");
            return
        }
        setError("")

        if(type==='edit'){
            editNote()
        }
        else{
            addNewNote()
        }
    }

    return (
        <div className='relative '>

           <button
            className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-300 '
            onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400'/>
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input type="text"
                    className='text-2xl text-slate-900 outline-none'
                    placeholder='Title here'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea type="text"
                    className='text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded '
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                >
                </textarea>
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <div className="mt-3 ">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />

            </div>

            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
            {type === "edit"?"UPDATE":"ADD"}
            </button>
        </div>
    )
}

export default AddEditNotes
