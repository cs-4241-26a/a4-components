import { useState, useEffect } from "react";
import { fancifyTime } from "./util";
import "./App.css";

function App() {
	const [serverData, setData] = useState([]);
	const [pageLoaded, setPageLoaded] = useState(false);

	const current = fancifyTime(Date.now())

	async function handleSubmit(e) {
		// Read the form data
		// console.log(e)
		console.log(JSON.stringify(Object.fromEntries(e)))
		const response = await fetch(`/data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(e)) 
        })
		refresh();
	}

	function populateTable(data) {
		let tmp = serverData.map(data => {
			return (
			<tr>
				<td>{data["entry"]}</td>
				<td>{fancifyTime(data["deadline"])}</td>
				<td>{data["priority"]}</td>
				<td>{data["order"]+1}</td>
				<td><button data-order={data["order"]} onClick={delData}>delete</button></td>
			</tr>
			)		
		})

		return tmp
	}

	const delData = async function(event) {
		// gets the number attached to the attribute
		// console.log(event.target.getAttribute("data-order"))
		const json = {index:`${event.target.getAttribute("data-order")}`}
		const body = JSON.stringify(json)

		const response = await fetch('/delete', {method:'POST', headers: { 'Content-Type': 'application/json' }, body})
		const text = await response.text()

		console.log( 'response:\n', text )
		refresh()
	}

	
	async function refresh() {
		const response = await fetch(`/data`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
		// console.log(response.json())
		// console.log(serverData)
		setData(await response.json())
	}

	useEffect(() => {
		if(pageLoaded) return
		setPageLoaded(true)
		console.log("page loaded!")
		refresh();
	})

	return (
		<div className="tableHolder">
			<span>
				add new entry here:
			</span>
			<form action={handleSubmit}>
				<input type='text' name='entryname' id='entryname' defaultValue='entry name' />
				<input type='datetime-local' name='deadline' id='deadline' defaultValue={current} />
				<input type="number" name='priority' id='priority' min="1" max="5" step="1" defaultValue="2" />
				<button type='submit' id='submit'>submit</button>
			</form>
			<table id='table'>
				<thead>
					<tr>
						<th>Entry:</th>
						<th>Deadline:</th>
						<th>Priority:</th>
						<th>Order:</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{serverData ? populateTable(serverData) : <></>}
				</tbody>
			</table>
			<button id='refresh' onClick={refresh}>refresh</button>
		</div>
	);
}

export default App;
