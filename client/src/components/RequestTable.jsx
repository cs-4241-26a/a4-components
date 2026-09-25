import RequestRow from "./RequestRow";

const headers = [
  "Equipment",
  "Requester",
  "Quantity",
  "Urgent",
  "Date Needed",
  "Notes",
  "Priority",
  "",
];

export default function RequestTable({ items, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-[#dce7f2] rounded-[0.875rem] p-6 flex-1">
      <p className="pl-1">Items Requested</p>
      <table id="results-table" className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-left p-2 border-b border-[#dce7f2] bg-[#eaf2fa]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="results-body">
          {items.map((item) => (
            <RequestRow
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
