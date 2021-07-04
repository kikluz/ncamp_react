import React from "react";
import { Component } from 'react';

import { 
	Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
	ModalHeader, ModalBody, BreadcrumbItem, Button, Modal, Form, FormGroup, Label, Input  
} from 'reactstrap';

import { Control, LocalForm, Errors } from  'react-redux-form';
import { Link } from 'react-router-dom';

// Test from branch git week_5

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




function RenderCampsite({ campsite }) {
	return (
		<div className="col-md-5 m-1">
			<Card>
				<CardImg top src={campsite.image} alt={campsite.name} />
				<CardBody>
					<CardTitle>{campsite.name}</CardTitle>
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	)
}

function RenderComments({ comments }) {
	if (comments) {
		return (
			<div classNam="col-md5 m-1">
				<h4>Comments</h4>
				{comments.map(comment => {
					return (
						<div>
							<p>{comment.text}</p>
							<p>{comment.author}</p>
							<p>{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))};</p>
							
						</div>
						
					);
				})}

				<CommentForm />
			<br />	
			</div>
			
		);
		
	}
	
}

function CampsiteInfo(props) {
	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
            <div className="col">
            <Breadcrumb>
              <BreadcrumbItem> <Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active> {props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
                <h2>{props.campsite.name}</h2>
                <hr />
            </div>
        </div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments comments={props.comments} />
					
				</div>
			</div>
		);
	}
	return <div />
}



 class CommentForm extends Component {
	constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
		this.handleSumit = this.handleSumit.bind(this)
    }

    // creat a method for toggleModal, bind method in the constructor
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

	 // Method to handle form summition, changed the object from event to values
	 handleSumit(values){
    // removed the this.state to values 
    console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
        // we stop refresh the entire page, need to bind this event in the custroctor 
        // removed event.preventDefault(); so redux will handle for us 
}

	render() {
		return (
			<div>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

                    <ModalBody>
						<LocalForm onSubmit={this.handleSumit} >
							<div className="form-group">	
								<Label htmlFor="rating">rating</Label>
								<Control.select model=".rating" id="rating" name="rating" className="form-control" innerRef={input => this.rating = input}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Control.select>
							</div>

							<div className="form-group">
								<Label htmlFor="author">Your Name</Label>
								<Control.text model=".author" id="author" name="author"  className="form-control"
								validators={{
									required, 
									minLength: minLength(2),
									maxLength: maxLength(15)
								}}
							/>
							 <Errors
								className="text-danger"
								model=".author"
								show="touched"
								component="div"
								messages={{
									required: 'Required',
									minLength: 'Must be at least 2 characters',
									maxLength: 'Must be 15 characters or less'
								}}
							/>
							</div>

							<div className="form-group">
								<Label htmlFor="text">Comment</Label>
								<Control.textarea model=".text" id="text" name="text" rows="6" className="form-control" placeholder="text" />
							</div>

							<Button type="submit" value="submit" color="primary">Submit</Button>
						</LocalForm>
                        
                    </ModalBody>
                </Modal>

				<Button outline onClick={this.toggleModal} outline color="secondary" type="submit" ClassName="outline">
			   		<i className="fa fa-pencil fa-lg" /> Submit Comment
		  		 </Button>

			</div>
		)
	};
}







export default CampsiteInfo;