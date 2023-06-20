import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {useState} from 'react'
import Table from 'react-bootstrap/Table'
import { useEffect } from 'react'

const HistoryResult = ({result, input, searchType})=>{
    if (result == "nothing"){
        return (
            <>
                <hr/>
            
                <h3>{searchType} &#34;{input}&#34; was not found</h3>
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
                    <td>{result.customer}</td>
                </tr>
            </tbody>
            </Table>

        </>
    )
}

    
const History = () => {
    const [input, updateInput] = useState("")
    const [searchType, updateSearchType] = useState("")
    const [result, updateResult] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) =>{
        if (searchType===""){
            alert("your need to select a search type")
        } else {
            e.preventDefault()
            setLoading(true)
            fetch("http://localhost:8080/complete")
            .then(function (response) {
                console.log(response)
                return response.json()
            }).then(function(myJson){
                console.log("myjson", myJson)
                setData(myJson)
            })
            }
        }
    useEffect(()=>{
        console.log("data is", data)
 
        if (searchType==="id"){
            console.log("data is2", data)
            const result = data.find((e)=>e.id==input)
            console.log("result is ", result)
            if (result){
                updateResult(result)
            } else {
                updateResult("nothing")
            }
        } else if (searchType==="customer"){
            const result = data.find((e)=>e.customer==input)
            if (result){
                updateResult(result)
            } else {
                updateResult("nothing")
            }
        }
        setLoading(false)
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])
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
            {loading &&<>loading...</>}
            {result && <HistoryResult result={result} input={input} searchType={searchType}/>}
        </Container>
    );
}
 
export default History;