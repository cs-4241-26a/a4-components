const tdClass = "text-left p-2 border-b border-[#dce7f2]";

export default function RequestRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td className={tdClass}>{item.equipment}</td>
      <td className={tdClass}>{item.name}</td>
      <td className={tdClass}>{item.quantity}</td>
      <td className={tdClass}>{item.urgent ? "Yes" : "No"}</td>
      <td className={tdClass}>{item.date}</td>
      <td className={tdClass}>{item.notes}</td>
      <td className={tdClass}>{item.priority}</td>
      <td className={tdClass}>
        <button
          type="button"
          className="px-2 py-0.5 text-sm border border-[#dce7f2] rounded-lg cursor-pointer hover:bg-[#2e6fa3] hover:text-white"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>{" "}
        <button
          type="button"
          className="px-2 py-0.5 text-sm border border-[#dce7f2] rounded-lg cursor-pointer hover:bg-[#2e6fa3] hover:text-white"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
