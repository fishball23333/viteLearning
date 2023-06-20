import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './Order.css'
const Order = () => {
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
    return ( 
      <Container>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Customer: </Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Order Item:</Form.Label>
        <Form.Select type="select" defaultValue="">
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