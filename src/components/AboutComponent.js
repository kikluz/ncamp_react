import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
// import { Partners } from '../redux/partners';
import { Loading } from './LoadingComponent';

// In the RenderPartner component, update the src attribute for the Media object to use the baseUrl
// src={baseUrl + item.image} alt={item.name}
function RenderPartner({partner}) {
    if(partner){

        return (
            <React.Fragment>
                <Media object src={baseUrl + partner.image } alt={partner.name} width="150" />
                <Media body className="ml-5 mb-4">
                    <Media heading >
                        { partner.name} 
                    </Media>
                        {partner.description}
                </Media>
            </React.Fragment>
        );
    }
    return (
     <div />
    )
}

// Create a new functional component named PartnerList that takes props as its argument. 
// Take the declaration of const partners from the top of the About component and move it into this component.
// -------------------------------------------------------
// Under this, write an if statement to handle if the partners data is loading by returning the <Loading /> component.
// It should only return the <Loading /> component and nothing else.
// -------------------------------------------------------------------------
// write an if statement to handle if there was an error message while trying to load, return a div with 
// the className of "col". Inside this div should be an h4 element that contains the error message.
// -----------------------------------------------------------------------------------
function PartnerList(props) {

    const partners = props.partners.partners.map(partner => {

        return (
            <Media tag="li" key={partner.id}> 
                <RenderPartner partner={partner} />
            </Media>
        );
    })

    if(props.partners.isLoading) {
        return (
            <div className="container">
            <div className="row">
                <Loading /> 
            </div>
        </div>
        );
    }

    if(props.partners.errMess){
        return (
            <div className="conatiner">
                <div className="row">
                    <div className="col">
                        <h4>{props.partners.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
// Under this, outside of any if statement, return a div with the className of "col mt-4".
// Inside this div, put a Media element with the "list" attribute. Inside this, embed the partners variable.
    return (
        <div className="col mt-4">
            <Media list>
                {partners}
            </Media>
        </div>
    )
        
}


function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
               <PartnerList partners={props.partners}/>
            </div>
        </div>
    );
}

export default About;