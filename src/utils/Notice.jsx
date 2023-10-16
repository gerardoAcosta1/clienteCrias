import '../App.css'
const Notices = ({message,green}) => {
  
    return (
        <div className={`container__modal ${green ? 'container__green' : ''}`}>
            <div className="container__phrase">
                <h5 className="session__expired"> {message} </h5>
            </div>
            <img className='image__notice' src='/images/vite.svg' alt="" />
        </div>
    )
}

export default Notices