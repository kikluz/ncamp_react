import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label,  Col, Row } from 'reactstrap';
import { Control, Errors, Form } from  'react-redux-form';
import { Link } from 'react-router-dom';



// validation logic
// this function recives a value as an argument, All form input are string
// chack for val if val is flasy, chech length is greater then 0 
const required = val => val && val.length;
// wrap a function inside a fucntion firt one take the maxLength the second one takes value input string 
// inside inner function return true if maxLength has not exceeded so not fill will return true, there is no value
// or return true if value length is less than or equal to maximum
const maxLength = len => val => !val || (val.length <= len);
// wraps a function in a function, returns true is value, value greater or equal to the minimum
const minLength = len => val => val && ( val.length >= len);
// check the value is number, turn value into a number,  return NaN if isnot 
const isNumber = val => !isNaN(+val); 
// check for a valid email 
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
            // track touched state with propery
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        // Bind handleInputchange method in the class constructor
        // removed handleInputChange method react redux form will handle it 
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

  
// Mehod to handle changes in form Elements
handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    // if checkbox, beging the value from the target.checked attr boolean, if not checked get the taget.value
    const value = target.type === 'checkbox' ?  target.checked : target.value;

// this.setState with propery name
    this.setState({
        // set the propery  with target name 
        [name]: value
    });

} 
// Method to handle form summition, changed the object from event to values
handleSubmit(values){

        // use resetFeedbackForm as a method of this props 
        // this will  will reset to initial values  
        this.props.resetFeedbackForm();

        // TASK 2  week5 call postFeedback, passing it the values object
        this.props.postFeedback(values)
        // we stop refresh the entire page, need to bind this event in the custroctor 
        // removed event.preventDefault(); so redux will handle for us 
}
    render(){

        // Declare avariable erros variable declare inside are in local not global
        // call the validate() method passing the this keyword passing the current values fileds

        return (
            <div className="container">
            <div className="row">
                <div className="col">
                <Breadcrumb>
                <BreadcrumbItem> <Link to="/Home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active> Contact Us</BreadcrumbItem>
                </Breadcrumb>
                    <h2>Contact Us</h2>
                    <hr />
                </div>
            </div>

            <div className="row row-content align-items-center">
                <div className="col-sm-4">
                    <h5>Our Address</h5>
                    <address>
                        1 Nucamp Way<br />
                        Seattle, WA 98001<br />
                        U.S.A.
                    </address>
                </div>
                <div className="col">
                    <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                    <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                </div>
            </div>


            <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                    <Form model="feedbackForm" onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".lastName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".phoneNum"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 10 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: "Must be number"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            validEmail
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            validEmail: "Invalid Email address"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;