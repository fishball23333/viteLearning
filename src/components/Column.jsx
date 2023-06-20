/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import "./Column.css"


const Column = ({title, tasks, DroppableID}) => {
  console.log("tasks", tasks)
  return (
    <div className='column'>
        <h3 className='columnTitle'>{title}</h3>
        <Droppable droppableId={DroppableID} >
            {(provided, snapshot) => (
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