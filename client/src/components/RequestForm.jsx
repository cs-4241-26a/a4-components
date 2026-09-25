import { useState } from "react";

const inputClass = "w-full p-2 mb-3 border border-[#dce7f2] rounded-lg";
const buttonClass =
  "w-full p-2 mb-3 border border-[#dce7f2] rounded-lg hover:bg-[#2e6fa3] hover:text-white";

const emptyForm = {
  equipment: "",
  name: "",
  quantity: "",
  urgent: false,
  date: "",
  notes: "",
};

function toForm(item) {
  return {
    equipment: item.equipment ?? "",
    name: item.name ?? "",
    quantity: item.quantity ?? "",
    urgent: Boolean(item.urgent),
    date: item.date ?? "",
    notes: item.notes ?? "",
  };
}

export default function RequestForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(editing ? toForm(editing) : emptyForm);

  function handleChange(event) {
    const { id, type, value, checked } = event.target;
    setForm({ ...form, [id]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ ...form, quantity: Number(form.quantity) });
    setForm(emptyForm);
  }

  return (
    <div className="bg-white border border-[#dce7f2] rounded-[0.875rem] p-6 w-80">
      <h1>Equipment Request Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="equipment" className="flex mt-3">
          Equipment Needed:{" "}
        </label>
        <input
          type="text"
          id="equipment"
          required
          className={inputClass}
          value={form.equipment}
          onChange={handleChange}
        />

        <label htmlFor="name" className="flex mt-3">
          Requester:{" "}
        </label>
        <input
          type="text"
          id="name"
          required
          className={inputClass}
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="quantity" className="flex mt-3">
          Quantity:{" "}
        </label>
        <input
          type="number"
          id="quantity"
          required
          className={inputClass}
          value={form.quantity}
          onChange={handleChange}
        />

        <label htmlFor="urgent" className="inline-flex mt-3 mr-2">
          Mark if Urgent:
        </label>
        <input
          type="checkbox"
          id="urgent"
          checked={form.urgent}
          onChange={handleChange}
        />

        <label htmlFor="date" className="flex mt-3">
          Date Needed By:
        </label>
        <input
          type="date"
          id="date"
          required
          className={inputClass}
          value={form.date}
          onChange={handleChange}
        />

        <label htmlFor="notes" className="flex mt-3">
          Notes or Other Information:
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="..."
          className={inputClass}
          value={form.notes}
          onChange={handleChange}
        />

        <input
          type="button"
          value="Clear Fields"
          className={buttonClass}
          onClick={() => setForm(emptyForm)}
        />
        <input type="submit" value="Add Request" className={buttonClass} />
        {editing && (
          <input
            type="button"
            value="Cancel Edit"
            className={buttonClass}
            onClick={onCancel}
          />
        )}
      </form>
    </div>
  );
}
