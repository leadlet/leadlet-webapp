import React from 'react';

const NoteCreated = (props) => (
    <div className="tracking-item">
        <div className="tracking-icon status-intransit">
            <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
            </svg>
        </div>
        <div className="tracking-date">Jul 20, 2018<span>05:25 PM</span></div>
        <div className="tracking-content">Delivery InfoCLOSED-OFFICE/HOUSE CLOSED<span>KUALA LUMPUR (LOGISTICS HUB), MALAYSIA, MALAYSIA</span></div>
    </div>
);

export default NoteCreated;