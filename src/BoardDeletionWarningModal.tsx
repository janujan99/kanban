import React, { useState } from "react";
interface BoardDeletionWarningModalProps {
  deleteBoard: () => void;
}
export default function BoardDeletionWarningModal(
  props: BoardDeletionWarningModalProps
) {
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="deleteBoardModal" className="modal-toggle" />
      <label htmlFor="deleteBoardModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Delete this board?</h3>
          <p className="py-4">
            Are you sure you want to delete the board? This action will remove
            all columns and tasks and cannot be reversed.
          </p>
          <div>
            <label
              htmlFor="deleteBoardModal"
              onClick={() => props.deleteBoard()}
            >
              Delete
            </label>
            <label htmlFor="deleteBoardModal">Cancel</label>
          </div>
        </label>
      </label>
    </>
  );
}
