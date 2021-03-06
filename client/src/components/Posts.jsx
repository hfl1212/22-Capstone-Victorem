import React, { useState } from "react";
import Footer from "./Footer";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import plusIcon from "../photos/icons8-plus-64.png";
import { useEffect } from "react";

const MAX_ITEMS_PER_PAGE = 4;

const Posts = () => {
  const [page, setPage] = useState(1);
  const [postCardData, setPostCardData] = useState({});
  const [postChange, setPostChange] = useState(false)

  useEffect(() => {
    fetch(`/posts`)
      .then((response) => response.json())
      .then(function (data) {
        setPostCardData(data);
        // console.log(data)
      });
  }, [page, postChange])

  function handleNewPost() {
    setPostChange(!postChange)
    setPage(1)
  }

  const postCardElements = [];
  const start = postCardData.length - (page - 1) * MAX_ITEMS_PER_PAGE - 1
  const diff = Math.min(MAX_ITEMS_PER_PAGE, postCardData.length - (page - 1) * MAX_ITEMS_PER_PAGE);

  for (let i = start; i > start - diff; i--) {
    postCardElements.push(
      <PostCard
        postID={postCardData[i].postID}
        userID={postCardData[i].userID}
        pet_name={postCardData[i].pet.name}
        pet_type={postCardData[i].pet.type}
        start_date={postCardData[i].start_date}
        end_date={postCardData[i].end_date}
        description={postCardData[i].description}
        img={postCardData[i].pet.img[0]}
        handleNewPost={handleNewPost}
      />
    );
  }

  async function createPost() {
    let petsJson;
    try {
      let response = await fetch("/posts/pets");
      petsJson = await response.json();
    } catch (error) {
      petsJson = { status: "error", error: error };
    }
    if (petsJson.status === "success") {
      // I have no idea why but these next lines have to exist together to make it work
      setTimeout(() => {
        createPostModal.classList.add("show");
      }, 25);
      const createPostModal = document.getElementById("createPostModal");
      createPostModal.style.display = "block";
      // ends here

      let petsOptions = petsJson.pets.map((pet) => {
        return `<option value="${pet.name}">${pet.name}</option>`;
      });
      document.getElementById("pets_dropdown").innerHTML = petsOptions;
    } else {
      if (petsJson.error === "not logged in") {
        alert("You must log in to create a post!");
        // prompt log in
      } else {
        console.log(petsJson);
        alert("Error: " + petsJson.error);
      }
    }
  }

  return (
    <div id="post-page">
      <main id="posts">
        <h1 className="post-title">Sitting Requests</h1>
        <div className="post-card-container">{postCardElements}</div>
        {/* <Copyright /> */}
        <img
          onClick={createPost}
          className="icon"
          role="button"
          alt="Add a Post"
          src={plusIcon}
        />
        <CreatePostModal handleNewPost={handleNewPost}/>
        
      </main>
      <nav className="page-nav" aria-label="Page navigation">
            <div>
              <ul className="pagination">
                <li className="page-item">
                  <span className="page-link" onClick={() => setPage(page - 1)}>
                    Previous
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link" onClick={() => setPage(1)}>
                    1
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link" onClick={() => setPage(2)}>
                    2
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link" onClick={() => setPage(3)}>
                    3
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link" onClick={() => setPage(page + 1)}>
                    Next
                  </span>
                </li>
              </ul>
            </div>
          </nav>
      <Footer />
    </div>
  );
};

export default Posts;
