'use strict';

const SockJS = require('sockjs-client');
const Stomp = require('stompjs');

function register(registrations){
    const socket = SockJS('/checkregister');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        registrations.forEach((registration) => {
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register