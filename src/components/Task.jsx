import {Draggable} from "react-beautiful-dnd"
import './Task.css'


const Task = ({task, index}) => {
    return ( 
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot)=>{
            const style={
                ...provided.draggableProps.style,
                marginBottom: '5px',
                padding: '5px',
                backgroundColor:snapshot.isDragging?'blue':'green'
            }
            
            return (
            <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
            >
                <div style={{display:"flex", justifyContent:"center", padding: 2}}>
                    <h3>{task.customer}</h3>
                </div>
                {provided.placeholder}
        </div>)}
    }
    </Draggable> );
}
 
export default Task;