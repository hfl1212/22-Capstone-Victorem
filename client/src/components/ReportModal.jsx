import React from "react";
import closeIcon from "../photos/icons8-close-16.png";

const ReportModal = () => {

    function closeModal() {
        const reportModal = document.getElementById("reportModal");
        reportModal.classList.remove("show");
        setTimeout(() => {
            reportModal.style.display = "";
        }, 250);
    }

    function fileReport() {
        alert("Report submitted! Thank you for helping us maintain the community!")
        document.getElementById("description").textContent = ''
        closeModal()
    }

    return (
        <section className="modal fade" id="reportModal">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <img
                    role="button"
                    alt="Close"
                    src={closeIcon}
                    onClick={closeModal}
                />
                <h1 className="modal-title mx-auto">Report this user</h1>
                
                </div>
                <span></span>
                <div className="modal-body">
                <div className="form__input-group"> 
                    <label htmlFor="pets">Please select an issue:  </label>
                    <select name="problems">
                        <option value="spam">Spam or harmful information</option>
                        <option value="harrasement">Harrasement or bullying</option>
                        <option value="pet injury">Caused pet injury</option>
                        <option value="other">Other(Please specify below)</option>
                    </select>
                </div>
                {/* <div className="form__input-group">
                    <label htmlFor="startDate">Start date</label>
                    <input type="date" className="form__input" id="start_date" min={today}></input>
                    <div className="form__input-error-message"></div>
                </div>
                <div className="form__input-group">
                    <label htmlFor="endDate">End date</label>
                    <input type="date" className="form__input" id="end_date" min={today}></input>
                    <div className="form__input-error-message"></div>
                </div> */}
                <div className="form__input-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form__input" id="description"></textarea>
                    <div className="form__input-error-message"></div>
                </div>
                <div id="postID"></div>
                <button
                    onClick={fileReport}
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
}

export default ReportModal