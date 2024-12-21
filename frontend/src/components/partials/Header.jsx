import Action from "./Action"
import Logo from "./Logo"
import Nav from "./Nav"
import Search from "./Search"

function Header() {
    return (
        <div className="navarea">
            <div className="border-bottom">
                <div className="container-fluid py-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <Logo />
                        <Search />
                        <Action />
                    </div>
                </div>
                <Nav />
            </div>
        </div>
    )
}

export default Header