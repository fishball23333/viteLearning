import { DragDropContext } from 'react-beautiful-dnd'
import {useState} from 'react'
import Column from './Column.jsx'
import "./KanbanBoard.css"
import tasks from '../assets/db.js'
export default function KanbanBoard() {
    let {backlog, stageOne, stageTwo, stageThree,  complete} = tasks
    console.log("stageone", stageOne)
    console.log("complete", complete)
    const [backlogList, updateTasks] = useState(backlog)
    const [stageOneList, updateStageOne] = useState(stageOne)
    const [stageTwoList, updateStageTwo] = useState(stageTwo)
    const [stageThreeList, updateStageThree] = useState(stageThree)
    const [completeList, updateComplete] = useState(complete)
    function handleOnDragEnd(result){
        console.log("result is :", result)
        function findArray(id){
            console.log("id is:  ", id)
            if (id == "backlogList"){
                return [backlogList, updateTasks]
            } else if (id == "stageOneList"){
                                console.log("...")
                return [stageOneList, updateStageOne]
            } else if (id == "stageTwoList"){
                                console.log("...")
                return [stageTwoList, updateStageTwo]
            } else if (id=="completeList"){
                return [completeList, updateComplete]
            } else if (id=="stageThreeList"){
                return [stageThreeList, updateStageThree]
            }
            else {
                console.log("...")
                return false}
        }
        if (!result.destination) return;
        if (result.destination.droppableId === result.source.droppableId){
            let [list, updateMethod] = findArray(result.destination.droppableId)
            console.log("list is ", list)
            const items = Array.from(list)
            console.log("before slice: ", items)
            const [recordedItem] = items.splice(result.source.index, 1)
            console.log("remove: ", items)
            items.splice(result.destination.index, 0, recordedItem)
            console.log("add back: ", items)
            updateMethod(items)
        } else {
            let [sourceList, updatedSourceMethod] = findArray(result.source.droppableId)
            let [destinationList, updatedDestinationMethod] = findArray(result.destination.droppableId)

            const sourceItems = Array.from(sourceList)
            const destinationItems = Array.from(destinationList)
            const [recordedItem] = sourceItems.splice(result.source.index, 1)
            updatedSourceMethod(sourceItems)
            destinationItems.splice(result.destination.index, 0, recordedItem)
            updatedDestinationMethod(destinationItems)


        }
    }
  return (
    <div className="kanbanBoard">
    <h2 style={{textAlign:"center"}}>Kanban</h2>
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="dragDropContext">
        <Column title={"Backlog"} tasks={backlogList} DroppableID="backlogList"/> 
        <Column title={"Stage one"} tasks={stageOneList} DroppableID="stageOneList"/> 
        <Column title={"Stage two"} tasks={stageThreeList} DroppableID={"stageThreeList"}/>
        <Column title={"Stage three"} tasks={stageTwoList} DroppableID="stageTwoList"/> 
        <Column title={"Stage four"} tasks={completeList} DroppableID="completeList"/>
        <Column title={"Complete"} tasks={[]} DroppableID="completeList"/>
        </div>
    </DragDropContext>
    </div>

    )
}
