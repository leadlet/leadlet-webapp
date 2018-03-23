
import {getAllUserByFilterAndReturn} from "../actions/user.actions";
import {getAllPersonByFilterAndReturn} from "../actions/person.actions";
import {getAllOrganizationByFilterAndReturn} from "../actions/organization.actions";
import {getAllDealByFilterAndReturn} from "../actions/deal.actions";
import {getAllPipelineAndReturn} from "../actions/pipeline.actions";
import {getAllStageReturn} from "../actions/stage.actions";

export function loadUser(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(user => ({value: user.id, label: `${user.firstName} ${user.lastName}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllUserByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadPerson(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(person => ({value: person.id, label: person.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllPersonByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadOrganization(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(org => ({value: org.id, label: org.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllOrganizationByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

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

export function loadStage(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(stage => ({value: stage.id, label: stage.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllStageReturn(successCallBack, failCallBack);

};