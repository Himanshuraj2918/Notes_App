import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from "../../assets/images/note-1.png"


const Home = () => {

  const [openAddEditModel, setOpenEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

const [userInfo, setUserInfo] = useState(null)
const [allNotes,setAllNotes] = useState([])

const [isSearch, setIsSearch] = useState(false)
const navigate = useNavigate()

//get user info after login or signup
const getUserInfo = async()=>{
  try {
    const response = await axiosInstance.get("/users/get-user",{
      withCredentials:true
    });
    if(response.data);{
      setUserInfo(response.data)
    }
  } catch (error) {
    navigate("/")
  }
};

const handleEdit = (noteDetails) =>{
  setOpenEditModel({
    isShown: true,
    type: "edit",
    data: noteDetails,
  })
}

const getAllNotes = async()=>{
     try {
      const response = await axiosInstance.get("/notes/get-all-note",{
        withCredentials:true
      })
 
      if(response.data){       
       setAllNotes(response.data.data) 
      }
     } catch (error) {
        setAllNotes([])
        console.log(error+" : error in fetching notes");
        
        
     }
}

const handeleDelete = async(item)=>{
  try {
    const response = await axiosInstance.delete("/notes/delete-note/"+item._id)

    if(response.data){
     getAllNotes()
    }
   } catch (error) {
      console.log("unexpected error on fetching notes");
      
   }
}

const handlePinNote = async(item)=>{
  try {
    const response = await axiosInstance.patch("/notes/pinned-note/"+item._id,{
      isPinned:!item.isPinned
    })

    if(response.data){
     getAllNotes()
    }
   } catch (error) {
      console.log("unexpected error on fetching notes");
      
   }
}

const searchNote = async(query)=>{
  
  try {
    const response = await axiosInstance.post(`/notes/search-note?query=${query}`)
    // console.log(`Hello: ${query}`);
    
    // console.log(response.data);
    // console.log(response.data.data);
    if(response.data && response.data.data){
     setIsSearch(true)
     setAllNotes(response.data.data)
    }
   } catch (error) {

      console.log(error+" : error in search and fetching notes");
      
      
   }
}

useEffect(()=>{
  getAllNotes()
  getUserInfo();
  
return()=>{}
},[])


  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={searchNote} getAllNotes={getAllNotes} />
      <div className='container mx-auto pb-10'>
        {allNotes.length>0 ? <div className='grid grid-cols-3 gap-4 mt-8'>

          {allNotes.map((item)=>(
            <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdAt.split('T')[0]}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => {handleEdit(item)}}
            onDelete={()=>handeleDelete(item)}
            onPinNote={() => handlePinNote(item)}
          />
          ))
        }
        </div>:
        <EmptyCard imgSrc={AddNotesImg}  message="Start creating your first note! Click the 'Add' button to join. Let's get started! " />
        }
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10'
        onClick={() => {
          setOpenEditModel({
            isShown: true, type: "add", data: null
          })
        }}
      >
        <MdAdd className="text-[32px] text-white " />
      </button>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequsetClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md outline-none mx-auto mt-6 mb-4 p-5 overflow-auto"
      >

        <AddEditNotes
        type={openAddEditModel.type}
        noteData={openAddEditModel.data}
        getAllNotes={getAllNotes}
          onClose={
            () => {
              setOpenEditModel({
                isShown: false,
                type: "add",
                data: null
              })
            }
          }
        />
      </Modal>
    </>
  )
}

export default Home
