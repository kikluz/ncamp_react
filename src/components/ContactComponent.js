import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { targetPropType } from 'reactstrap/lib/utils';
// import { Component } from 'react';

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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Form Validation
    validate(firstName, lastName, phoneNum, email){
        
        const errors = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };
        // Validation for firstName
        if (this.state.touched.firstName){
            if(firstName.length < 2 ){
                errors.firstName = "First name must be at least 2 characters";
            } else if (firstName.length > 15 ){
                errors.firstName = "First name  must be 15 or less characters";
            }
        };
        // Validation for lastName
        if (this.state.touched.lastName){
            if(lastName.length < 2 ){
                errors.lastName = "Last name must be at least 2 characters";
            } else if (lastName.length > 15 ){
                errors.lastName = "Last name  must be 15 or less characters";
            }
        };
        //Validation for phoneNum, check phoneNum values that contains digits only 
        const reg = /^\d+$/;
        if(this.state.touched.phoneNum && !reg.test(phoneNum)) {
            // if so 
            errors.phoneNum = "The phone number should contain only numbers.";
        } 
        //Validation for email, check email values that contains @  
        if(this.state.touched.email && !email.includes('@')) {
            errors.email = "Email should contain a @ ";
        }
        return errors;
    }

    // events handler can be bind with arrow function
    handleBlur = (field) => () => {
        this.setState({
            // spread syntax  spread object literal and update the propery and set to true so we know its been touched
            touched: {...this.state.touched, [field]: true}
        });
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
// Method to handle form summition
handleSubmit(event){
    console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is: ' + JSON.stringify(this.state));
        // we stop refresh the entire page, need to bind this event in the custroctor 
        event.preventDefault();
}
    render(){


        // Declare avariable erros variable declare inside are in local not global
        // call the validate() method passing the this keyword passing the current values fileds
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email);

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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        // set a conditional its there error 
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                        {/* render FormFeedback */}
                                        <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                         // set a conditional its there error 
                                         invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                            // set a conditional its there error 
                                            invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                         // set a conditional its there error 
                                         invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;