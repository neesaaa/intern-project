import { X, Trash2 } from "lucide-react"
import deletIcon from '../../assets/instructors/2eb4f6d72225b1e52c125ff2e8809c456da4e79e.png'
import {createPortal } from 'react-dom'

export function DeleteModal({ isOpen, onClose, onConfirm, employeeName }) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed w-full inset-0 z-2 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg    bg-white p-6 shadow-lg flex flex-col gap-6">
        <button onClick={onClose} className="self-end text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>

        <div className="flex justify-center">
          <div className="flex p-3 items-center justify-center rounded-full bg-red-100">
            <div className="flex items-center justify-center p-4 bg-red-200 rounded-full ">
              <img src={deletIcon} className="h-12 w-12 "/>
            </div>
          </div>
        </div>

        <p className="font-medium text-[18px] leading-[20px] tracking-[0] text-gray-500">
          Are you sure you want to delete this{" "}
          <span className="font-semibold text-gray-900">Instructor {employeeName}</span> ?
        </p>

        <div className="flex gap-4 w-full">
          <button
            className="flex-1 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="flex-2 bg-red-400 text-white hover:bg-red-500 cursor-pointer px-6 py-2 rounded-lg " onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  ,document.body )
}
