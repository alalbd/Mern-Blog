import Meta from "../../Meta";
import Sidebar from "./template/Sidebar";

const Dashboard = () => {
    const user = localStorage.getItem('loggedUser');

    const { name, email } = JSON.parse(user);

    return (
        <>
            <Meta title={"User Dashboard"} />
            <div className="container">
                <div className="row">
                    <Sidebar name={name} email={email} />
                    <div className="col-9">
                        <div className="p-0">
                            <div className="f-14">
                                <h4>Welcome to the User Dashboard</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Dashboard;