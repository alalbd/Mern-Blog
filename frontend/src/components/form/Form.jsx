const Form = ({ method, children, ...rest }) => {
    return (
        <form method={method} {...rest}>
            {children}
        </form>
    )
}

export default Form