import { Link } from "react-router-dom"
const Forminfo = ({ title, children, link, linkName }) => {
    return (
        <div className="flex bg-main rounded-start py-4 px-4">
            <div className="p-2">
                <h3 className="text-main">
                    {title}
                </h3>
            </div>
            <div className="p-2 text-main">
                {children}

                <Link to={`/${link}`} className="bg-white border-0 rounded text-dark py-2 px-5 mt-3">
                    {linkName}
                </Link>

            </div>
        </div>
    )
}

export default Forminfo