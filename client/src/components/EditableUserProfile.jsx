import { useState, useEffect } from "react";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
// import pet1 from "../photos/pet1.jpg";
// import pet2 from "../photos/pet2.jpg";
// import pet3 from "../photos/pet3.jpg";
// import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";
import wuyanzu from "../photos/wuyanzu.png";
import React from "react";

export default function EditableUserProfile({ stored, editCompleteCallback }) {
  let data = JSON.parse(JSON.stringify(stored))
  if(!data.pets[0].img) {
    data.pets[0].img = []
  }
  const[profileInput, setProfileInput] = useState(data)
  // console.log(profileInput.pets[0])

  function handleCancelClicked() {
    editCompleteCallback(null);
  }

  async function handleSaveClicked() {
    let readyForFetch = true
    let username = document.getElementById("username").value
    let petName = document.getElementById("pet-name").value
    let petType = document.getElementById("pet-type").value
    let petPhoto = document.getElementById("pet-photo").value
    let petInfoFilled = false
    let petInfoInput = document.querySelectorAll(".pet-info-input")
    petInfoInput.forEach((oneInput) => {
      if(oneInput.value.length > 0){
        petInfoFilled = true
      }
    })
    if(username === '') {
      document.getElementById("username-span").innerHTML = "Username cannot be empty!"
      readyForFetch = false
    }
    if(petInfoFilled && petName === '') {
      document.getElementById("pet-name-span").innerHTML = "Pet name cannot be empty if you wish to add a pet"
      readyForFetch = false
    }
    if(petInfoFilled && petType === '') {
      document.getElementById("pet-type-span").innerHTML = "Pet type cannot be empty if you wish to add a pet"
      readyForFetch = false
    }
    if(petInfoFilled && petPhoto === '') {
      document.getElementById("pet-photo-span").innerHTML = "Please upload at least one photo if you wish to add a pet"
      readyForFetch = false
    }
    if(readyForFetch) {
      let postProfileResponse = await fetch(`/profile`,
        {method: "POST", body: JSON.stringify(profileInput), headers: {'Content-Type': 'application/json'}}
      )
      let statusInfo = await postProfileResponse.json();
      if(statusInfo.status === "success"){
        window.localStorage.setItem('username', username)
        alert("profile saved successfully")
        editCompleteCallback(profileInput);
      } else{
        alert("Error: " + statusInfo.error)
      }
    } else {
      document.getElementById("error-message").innerHTML = "Please fix the error above"
    }
  }

  // function uploadPhoto(e) {
  //   console.log("e===========", e.target.file);

  //   var file = e.target.files[0];
  //   let r = new FileReader(); 
  //   r.onload = function () {
  //     console.log(r.result); 
  //     profileInput.headimg = r.result;
  //   };
  //   r.readAsDataURL(file);
  // }

  function uploadPet(e, index) {
    console.log("e===========", e.target.file);

    var file = e.target.files[0];
    let r = new FileReader(); 
    r.onload = function () {
      console.log(r.result); 
      profileInput["pet" + index] = r.result;
    };
    r.readAsDataURL(file);
  }

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Name: *</div>
        <span id='username-span'></span>
        <input
          type="text"
          id="username"
          value={profileInput.username}
          onChange={(e) => {
            profileInput.username = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Profile Photo</div>
        <input
          type="text"
          value={profileInput.profilePhoto}
          onChange={(e) => {
            profileInput.profilePhoto = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
        <img
          alt="profile Photo"
          style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
          src={profileInput.profilePhoto || wuyanzu}
        ></img>
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          Phone number
        </div>
        <input
          type="text"
          value={profileInput.contact.phone}
          onChange={(e) => {
            profileInput.contact.phone = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          <img
            alt=""
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 50 }}
            src={facebook}
          ></img>
          Facebook
        </div>
        <input
          type="text"
           value={profileInput.contact.facebook}
          onChange={(e) => {
            profileInput.contact.facebook = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">
          <img
            alt=""
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 50 }}
            src={instagram}
          ></img>
          Instagram
        </div>
        <input
          type="text"
           value={profileInput.contact.instagram}
          onChange={(e) => {
            profileInput.contact.instagram = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "#000",
          textAlign: "left",
          margin: 10,
        }}
      >
        Pet Info
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Name:</div>
        <span id="pet-name-span"></span>
        <input
          id="pet-name"
          className="pet-info-input"
          type="text"
          value={profileInput.pets[0].name}
          onChange={(e) => {
            profileInput.pets[0].name = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Type:</div>
        <span id="pet-type-span"></span>
        <input
          id="pet-type"
          className="pet-info-input"
          type="text"
          value={profileInput.pets[0].type}
          onChange={(e) => {
            profileInput.pets[0].type = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Breed:</div>
        <input
          className="pet-info-input"
          type="text"
          value={profileInput.pets[0].breed}
          onChange={(e) => {
            profileInput.pets[0].breed = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Size:</div>
        <input
          className="pet-info-input"
          type="int"
          value={profileInput.pets[0].size}
          onChange={(e) => {
            profileInput.pets[0].size = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Gender:</div>
        <input
          className="pet-info-input"
          type="text"
          value={profileInput.pets[0].gender}
          onChange={(e) => {
            profileInput.pets[0].gender = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Age:</div>
        <input
          className="pet-info-input"
          type="text"
          value={profileInput.pets[0].age}
          onChange={(e) => {
            profileInput.pets[0].age = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Description:</div>
        <textarea
          className="form-input"
          type="text"
          value={profileInput.pets[0].bio}
          onChange={(e) => {
            profileInput.pets[0].bio = e.target.value;
            setProfileInput({ ...profileInput })
          }}
        />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Photo 1 (This photo will appear in your post)</div>
        <span id="pet-photo-span"></span>
        <input
          id="pet-photo"
          className="form-input"
          type="text"
          value={profileInput.pets[0].img[0]} 
          onChange={(e) => {
            profileInput.pets[0].img[0] = e.target.value;
            setProfileInput({ ...profileInput })
          }}
          />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Photo 2</div>
        <input 
          className="form-input"
          type="text"
          value={profileInput.pets[0].img[1]}
          onChange={(e) => {
            profileInput.pets[0].img[1] = e.target.value;
            setProfileInput({ ...profileInput })
          }}
          />
      </div>

      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Photo 3</div>
        <input 
          className="form-input"
          type="text"
          value={profileInput.pets[0].img[2]}
          onChange={(e) => {
            profileInput.pets[0].img[2] = e.target.value;
            setProfileInput({ ...profileInput })
          }}
          />
      </div>
      
      <div className="profile-edit-row">
        <div className="profile-edit-row-name">Pet Photo 4</div>
        <input 
          className="form-input"
          type="text"
          value={profileInput.pets[0].img[3]}
          onChange={(e) => {
            profileInput.pets[0].img[3] = e.target.value;
            setProfileInput({ ...profileInput })
          }}
          />
          {/* {profileInput.pet1 ? (
          <img
            alt=""
            style={{ width: 100, height: 100, margin: 10, borderRadius: 50 }}
            src={profileInput.pet1}
          ></img>
        ) : (
          ""
        )} */}
      </div>
      
      <span id="error-message"></span>
      <div>
        <button className="profile-edit-button" onClick={handleSaveClicked}>
          Save
        </button>
        <button className="profile-edit-button" onClick={handleCancelClicked}>
          Cancel
        </button>
      </div>
    </div>
  );
}
