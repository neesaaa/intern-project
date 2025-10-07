import { Eye, Pencil, Trash2, Star } from "lucide-react";
import StarReadOnly from "./StarReadOnly.jsx";
import { DeleteModal } from "./DeleteModal.jsx";
import { useState } from "react";

export default function TableRow({
  name,
  jobTitle,
  rate,
  onView,
  onEdit,
  onDelete,
}) {
  const [open, setopen] = useState(false);

  return (
    <>
      <tr className=" transition-colors py-1 shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] ">
        <td className="px-6 py-4 text-sm text-foreground">{name}</td>
        <td className="px-6 py-4 text-sm text-foreground">{jobTitle}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-0.5">
            <StarReadOnly rating={rate} />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 cursor-pointer" onClick={onView}>
              <Eye className="h-4 w-4 text-blue-500" />
            </button>
            <button className="h-8 w-8 cursor-pointer" onClick={onEdit}>
              <Pencil className="h-4 w-4 text-blue-500" />
            </button>
            <button
              className="h-8 w-8 cursor-pointer "
              onClick={() => setopen(true)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </td>
      </tr>
      <DeleteModal
        isOpen={open}
        employeeName={name}
        onConfirm={onDelete}
        onClose={() => setopen(false)}
      />
    </>
  );
}
