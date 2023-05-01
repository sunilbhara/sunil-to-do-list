import React, {useState, useEffect} from 'react';
import "./style.css";

//get the local storage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists) {
        return JSON.parse(lists);
    }else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItem = (e) => {
        e.preventDefault();
        if(!inputData) {
            alert("Fill the data")
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem){
                        return { ...curElem, name: inputData };
                    }
                    return curElem;
                })
            )

            setInputData("")
            setIsEditItem(null)
            setToggleButton(false);
        }
        else{ 
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData])
            setInputData("");
        }
    }

    // delete selected items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }

    // Remove all the items
    const removeAll = () => {
        setItems([]);
    }

    // Store to local storage
    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])

    // edit items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true);
    } 
    

  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="todologo" />
                    <figcaption>Start adding your items</figcaption>
                </figure>
                <form className="addItems" onSubmit={addItem}>
                    <input 
                        type="text" 
                        placeholder="🧐 Add Item" 
                        className='form-control'
                        value = { inputData}
                        onChange= { (event) => setInputData(event.target.value)}

                    />
                    
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                            ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    
                </form>
                {/* Show our items  */}
                <div className="showItems">
                    {items.map((curElem, index) => { 
                        return (
                            <div className="eachItem" key={index}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                                <i className="far fa-edit add-btn"
                                    onClick={() => editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn"
                                    onClick={() => deleteItem(curElem.id)} ></i>
                            </div>
                    </div>
                        )
                    })}

                    
                </div>

                {/* Remove all Items */}
                <div className="showItems">
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={() => removeAll()}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Todo