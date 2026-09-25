import { useEffect, useState } from "react";
import RequestForm from "./components/RequestForm";
import RequestTable from "./components/RequestTable";

async function request(method, body) {
  const options = { method };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }
  const response = await fetch("/data", options);
  if (!response.ok)
    throw new Error(`${method} /data failed: ${response.status}`);
  return response.json();
}

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    request("GET").then(setItems).catch(console.error);
  }, []);

  async function handleSubmit(item) {
    const data = editing
      ? await request("PUT", { ...item, _id: editing._id })
      : await request("POST", item);
    setItems(data);
    setEditing(null);
  }

  async function handleDelete(id) {
    const data = await request("DELETE", { id });
    setItems(data);
  }

  return (
    <>
      <div className="fixed top-4 left-10 right-10 h-11 flex items-center justify-between px-6 bg-white border border-[#dce7f2] rounded-[0.875rem] z-[100]">
        <span className="font-semibold">Equipment Request Form</span>
        <a
          href="/logout"
          className="inline-block no-underline hover:underline hover:decoration-[#1e2a36] py-2 px-4 text-[#1e2a36] [font-family:inherit] text-base cursor-pointer"
        >
          Log Out
        </a>
      </div>
      <main className="flex gap-6 pt-20 pr-8 pb-8 pl-8">
        <RequestForm
          key={editing ? editing._id : "new"}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
        <RequestTable
          items={items}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}
