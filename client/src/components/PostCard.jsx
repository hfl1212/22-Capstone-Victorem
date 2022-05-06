import React from "react";
import { useHistory } from "react-router";
import deleteIcon from "../photos/icons8-delete-24.png";
import editIcon from "../photos/icons8-edit-16.png";

const PostCard = (props) => {
  const history = useHistory();
  let renderEdit = (props.userID === window.localStorage.getItem("userID"))
  let cleanStart = new Date(props.start_date).toISOString().split('T')[0]
  let cleanEnd = new Date(props.end_date).toISOString().split('T')[0]

  function toUserProfile() {
    let endpoint = "/profile";
    if (props.userID) {
      endpoint += "?user=" + props.userID;
    }
    history.push(endpoint);
  }

  async function editPost() {
    let petsJson
      try {
        let response = await fetch('/posts/pets')
        petsJson = await response.json()
      } catch (error) {
        petsJson = {status: "error", error: error}
      }
      if(petsJson.status === "success"){
        // I have no idea why but these next lines have to exist together to make it work
        const createPostModal = document.getElementById("createPostModal");
        setTimeout(() => {
          createPostModal.classList.add("show");
        }, 25);
        createPostModal.style.display = "block";
        // ends here

        let petsOptions = petsJson.pets.map(pet => {
          return `<option value="${pet.name}">${pet.name}</option>`
        });
        document.getElementById("pets_dropdown").innerHTML = petsOptions
        document.getElementById("start_date").valueAsDate = new Date(props.start_date)
        document.getElementById("end_date").valueAsDate = new Date(props.end_date)
        document.getElementById("description").value = props.description
        document.getElementById("postID").value = props.postID
      } else {
        if(petsJson.error === "not logged in") {
          alert('You must log in to create a post!')
          // prompt log in
        } else {
          alert("Error: " + petsJson.error)
        }
      }
  }

  async function deletePost() {
    try {
      let response = await fetch(`/posts`, {
        method: "DELETE",
        body: JSON.stringify({ postID: props.postID }),
        headers: { "Content-Type": "application/json" },
      });
      let responesJSON = await response.json();
      if (responesJSON.status == "error") {
        alert("Error: " + responesJSON.error);
      } else {
        alert("Successfully deleted your post!");
        window.location.reload(false); // possibly need to create a state for reload.
      }
    } catch (error) {
      console.log("error:" + error);
    }
  }

  return (
    <div className="post-card" key={props.pet_name} >
      <div onClick={toUserProfile}>
        <img className="post-card-image" alt={props.pet_name} src={props.img}/>
        <div className="post-card-title">
          {props.pet_name} | {props.pet_type}
        </div>
        <div className="post-card-subtitle">
          {cleanStart} - {cleanEnd}
        </div>
        <div className="post-card-description">
          Description: {props.description}
        </div>
      </div>

      <div className="post-card-action-icon-bar">
        {renderEdit ? (
          <>
            <img
              className="post-card-action-icon"
              role="button"
              alt="Edit"
              src={editIcon}
              onClick={editPost}
            />
            <img
              className="post-card-action-icon"
              role="button"
              alt="Delete"
              src={deleteIcon}
              onClick={deletePost}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      
    </div>
  );
};
export default PostCard;
