import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

function* createEvent(action) {
  console.log('creating event with', action);
  yield axios({
      method: 'POST',
      url: '/api/event',
      data: action.payload
  });
  yield put ({
      type: 'GET_EVENT'
  })
}

function* getEvent(){
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        console.log('config is:', config);
        const response = yield axios.get('api/event', config);

        console.log('back from GET with:', response.data);
        yield put({ type: 'SET_EVENT', payload: response.data});
    }catch (error){
        console.log('GET event request failed,', error);
    }
}

function* getUserEvent(action){
    console.log('grabbing all of this users events:')
    let response = yield axios({
        method: 'GET',
        url: 'api/user_event'
    })
    console.log('back from get user_event with:', response.data.reverse());
    yield put({
        type: 'SET_USER_EVENTS',
        payload: response.data
    })
}

function* updateEvent(action){
    //console.log('updating event, sending:', action.payload);

    let updatedEvent = yield select(state => state.temp);
    console.log('updating event, sending:', updatedEvent);
    let response = yield axios({
        method: 'PUT',
        url: `api/event/${updatedEvent.id}`,
        data: updatedEvent,
    }) // no yield put in place yet to update Edit page, but somehow the
       // temp reducer and edit page local state are being updated...
       // is this a result of React re-rendering on variable changes default setting?
}

function* updateTempEvent(action){
    //let updatedEvent = yield select(state => state.tempPhase);
    //console.log('updatedEvent', updatedEvent);
    console.log('updateTempEvent action.payload', action.payload);
    let response = yield axios({
        method: 'PUT',
        url: `api/tempEvent/${action.payload}`,
        data: action.payload
    })
    yield put({
        type: 'SET_TEMP',
        payload: response.data
    })
}

function* getActiveEvent(action){
    //console.log('in getTempPhase', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/event/${action.payload}`,
    })
    yield put({ type: 'UPDATE_ACTIVE_EVENT', payload: response.data });
}


function* addCollaborator(action) {
    console.log('creating event with', action);
    let response = yield axios({
        method: 'POST',
        url: '/api/event/addCollaborator',
        data: action.payload
    });
    console.log('response from addCollaborator', response.data);
    // yield put ({
    //     type: 'SET_COLLABORATORS'
    // })
}
//then this needs to call GET_COLLABORATORS which will then call SET_COLLABORATORS
//getCollaborators
function* getCollaborators(action) {
    console.log('in get collaborators with', action.payload);
    const collaborationId = Number(action.payload);
    console.log(collaborationId);
    let response = yield axios({
        method: 'GET',
        url: `/api/event/geteventcollaborators/${collaborationId}`,
    });
    yield put({ type: 'SET_COLLABORATORS', payload: response.data });
    
}

function* deleteCollaborator(action) {
    console.log('in deleteCollaborator collaborator with', action.payload.collaborator.event_id);
    const collaborationId = Number(action.payload.collaborator.event_id)
    let response = yield axios({
        method: 'DELETE',
        url: `/api/event/deletecollaborator/${collaborationId}`,
    });
    // yield put({ type: 'SET_COLLABORATORS', payload: response.data });
    
}





//geteventcollaborators/:id will be GET_COLLABORATORS
function* eventSaga() {
  yield takeLatest('CREATE_EVENT', createEvent);
  yield takeLatest('GET_EVENT', getEvent);
  yield takeLatest('GET_USER_EVENT', getUserEvent);
  yield takeLatest('UPDATE_EVENT', updateEvent);
  yield takeLatest('GET_TEMP_EVENT', updateTempEvent);
  yield takeLatest('GET_ACTIVE_EVENT', getActiveEvent);

  yield takeLatest('ADD_COLLABORATOR', addCollaborator);
  yield takeLatest('GET_COLLABORATORS', getCollaborators);
  yield takeLatest('DELETE_COLLABORATOR', deleteCollaborator);

  

}

export default eventSaga;
