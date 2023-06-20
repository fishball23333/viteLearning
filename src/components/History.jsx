import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useState} from 'react'
import Table from 'react-bootstrap/Table'
import { useEffect, useRef } from 'react'

const HistoryResult = ({result, input})=>{
    console.log(result)
    console.log(input)
    if (result == "nothing"){
        return (
            <>
                <hr/>
                <h3>ID &#34;{input}&#34; was not found</h3>
            </>
        )
    }
    return (
        <>
            <hr />
            <h3>result found: </h3>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                    </tr>

                </thead>
            <tbody>
                <tr>
                    <td>{result.id}</td>
                    <td>{result.title}</td>
                </tr>
            </tbody>
            </Table>

        </>
    )
}

const History = () => {
    // let {complete} = tasks
    const [data, setData] = useState()
    useEffect(()=>{getData()}, [])
    const getData=()=>{
        fetch('db.json'
        ,{
            headers:{
                'Content-Type':"application/json", 
                'Accept':'application/json'
            }
        }).then(function (response) {
            console.log(response)
            return response.json()
        }).then(function(myJson){
            console.log(myJson)
            setData(myJson)
        })
    }
    return (<>{data && <HistoryChild complete={data[0].complete}/>}</>)
    }
const HistoryChild = ({complete}) => {
    console.log("complete is: ", complete)
    const [input, updateInput] = useState("")
    const [searchType, updateSearchType] = useState("")
    const [result, updateResult] = useState()



    const handleSubmit = (e) =>{
        console.log("input is ", input)
        if (searchType===""){
            alert("your need to select a search type")
        } else {
            e.preventDefault()
            if (searchType==="id"){
                const result = complete.find((e)=>e.id==input)
                if (result){
                    updateResult(result)
                } else {
                    updateResult("nothing")
                }
            }
        }
        console.log("search type is : ", searchType)
    }
    return (  
        <Container>
            <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3">
                <Form.Label style={{display:"block"}}>What are you searching for ?</Form.Label>
            <Form.Check type="radio" 
                        value="customer" 
                        name="searchType" 
                        label="customer" 
                        onChange={e=>{
                            updateResult(null)
                            updateSearchType(e.target.value)
                        }} 
                        inline/>
            <Form.Check type="radio" 
                        value="id" 
                        name="searchType" 
                        label="order ID" 
                        onChange={e=>{
                            updateResult(null)
                            updateSearchType(e.target.value)
                        }} 
                        inline/>
            </Form.Group> 
            <Form.Group className="mb-3">
                <Form.Label>type in your search input: </Form.Label>
                <Form.Control type="text" 
                              value={input} 
                              onChange={e=>{
                                    if (e.target.value != input && result != null){

                                        updateResult(null)
                                    }
                                  updateInput(e.target.value)
                                }}>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            </Form>
            {result && <HistoryResult result={result} input={input} />}
        </Container>
    );
}
 
export default History;