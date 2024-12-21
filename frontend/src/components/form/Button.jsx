
const Button = ({ children, className, ...rest }) => {
    return (
        <>
            <button type="submit" className={className} {...rest}>
                {children}
            </button>
        </>
    )
}

export default Button