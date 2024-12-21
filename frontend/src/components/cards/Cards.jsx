import { NavLink } from "react-router-dom";
import StrLength from "../utilities/StrLength";
import defImg from "../../assets/default.png";

const Cards = ({ image, title, link }) => {
    const postPhoto = () => {
        const postImg = image;
        if (postImg === "default.png") {
            return <img src={defImg} alt={title} className="img-fluid rounded-top" />
        } else {
            return <img src={`${import.meta.env.VITE_REACT_APP_PUBLIC_PATH}upload/posts/${image} `} alt={title} className="img-fluid rounded-top" />
        }
    }
    return (
        <div className="card">
            <NavLink to={`/post/${link}`}>
                <div className="card-header overflow-hidden p-0" style={{ height: "207px" }}>
                    {postPhoto()}
                </div>
                <div className="card-body py-1">
                    <h3><StrLength str={title} strLen={30} /></h3>
                </div>
                <div className="card-footer py-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="p-0">
                            <p className="m-0 f-12 text-muted">Post By Alal</p>
                        </div>
                        <div className="p-0">
                            <p className="m-0 f-12 text-muted">3 Days Ago</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}


export default Cards;