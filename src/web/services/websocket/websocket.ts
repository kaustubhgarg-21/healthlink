
import socketIOClient,{ io, Manager, ManagerOptions } from 'socket.io-client';
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";

export const _manager = new Manager(getAPIBaseUrl(PortalModule.WEB_SOCKET), {
    // reconnectionDelayMax: 10000,
    autoConnect: true
    
});

export const _io = socketIOClient;
export const _url = getAPIBaseUrl(PortalModule.WEB_SOCKET);