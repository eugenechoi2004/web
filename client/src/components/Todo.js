import {useState} from 'react';
import Modal from './Modal'
import Backdrop from './Backdrop'
function Todo(props){
    const [modalIsOpen,setModalIsOpen] = useState(false);
    function deleteHandler(){
        console.log('Clicked')
        setModalIsOpen(true)
    }
    return(
        <div>{props.text}
        <button className='btn' onClick={deleteHandler}>Delete</button>
        {modalIsOpen && <Modal/>}
        </div>
    )
}

export default Todo