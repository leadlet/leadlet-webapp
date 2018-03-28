
import {getAllUserByFilterAndReturn} from "../actions/user.actions";
import {getAllPersonByFilterAndReturn} from "../actions/person.actions";
import {getAllOrganizationByFilterAndReturn} from "../actions/organization.actions";
import {getAllDealByFilterAndReturn} from "../actions/deal.actions";
import {getAllPipelineAndReturn} from "../actions/pipeline.actions";
import {getAllStageReturn} from "../actions/stage.actions";
import {organizationService} from "../services/organization.service";
import {personService} from "../services/person.service";

export function loadUser(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(user => ({value: user.id, label: `${user.firstName} ${user.lastName}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllUserByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadPerson(input, callback, organization) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(person => ({value: person.id, label: person.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    let organizationId = ""

    // TODO ygokirmak
    if( organization !== undefined){
        organizationId = organization.value;
    }

    getAllPersonByFilterAndReturn(`name:${input},organization:${organizationId}`, successCallBack, failCallBack);

};

export function loadOrganization(input, callback, personId) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(org => ({value: org.id, label: org.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    organizationService.getAllOrganization(`name:${input}`, 0, 20)
        .then(
            response => successCallBack(response[0]),
            error => failCallBack(error)
        );


};

export function loadDeal(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(org => ({value: org.id, label: org.title}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllDealByFilterAndReturn(`title:${input}`, successCallBack, failCallBack);

};

export function loadPipeline(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(pipeline => ({value: pipeline.id, label: pipeline.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllPipelineAndReturn(successCallBack, failCallBack);

};

export function loadStage(input, callback, pipeline) {

    if(!pipeline){
        callback(null, {options: []});
    }
    else {
        let successCallBack = (data) => {
            callback(null, {options: data.map(stage => ({value: stage.id, label: stage.name}))});
        };
        let failCallBack = (error) => {
            callback(error, null);
        };

        getAllStageReturn(pipeline.value, successCallBack, failCallBack);

    }

};