import React from "react";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";

import wuyanzu from "../photos/wuyanzu.png";
import facebook from "../photos/facebook2.png";
import instagram from "../photos/instagram.png";
import plusIcon from "../photos/icons8-plus-64.png";

import pet1 from "../photos/pet1.jpg";
import pet2 from "../photos/pet2.jpg";
import pet3 from "../photos/pet3.jpg";
import pet4 from "../photos/pet4.jpg";
import add from "../photos/add.png";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function UserProfile({ stored, startEditCallback }) {
  const url = window.location.href
  // console.log(stored.profilePhoto);
  let post = stored.posts[0]

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

  return (
    <div>
      <div className="profile-container">
        <div className="profile-wrapper">
          <img
            className="profile-pic"
            alt={"headshot"}
            src={stored.profilePhoto || wuyanzu}
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
                          src={pet.img[0] ? pet.img[0] : pet1}
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
      ) : (
        <></>
      )}

      <div className="profile-con">
        {post ? (
          <>
            <div className="profile-name-post">On-going post:</div>
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
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <CreatePostModal />
    </div>
  );
}
