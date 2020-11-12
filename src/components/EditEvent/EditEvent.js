import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditEvent extends Component {

    state = {
    //    defaultImage: 'https://cdn.onlinewebfonts.com/svg/img_98811.png'
        eventName: this.props.store.temp.name,
        eventAcronym: this.props.store.temp.acronym,
        eventWebsite: this.props.store.temp.website,
        eventRegistration: this.props.store.temp.registration_link,
        eventOAuth: this.props.store.temp.linkedin_oauth,
        campaignStart: this.props.store.temp.start_date,
        campaignEnd: this.props.store.temp.end_date,
    }
   
    editEvent=() =>{
        console.log('clicked save event changes');
        // event.preventDefault();
        // this.props.dispatch({
        //     type: 'UPDATE_EVENT',
        //     payload: this.state
        // })
        //    this.navHome();
    }
    


    navHome=()=>{
        this.props.history.push('/user');
    }
    
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [ propertyName ]: event.target.value
        })
    }

    render(){
        // console.log('recentCard state:',this.state);
        console.log('state is', this.state);
        // console.log('user is:', this.props.store.user);
        console.log('EditEvent props:', this.props);
        return (  
            <div id="editEventDiv">
                
                <h1>Edit Event</h1>
                <h2>Event Title Here</h2>
                
                <label htmlFor='campaignStart'>
                    Event Promotion Start
                    <input
                        type='date'
                        name='campaignStart'
                        required
                        value={this.state.campaignStart.split('T', 1)[0]}
						onChange={(event) => this.handleChange(event, "campaignStart")}
                    />
                </label>

                <label htmlFor='campaignEnd'>
                    Event Promotion End
                    <input
                        type='date'
                        name='campaignEnd'
                        required
                        value={this.state.campaignEnd.split('T', 1)[0]}
						onChange={(event) => this.handleChange(event, "campaignEnd")}
                    />
                </label> 
                <br/>
                
                <label htmlFor="eventType">Event Type:</label>
                <select name="eventType" id="eventType">Event Type
                    <option value="InPerson">In Person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                </select>               
                <hr/>

                <div id="eventPromotionDuration">
                    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Phase Title</th>
                                <th>Phase Start Date</th>
                                <th>Phase End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button>Delete</button> 
                                </td>
                                <td>
                                    <h4>General</h4>
                                </td>
                                <td>
                                    <label htmlFor='phaseStart'>
                                        <input
                                            type='date'
                                            name='phaseStart'
                                            required
                                        />
                                    </label>
                                </td>
                                <td>
                                    <label htmlFor='phaseEnd'>
                                        <input
                                            type='date'
                                            name='phaseEnd'
                                            required
                                        />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <div id="eventSocial">
                    <h4>Event Social</h4>
                    <img src='https://cdn.onlinewebfonts.com/svg/img_98811.png' width='100px'></img><br/>
                    <input placeholder="Event Acronym"></input><br/>
                    <input placeholder="Event Website"></input><br/>
                    <button>Save</button><br/><br/>
                </div>

                <div id="eventCollaborators">
                    <h4>Event Collaborators</h4>

                    <div id="collabOutline">
                        <table >
                            <tbody>
                            <tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr><tr>
                                <td>
                                    <h5> John Smith</h5>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                       
                    </div><br/>
                    <button>Add Collaborator</button><br/><br/>

                </div>


                <div id="eventHashtags">
                    <h4>Event Hashtags</h4>
                    <textarea rows="8">#YOLO, #YOLO</textarea><br/><br/>
                    <button>Save Hashtags</button><br/><br/>
                </div>


                <button onClick={this.navHome}>Home</button>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStoreToProps)(EditEvent);