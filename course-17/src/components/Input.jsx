const Input = ({ label, id, error, ...props }) => {
  return (
    <div className="control no-margin">
      {/* htmlFor: 与原生html的for等效 */}
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  )
}

export default Input
