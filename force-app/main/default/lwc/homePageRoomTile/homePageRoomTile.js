import { api, LightningElement } from 'lwc';

export default class HomePageRoomTile extends LightningElement {
    @api freeBeds;
    @api roomNumber;
    @api typeRoom;
    @api room;
}