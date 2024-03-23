import ProgressBar from "./ProgressBar";
import {useState} from "react";
import Modal from "./Modal";

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteData = async () => {

        try {
            //TODO Jangan lupa ganti serverurl
            const response = await fetch(`https://www.server-todos-nico-gdkqsbwlv-nicniccccs-projects.vercel.app/todos/${task.id}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='list-item'>
            <div className="info-container">
                <ProgressBar progress = {task.progress}/>
                <p className="task-title">{task.title}</p>
            </div>

            <div className="button-container">
                <button className="edit-button" onClick={() => setShowModal(true)}>EDIT</button>
                <button className="delete-button" onClick={() => deleteData()}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData = {getData} task={task}/>}
        </div>
    );
}

export default ListItem;