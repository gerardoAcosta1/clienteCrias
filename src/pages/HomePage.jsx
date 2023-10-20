import '../App.css'
import LoginLayout from "../components/Layouts/LoginLayout"

const HomePage = ({ notice }) => {
    
    return (
        <div className="main__home">
            <LoginLayout
                notice={notice}
            />
        </div>
    )
}
export default HomePage
