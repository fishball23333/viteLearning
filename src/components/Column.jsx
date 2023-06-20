/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import "./Column.css"


const Column = ({customer, tasks, DroppableID}) => {
  console.log("tasks", tasks)
  return (
    <div className='column'>
        <h3 className='columnTitle'>{customer}</h3>
        <Droppable droppableId={DroppableID} >
            {(provided) => (
              <div ref={provided.innerRef} 
                {...provided.droppableProps}  
                className='droppableItem'>{
                  console.log("remap")
                }
                  {tasks.map((task, index)=>(
                    <Task task={task} key={task.id} index={index}/>
                  ))}
                  {provided.placeholder}
                </div>
            )}

        </Droppable>
    </div>

  )
}
 
export default Column;