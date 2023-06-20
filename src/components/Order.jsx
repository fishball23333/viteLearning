import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useState} from 'react'
import './Order.css'
const Order = () => {
  const [customerInput, updateCustomerInput] = useState("")
  const [orderItem, updateOrderItem] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("input is :", customerInput)
    console.log("value is :", orderItem)
    console.log(Date.now().toString())
    const data = {customer:customerInput, orderItem: orderItem, id: Date.now().toString()}
    async function postData(){
      await fetch('http://localhost:8080/backlog', {

        method:"POST", 
        headers:{"Content-Type":"application/json", 
                 'Accept':'application/json'
        },
        
        body: JSON.stringify(data)
      })
      console.log("data posted")
    }
    postData()
  }
    return ( 
      <Container>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Customer: </Form.Label>
        <Form.Control type="text" value={customerInput} onChange={(e)=>{updateCustomerInput(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Order Item:</Form.Label>
        <Form.Select type="select" value={orderItem} onChange={(e)=>{updateOrderItem(e.target.value)}}>
        <option value="" hidden disabled>Select the order item </option>
        <option value="Item A">Item A</option>
        <option value="Item B">Item B</option>
        <option value="Item C">Item C</option>
        <option value="Item D">Item D</option>
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3" >
        <Form.Label>Note:  </Form.Label>
        <Form.Control as="textarea" placeholder='ahhahah' rows='5'>
        </Form.Control>
      </Form.Group>

 
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
     );
}
 
export default Order;