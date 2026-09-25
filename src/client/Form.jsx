import {useState} from 'react'
//form component
function Form(props) {
    //variables for show watched total and modify selector
    const [show, setShow] = useState('')
    const [watched, setWatched] = useState(0)
    const [total, setTotal] = useState(0)
    const [modifySelector, setModifySelector] = useState('')
//submit show
    const submit = function(e){

        e.preventDefault()
        const json = {
            show: show,
            watched: Number(watched),
            total: Number(total)
        }
        props.submit(json)
    }
    //modify show selector
    const modifyShow = function(){
        const json = {
            _id: modifySelector,
            show: show,
            watched: Number(watched),
            total: Number(total)
        }
        props.modifyShow(json)
    }
    return (
        //displays the form
        <form onSubmit={submit}>
            {/*showname*/}
            <label className="form-group" htmlFor="showname">Show</label>
            <input className="form-group" type='text' id='showname' value={show} placeholder = "Name of Show Here"
            onChange={(e) => setShow(e.target.value)}/>
            {/*epsidoes watched*/}
            <label className="form-group" htmlFor="episodeswatched">Episodes Watched</label>
            <input className="form-group" type='number' id='episodeswatched' value={watched}
            onChange={e => setWatched(e.target.value)}/>

            {/*total episodes*/}
            <label className="form-group" htmlFor="episodecount">Total Episodes</label>
            <input className="form-group" type='number' id='episodecount' value={total}
            onChange={e => setTotal(e.target.value)}/>
            <div className="form-buttons">
                <button id="submitbutton" type="submit">Submit</button>
                <span>OR</span>
                <button type="button" id="modifybutton" onClick={modifyShow}>Modify</button>
                <div className="modify-show">
                    <label htmlFor="index">Show to Modify</label>
                    <select id='index' value={modifySelector} onChange={(e) => setModifySelector(e.target.value)}>
                        <option value = "">
                            Select
                        </option>
                        {/*create dropdown options*/}
                        {props.shows.map((show, index) => (
                            <option key={show._id} value={show._id}>
                                {index+1}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

        </form>

    )

}
export default Form