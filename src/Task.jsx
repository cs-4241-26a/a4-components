
export default function Task({task, onToggle, onDelete, onEdit}) {

    return(
        <li className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task._id)}
                    className="peer w-5 h-5 accent-orange-400 cursor-pointer m-0"
                />
                <label className={task.done ? "line-thorough text-gray-400" : ""}>
                    {task.task}
                </label>
                <span className="text-gray-500 text-sm ml-2">
                    Due: {task.deadline}
                </span>
            </div>

            <div className="flex gap-1">
                <button
                onClick={() => onEdit(task._id)}
                className="rounded-lg border-none bg-blue-400 cursor-pointer p-1.5 px-3"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="w-full max-w-17.5 rounded-lg border-none bg-orange-400 cursor-pointer p-1.5"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}