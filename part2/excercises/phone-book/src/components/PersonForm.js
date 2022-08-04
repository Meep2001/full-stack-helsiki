const PersonForm=(props)=>{
    return (
        <>   
        <form onSubmit={props.onSubmit}>
        name:
        <input value={props.name}
        onChange={props.onNameChange} />
        <br />
        number:
        <input
          type="tel"
            value={props.number}
          onChange={props.onNumberChange}
        ></input>
      <div>
        <button type="submit">add</button>
      </div>
      </form>
      </>
    )

}
export default PersonForm;