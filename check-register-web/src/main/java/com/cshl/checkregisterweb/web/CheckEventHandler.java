package com.cshl.checkregisterweb.web;

import com.cshl.checkregisterweb.model.CheckEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler
public class CheckEventHandler {

    private final SimpMessagingTemplate websocket;

    @Autowired
    public CheckEventHandler(SimpMessagingTemplate websocket){
        this.websocket = websocket;
    }

    @HandleAfterCreate
    public void newCheck(CheckEntity checkEntity){
        System.out.println("Inside websocket HandleAfterCreate");
        this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX + "/newCheck", "");
    }

    @HandleAfterSave //this isn't actually working; see plan.txt in frontend
    public void updateCheck(CheckEntity checkEntity){
        System.out.println("Inside websocket HandleAfterSave");
        this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX + "/updateCheck", "");
    }

    @HandleAfterDelete
    public void deleteCheck(CheckEntity checkEntity){
        System.out.println("Inside websocket HandleAfterDelete");
        this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX + "/deleteCheck", "");
    }
}
