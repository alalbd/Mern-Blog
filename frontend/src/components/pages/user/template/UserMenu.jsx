const UserMenu = ({ children, userName, userEmail, role }) => {
    const roleBase = () => {
        if (role === 'admin') {
            return `Admin Dashboard`
        } else {
            return `User Dashboard`
        }
    }
    return (
        <div className="card">
            <div className="card-header">
                <div className="py-0">
                    <h3 className="m-0">{roleBase()}</h3>
                </div>
                <div className="py-1">
                    <p className="m-0 f-14">Name: {userName}</p>
                    <p className="m-0 f-14">Email: {userEmail}</p>
                </div>
            </div>
            <div className="card-body">
                <ul className="navbar-nav">
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default UserMenu