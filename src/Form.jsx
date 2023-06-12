import React, { useState } from 'react'

const Form = () =>{
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        rollno: "",
    });
    const handleChange = (e) =>{
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value,
        });
    };
    const [tableData, SetTableData] = useState([])
    const [editClick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("inputs", inputs);
        if (editClick){
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs)
            SetTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name:"",
                email:"",
                rollno:"",
            })
        }else{
            SetTableData([
                ...tableData, inputs
            ]);
    
            setInputs({
                name:"",
                email:"",
                rollno:"",
            })
        }
       
    };

    const handleDelete = (index)=>{
        const filterData = tableData.filter((item, i) => i !== index)
        SetTableData(filterData);
    };

    const handleEdit = (index) =>{
        const tempData = tableData[index];
        setInputs({
            name: tempData.name,
            email: tempData.email,
            rollno: tempData.rollno,
        })
        setEditClick(true);
        setEditIndex(index)
    }
    return(
        <div className="container ">
            <h1 className="text-center">CRUD App</h1>
            <div className="container my-auto align-items-center justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 offset-col-lg-10">
                        <label className="form-label">Name</label>
                        <input className="form-control" name="name" value={inputs.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" value={inputs.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Roll No</label>
                        <input type="number" className="form-control" name="rollno" value={inputs.rollno} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">{editClick?"Update" : "Add"}</button>
                </form>
            </div> <br/><br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="colSpan">Name</th>
                    <th scope="colSpan">Email</th>
                    <th scope="colSpan">Roll No</th>
                    <th scope="colSpan">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((item, i)=>(
                            <tr scope="row">
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.rollno}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mx-3" onClick={() => handleEdit(i)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(i)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
</table>
       </div>
    )
}

export default Form;