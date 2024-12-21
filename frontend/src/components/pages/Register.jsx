import classes from "../../styles/Bcard.module.css"
import Forminfo from "../form/Forminfo"
import SignupForm from "../form/signupForm"
import Meta from "../Meta"

const Register = () => {
    return (
        <>
            <Meta title={"User Register - MERN BLOG"} />
            <div className="row">
                <div className="col-12">
                    <div className="p-0">
                        <div className="d-flex justify-content-center align-imtems-center">
                            <div className="w-50">
                                <div className={`${classes.bcard} d-flex justify-content-between gap-3`}>
                                    <Forminfo title={"INFORMATION"} link={"login"} linkName={"Have a account"}>
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
                                                USER SIGNUP
                                            </h3>
                                        </div>
                                        <SignupForm />
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

export default Register