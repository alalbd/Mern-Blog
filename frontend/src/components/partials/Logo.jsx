import { Link } from "react-router-dom"

const Logo = () => {

    return (
        <div className="p-0">
            <Link to={"/"}>
                <div className="logo ps-lg-2">
                    <h2>MERNBLOG</h2>
                </div>
            </Link>

        </div>
    )
}

export default Logo