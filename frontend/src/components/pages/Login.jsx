import classes from "../../styles/Bcard.module.css"
import Forminfo from "../form/Forminfo"
import Loginform from "../form/Loginform"
import Meta from "../Meta"

const Login = () => {

    return (
        <>
            <Meta title={"Login - MERN BLOG"} />
            <div className="row">
                <div className="col-12">
                    <div className="p-0">
                        <div className="d-flex justify-content-center align-imtems-center">
                            <div className="w-50">
                                <div className={`${classes.bcard} d-flex justify-content-between gap-3`}>
                                    <Forminfo title={"INFORMATION"} link={"singup"} linkName={"Don't have a account"}>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                        <p>
                                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        </p>
                                    </Forminfo>
                                    <div className="flex py-4 px-4">
                                        <div className="p-2">
                                            <h3 className="color-main">
                                                USER LOGIN
                                            </h3>
                                        </div>
                                        <Loginform />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Login