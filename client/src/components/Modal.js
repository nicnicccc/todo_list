import {useState} from "react";
import {useCookies} from "react-cookie";

const Modal = ({mode, setShowModal, getData, task}) => {

    const editMode = mode === 'edit' ?true:false

    const [cookies, setCookie, removeCookie]= useCookies(null)

    const [data, setData] = useState({
        user_email: editMode? task.user_email: cookies.Email,
        title: editMode? task.title : null,
        progress: editMode? task.progress : 50,
        date: editMode? task.date : new Date()
    })
    console.log('cookies email:', cookies.Email)
    console.log('cookies: ' , cookies)

    const postData = async (e) => {
        e.preventDefault()
        try {
            //TODO
            const response = await fetch(`https://server-todos-nico-gdkqsbwlv-nicniccccs-projects.vercel.app/todos`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                console.log('WORKED')
                setShowModal(false)
                getData()
            }

        }
        catch (err) {
            console.error(err)
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        try {
            //TODO
            const response = await fetch(`https://server-todos-nico-gdkqsbwlv-nicniccccs-projects.vercel.app/todos/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
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


    const handleChange = (e) => {

        const {name, value} = e.target
        setData(data => ({
            ...data,
            [name] : value
        }))
        console.log(data)
    }

    return (
        <div className={"overlay"}>
            <div className={"modal"}>
                <div className={"form-title-container"}>
                    <h3>
                        Let's {mode} your task
                    </h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input
                    required
                    maxLength={30}
                    placeholder={"Your task goes here"}
                    name={"title"}
                    value={data.title}
                    onChange={handleChange}
                    />
                    <br/>
                    <label for={'range'}>Drag to select  your current progress</label>
                    <input
                    required
                    type={"range"}
                    min={"0"}
                    max={"100"}
                    name={'progress'}
                    value={data.progress}
                    onChange={handleChange}
                    />
                    <input className={"${mode} create"} type={"submit"} onClick={editMode? editData : postData}/>
                </form>
            </div>

        </div>
    );
}

export default Modal;