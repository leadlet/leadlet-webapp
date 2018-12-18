import {getAllUserByFilterAndReturn} from "../actions/user.actions";
import {getAllProductByFilterAndReturn} from "../actions/product.actions";
import {getAllSourceByFilterAndReturn} from "../actions/source.actions";
import {getAllPersonByFilterAndReturn} from "../actions/person.actions";
import {getAllDealByFilterAndReturn, getAllLostReasonByFilterAndReturn} from "../actions/deal.actions";
import {getAllPipelineAndReturn} from "../actions/pipeline.actions";
import {getAllStageReturn} from "../actions/stage.actions";
import {getAllChannelByFilterAndReturn} from "../actions/channel.actions";

export function loadUser(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(user => ({value: user.id, label: `${user.firstName} ${user.lastName}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllUserByFilterAndReturn(`*${input}*`, successCallBack, failCallBack);

};

export function loadLostReason(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(reason => ({value: reason.id, label: `${reason.name}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllLostReasonByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadProduct(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(product => ({value: product.id, label: `${product.name}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllProductByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadSource(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(source => ({value: source.id, label: `${source.name}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllSourceByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadChannel(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(channel => ({value: channel.id, label: `${channel.name}`}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllChannelByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

};

export function loadPerson(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(person => ({value: person.id, label: person.name}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };


    getAllPersonByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

}

export function loadDeal(input, callback) {

    let successCallBack = (data) => {
        callback(null, {options: data.map(org => ({value: org.id, label: org.title}))});
    };
    let failCallBack = (error) => {
        callback(error, null);
    };

    getAllDealByFilterAndReturn(`title:${input}`, successCallBack, failCallBack);

}

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