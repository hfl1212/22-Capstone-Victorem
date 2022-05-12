import React from "react";
import PostCard from "./PostCard";
import ReportModal from "./ReportModal";
import defaultUser from "../photos/default-user.jpg";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import report from "../photos/report.png"
import CreatePostModal from "./CreatePostModal";
import { useState } from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function UserProfile({ stored, startEditCallback }) {
  const url = window.location.href
  // console.log(stored.profilePhoto);
  const [post, setPost] = useState(stored.posts[0])

  let loggedInUser = window.localStorage.getItem("userID")
  let renderedUser
  if(url.endsWith('/profile')) {
    renderedUser = loggedInUser
  } else {
    renderedUser = url.substring(url.indexOf('user=') + 5)
  }
  let isOwnProfile = loggedInUser === renderedUser;

  let pet = {};
  let hasPet = false;
  if (stored.pets[0].name) {
    pet = stored.pets[0];
    hasPet = true;
  }

  function handleReport() { 
    const reportModal = document.getElementById("reportModal");
    reportModal.style.display = "block";
    setTimeout(() => {
      reportModal.classList.add("show");
    }, 25);
  }

  function handlePostChange() {
    setPost(null)
  }

  return (
    <div>
      <div>
        <div className="profile-container">
          <div className="profile-wrapper">
            <img
              className="profile-pic"
              alt={"headshot"}
              src={stored.profilePhoto || defaultUser}
            ></img>

            {hasPet ? (
              <>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Type:</span>
                  <span className="profile-row-value"> {pet.type}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Name:</span>
                  <span className="profile-row-value"> {pet.name}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Breed:</span>
                  <span className="profile-row-value"> {pet.breed}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Size:</span>
                  <span className="profile-row-value"> {pet.size}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Gender:</span>
                  <span className="profile-row-value"> {pet.gender}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Age:</span>
                  <span className="profile-row-value"> {pet.age}</span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-name">Pet Description:</span>
                  <span className="profile-row-value"> {pet.bio}</span>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="profile-con">
            <div className="profile-con-top">
              <div>
                <div className="profile-name">{stored.username}</div>
              </div>
            </div>

            <div className="profile-name-c">Contact:</div>
            <div className="profile-icons">
              {stored.contact.instagram == "" || null ? (
                <></>
              ) : (
                <>
                  <a
                    href={"https://www.instagram.com/" + stored.contact.instagram}
                    target="new"
                  >
                    <img
                      className="profile-icon"
                      alt={"instagram"}
                      src={instagram}
                    ></img>
                  </a>
                </>
              )}
              {stored.contact.facebook == "" || null ? (
                <></>
              ) : (
                <>
                  <a
                    href={"https://www.facebook.com/" + stored.contact.facebook}
                    target="new"
                  >
                    <img
                      className="profile-icon"
                      alt={"facebook"}
                      src={facebook}
                    ></img>
                  </a>
                </>
              )}
            </div>
            {stored.contact.phone == "" || null ? (
              <></>
            ) : (
              <>
                <div className="profile-icons">
                  <a href={"tel:+" + stored.contact.phone}>
                    {stored.contact.phone}
                  </a>
                </div>
              </>
            )}

            {hasPet ? (
              <>
                <div className="pet-photos">
                  <div className="swiper-container">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={50}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{ autoplay: true, delay: 2000 }}
                    >
                      <SwiperSlide>
                        <div className="mask">
                          <img
                            className="content"
                            src={pet.img[0] ? pet.img[0] : <></>}
                            alt={"pet photo 1"}
                            style={{ width: "100%" }}
                          />
                          <div className="mask-content">
                            <div className="pet-name">{pet.name}</div>
                            <div className="pet-breed">{pet.breed}</div>
                            <div className="pet-size">{pet.size}</div>
                          </div>
                        </div>
                        <div className="photo-desc">{pet.bio}</div>
                      </SwiperSlide>
                      {pet.img[1] ? <> <SwiperSlide>
                        <div className="mask">
                          <img
                            className="content"
                            src={pet.img[1]}
                            alt={"pet photo 2"}
                            style={{ width: "100%" }}
                          />
                          <div className="mask-content">
                            <div className="pet-name">{pet.name}</div>
                            <div className="pet-breed">{pet.breed}</div>
                            <div className="pet-size">{pet.size}</div>
                          </div>
                        </div>
                        <div className="photo-desc">{pet.bio}</div>
                      </SwiperSlide>
                      </> : <></>}
                      
                      {pet.img[2] ? <> <SwiperSlide>
                        <div className="mask">
                          <img
                            className="content"
                            src={pet.img[2]}
                            alt={"pet photo3"}
                            style={{ width: "100%" }}
                          />
                          <div className="mask-content">
                            <div className="pet-name">{pet.name}</div>
                            <div className="pet-breed">{pet.breed}</div>
                            <div className="pet-size">{pet.size}</div>
                          </div>
                        </div>
                        <div className="photo-desc">{pet.bio}</div>
                      </SwiperSlide>
                      </> : <></>}
                      {pet.img[3] ? <><SwiperSlide>
                        <div className="mask">
                          <img
                            className="content"
                            src={pet.img[3]}
                            alt={"pet photo 4"}
                            style={{ width: "100%" }}
                          />
                          <div className="mask-content">
                            <div className="pet-name">{pet.name}</div>
                            <div className="pet-breed">{pet.breed}</div>
                            <div className="pet-size">{pet.size}</div>
                          </div>
                        </div>
                        <div className="photo-desc">{pet.bio}</div>
                      </SwiperSlide>
                      </> : <></>}
                    </Swiper>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {isOwnProfile ? (
          <>
            <div className="edit-btn-container">
              <div className="edit-button" onClick={startEditCallback}>
                Edit
              </div>
            </div>
          </>
        ) : (<>
          <img
            id="report-button"
            onClick={handleReport}
            role="button"
            alt="Report this user"
            src={report}
          />
          <ReportModal />
        </>)}

        <div className="profile-con">
          {post ? (
            <>
              <div className="profile-name-post">On-going Requests:</div>
              <div className="profile-post">
                <PostCard
                  postID={post._id}
                  userID={post.userID}
                  pet_name={pet.name}
                  pet_type={pet.type}
                  start_date={post.start_date}
                  end_date={post.end_date}
                  description={post.description}
                  img={pet.img[0]}
                  renderEdit={isOwnProfile}
                  handlePostChange={handlePostChange}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {isOwnProfile ? (<></>) : (<>
          
        </>)}
      </div>
      
      <CreatePostModal />
    </div>
  );
}
