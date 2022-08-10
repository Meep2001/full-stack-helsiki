const Person=({name,number,handleDelete,id})=>{
    return <><p>
        {name} {number}
        </p>
        <button onClick={()=>{
            if(window.confirm(`Delete ${name}?`))
           handleDelete(id)
        }
        }>delete</button>
        </>
}
export default Person;