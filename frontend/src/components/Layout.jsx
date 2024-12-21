import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./partials/Header"

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main mt-3">
                <div className="container">
                    {children}
                </div>
                <ToastContainer />
            </main>
        </>
    )
}

export default Layout