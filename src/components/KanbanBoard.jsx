import { DragDropContext } from 'react-beautiful-dnd'
import {useEffect, useState} from 'react'
import Column from './Column.jsx'
import "./KanbanBoard.css"



export default function KanbanBoard(){
    const [data, setData] = useState()
    useEffect(()=>{
        Promise.all([
            fetch("http://localhost:8080/backlog"),
            fetch("http://localhost:8080/stageOne"),
            fetch("http://localhost:8080/stageTwo"), 
            fetch("http://localhost:8080/stageThree"), 
            fetch("http://localhost:8080/complete")
        ]).then((res)=>
            Promise.all(res.map((item)=>item.json()))
        ).then(([backlog, stageOne, stageTwo, stageThree, complete])=>{
            const obj = {backlog: backlog, 
                        stageOne: stageOne, 
                        stageTwo: stageTwo, 
                        stageThree: stageThree, 
                        complete: complete}
            setData(obj)
        })
    }, [])
    return (<>{data && <Board data={data}/>}</>)
}
function Board({data}) {
    console.log("data is ", data)
    const [backlogList, updateTasks] = useState(data.backlog)
    const [stageOneList, updateStageOne] = useState(data.stageOne)
    const [stageTwoList, updateStageTwo] = useState(data.stageTwo)
    const [stageThreeList, updateStageThree] = useState(data.stageThree)
    const [stageFourList, updateStageFour] = useState(data.complete)
    function handleOnDragEnd(result){
        console.log("result is :", result)
        function findArray(id){
            switch(id){
                case "backlogList":
                    return [backlogList, updateTasks]
                case "stageOneList":
                    return [stageOneList, updateStageOne]
                case "stageTwoList":
                    return [stageTwoList, updateStageTwo]
                case "stageThreeList":
                    return [stageThreeList, updateStageThree]
                case "stageFourList":
                    return [stageFourList, updateStageFour]
                default: 
                    return false
            }
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
            <Column customer={"Backlog"} tasks={backlogList} DroppableID="backlogList"/> 
            <Column customer={"Stage one"} tasks={stageOneList} DroppableID="stageOneList"/> 
            <Column customer={"Stage two"} tasks={stageThreeList} DroppableID={"stageThreeList"}/>
            <Column customer={"Stage three"} tasks={stageTwoList} DroppableID="stageTwoList"/> 
            <Column customer={"Stage four"} tasks={stageFourList} DroppableID="stageFourList"/>
            <Column customer={"Complete"} tasks={[]} DroppableID="completeList"/>
            </div>
        </DragDropContext>
    </div>
    )
}
