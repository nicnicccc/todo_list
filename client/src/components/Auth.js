import {useState} from "react";
import {useCookies} from "react-cookie";

const Auth = () => {
    const [error, setError] = useState(null)
    const [isLogIn, setisLogin] = useState(true)


    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    console.log(cookies)
    const viewLogin = (status) => {
        setError(null)
        setisLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmPassword) {
            setError('Make sure password match!')
            return
        }
        //TODO benerin addresssss
        const response = await fetch (`https://server-todos-nico-gdkqsbwlv-nicniccccs-projects.vercel.app/${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })

        const data = await response.json()

        if (data.detail) {
            setError(data.detail)
        }
        else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)

            window.location.reload()
        }
    }

    return (
        <div className={"auth-container"}>
            <div className={"auth-container-box"}>
                <form>
                    <h2>
                        {isLogIn? 'Log In': 'Sign up'}
                    </h2>
                    <input type={'email'} placeholder={'email'} onChange={(e) => setEmail(e.target.value)}/>
                    <input type={'password'} placeholder={'password'} onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogIn && <input type={'password'} placeholder={'confirm password'} onChange={(e) => setConfirmPassword(e.target.value)}/>}
                    <input type={'submit'} className={'create'} onClick={(e) => handleSubmit(e, isLogIn?'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>

                <div className={'auth-options'}>
                    <button
                        onClick={() => viewLogin(false)}
                        style={{backgroundColor: !isLogIn? "orange" :"white", color: !isLogIn? "white": "black"}}>
                        Sign Up
                    </button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{backgroundColor: isLogIn? "orange" : "white", color: !isLogIn? "black": "white"}}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
