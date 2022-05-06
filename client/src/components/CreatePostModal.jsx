import React from "react";
import closeIcon from "../photos/icons8-close-16.png";

const CreatePostModal = (props) => {

    function closeCreatePostModal() {
        const createPostModal = document.getElementById("createPostModal");
        createPostModal.classList.remove("show");
        setTimeout(() => {
            createPostModal.style.display = "";
        }, 250);
    } 

    async function storePosts() {
        try {
          // document.getElementById("postStatus").innerHTML = "sending data..."
          let pet_name = document.getElementById("pets_dropdown").value;
          let start_date = document.getElementById("start_date").value;
          let end_date = document.getElementById("end_date").value;
          let description = document.getElementById("description").value;
          let postID = document.getElementById("postID").value
          // store the image
          
          console.log(props)
          if(pet_name === "add") {
            document.getElementById("create_post_message").textContent = "Please add a pet in your profile!"
          } else if(end_date < start_date || start_date == '' || end_date == '') {
            document.getElementById("create_post_message").textContent = "Please enter valid dates."
          } else {
            const myData = {
                pet_name: pet_name,
                description: description,
                start_date: start_date,
                end_date: end_date,
                postID: postID
            };
            let postPetResponse = await fetch(`/posts`, {
              method: "POST",
              body: JSON.stringify(myData),
              headers: { "Content-Type": "application/json" },
            });
            let status = await postPetResponse.json();
            if (status.status === "error") {
              alert("Error: " +  status.error);
            } else {
              document.getElementById("description").innerHTML = "";
              document.getElementById("start_date").innerHTML = "";
              document.getElementById("end_date").innerHTML = "";
              alert("Successfully uploaded!");
              closeCreatePostModal();
              window.location.reload(false)
            }
            closeCreatePostModal();
          }
        } catch (error) {
          console.log("There was an error: " + error);
        }
    }
    
    let today = new Date().toISOString().split('T')[0]

    return (
        <section className="modal fade" id="createPostModal">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <img
                    role="button"
                    alt="Close"
                    src={closeIcon}
                    onClick={closeCreatePostModal}
                />
                <h1 className="modal-title mx-auto">Create a post</h1>
                
                </div>
                <span id="create_post_message"></span>
                <div className="modal-body">
                <div className="form__input-group"> 
                    <label htmlFor="pets">Choose a pet:  </label>
                    <select name="pets" id="pets_dropdown">
                        <option value="add">Add a pet in your profile -&gt;</option>
                    </select>
                    <a href="/profile">Add a pet</a>
                </div>
                <div className="form__input-group">
                    <label htmlFor="startDate">Start date</label>
                    <input type="date" className="form__input" id="start_date" min={today}></input>
                    <div className="form__input-error-message"></div>
                </div>
                <div className="form__input-group">
                    <label htmlFor="endDate">End date</label>
                    <input type="date" className="form__input" id="end_date" min={today}></input>
                    <div className="form__input-error-message"></div>
                </div>
                {/* <div className="form__input-group">
                    <label htmlFor="petPhoto">Pet Photo</label>
                    <input type="file" className="form__input" id="petPhoto"></input>
                    <div className="form__input-error-message"></div>
                </div> */}
                {/* <div className="form__input-group">
                    <label htmlFor="img_link">Image Link</label>
                    <input type="text" className="form__input" id="img_link"></input>
                    <div className="form__input-error-message"></div>
                </div> */}
                <div className="form__input-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form__input" id="description"></textarea>
                    <div className="form__input-error-message"></div>
                </div>
                <div id="postID"></div>
                <button
                    onClick={storePosts}
                    className="form__button"
                    type="submit"
                 >
                    Submit
                </button>
                </div>
            </div>
            </div>
        </section>
  );
};

export default CreatePostModal;