function Results(props){
    //displays results table
    return (
        <table id="showtable">
    <thead>
    <tr>
        <th>#</th>
        <th>Show</th>
        <th>Episodes Watched</th>
        <th>Episode Total</th>
        <th>Percent Complete</th>
        <th>Delete</th>
    </tr>

    </thead>
    <tbody>
    {props.shows.map((show,index)=> (
        <tr key={show._id}>
    <td>{index+1}</td>
    <td>{show.show}</td>
    <td>{show.watched}</td>
    <td>{show.total}</td>
    <td>{show.percent}%</td>
    <td>
        <button
            type="button"
            onClick={()=>props.deleteShow(show._id)}
            >Delete</button>
    </td>
    </tr>
    ))}
    </tbody>
</table>
    )
}
export default Results;