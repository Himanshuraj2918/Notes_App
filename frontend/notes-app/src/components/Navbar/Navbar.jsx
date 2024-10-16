import React,{useState} from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axiosInstance from '../../utils/axiosInstance'


const Navbar = ({userInfo,onSearchNote,getAllNotes}) => {
  const[searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = async () => {
    const response = await axiosInstance.get('/users/logout-user')
    if(response){navigate("/");}
    
  };

  const handleSearch = async()=>{
   if(searchQuery){
    onSearchNote(searchQuery)
   }
  } 
  const onClearSearch = ()=>{
    setSearchQuery("")
    getAllNotes()
  } 

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow ">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
