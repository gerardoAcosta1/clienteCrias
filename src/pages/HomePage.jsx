import '../App.css'
import LoginLayout from "../components/Layouts/LoginLayout"
import useFetch from '../hooks/useFetch'

const HomePage = ({ notice }) => {
    const {allCowsByDB} = useFetch()
    return (
        <div className="main__home">
            <LoginLayout
                notice={notice}
                allCowsByDB={allCowsByDB}
            />
        </div>
    )
}
export default HomePage
