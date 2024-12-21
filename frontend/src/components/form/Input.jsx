
const Input = ({ labelName, name, ...rest }) => {
    return (
        <div className="mb-3">
            <label htmlFor="fullName" className="form-label">{labelName}</label>
            <input name={name} className="form-control" {...rest} />
        </div>
    )
}

export default Input