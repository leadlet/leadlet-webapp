
import {getAllUserByFilterAndReturn} from "../actions/user.actions";
import {getAllPersonByFilterAndReturn} from "../actions/person.actions";
import {getAllOrganizationByFilterAndReturn} from "../actions/organization.actions";
import {getAllDealByFilterAndReturn} from "../actions/deal.actions";

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