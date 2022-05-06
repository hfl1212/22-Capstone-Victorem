import { useEffect, useState } from "react";
import {useHistory} from "react-router";
import EditableUserProfile from "./EditableUserProfile";
import UserProfile from "./UserProfile";
import wuyanzu from "../photos/wuyanzu.png";
import React from "react";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
import Copyright from "./Copyright";

function Profile() {
  const history = useHistory()
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const url = window.location.href
    let endpoint = url.substring(url.indexOf('/profile'))
    try {
      fetch(endpoint)
         .then((response) => response.json())
         .then(function (data) {
            if(data.status === 'success') {
              setUserInfo(data.userInfo)
              if(data.userInfo.isFirstTime) {
                setProfileEditMode(true)
              }
              setLoading(false)
            } else{
              console.log("Backend got the fetch, but error occured: ", data.error)
              alert("Error: " + data.error)
              history.goBack()
            }
         });
   } catch (error) {
     console.log(error)
   }
  }, [])

  function handleEditComplete(result) {
    if (result != null) {
      setUserInfo(result)
    }
    setProfileEditMode(false);
  }

  return (
    <div className="SideProfile">
      <div className="App">
        {loading ? (<><h1>Loading</h1></>) : (<>
        {profileEditMode ? (
          <>
            <h1 className="profileheader">My Profile</h1>
            <EditableUserProfile
              stored={userInfo}
              editCompleteCallback={handleEditComplete}
            />
          </>
        ) : (
          <>
            <UserProfile
              stored={userInfo}
              startEditCallback={() => setProfileEditMode(true)}
            />
          </>
        )}</>)}
        
      </div>
      <Copyright />
    </div>
  );
}

export default Profile;
