const CONNECTION_URL = 'wss://fep-app.herokuapp.com/';

   export default class Chat {
    constructor(config) {
        this.config = config;
    }

    initConnection(name) {
        this.socket = new WebSocket(CONNECTION_URL);

        this.socket.onopen = this.onSocketOpen.bind(this);
        this.socket.onclose = this.onSocketClose.bind(this);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }

    onSocketOpen() {
        //this.send('System', 'New user connected.');
        this.config.onStart && this.config.onStart();
    }

    onSocketClose() {
        console.warn('Disconnected');
        this.initConnection();
    }
    onSocketMessage(e) {
        this.config.onMessage && this.config.onMessage(JSON.parse(e.data));
    }

    send(type, payload) { 
        console.log('sendMessage', type, payload);
        this.socket.send( 
            JSON.stringify({
                type,
                payload,
            })
        );
    }
}
















// // тут вся работа с сетью,

// const CONNECTION_URL = 'wss://fep-app.herokuapp.com/';

// export default class Chat {
//     constructor(config) { // config для того что бы сюда передавать cb, когда будет приходить смс мы будем вызывать onMessage
//         this.config = config;
//     }

//     initConnection(name) { // этот метод вызываем тогда когда подключаемся к серверу
//         this.socket = new WebSocket(CONNECTION_URL);

//         this.socket.onopen = this.onSocketOpen.bind(this);
//         this.socket.onclose = this.onSocketClose.bind(this);
//         this.socket.onmessage = this.onSocketMessage.bind(this);
//     }

//     onSocketOpen() { // как только socket подключился мы отправляем смс о подключении пользователя
//         this.send('System', 'New user connected.');
//     }
//     onSocketClose() {
//         console.warn('Disconnected');
//         this.initConnection(); //выз повторно когда закрывается труба
//     }
//     onSocketMessage(e) {
//         this.config.onMessage && this.config.onMessage(JSON.parse(e.data)); //е это enent socket, а в data хранится смс от пользователя
//     }

//     send(name, message) { 
//         this.socket.send( //как только произошло подключение выз send (оно принимает имя пользователя и msg которое хочет отправить пользователь)
//             JSON.stringify({ // и формируется этот пакет о котором мы договорились
//                 type: 'message',
//                 payload: {
//                     username: name,
//                     message: message,
//                 },
//             })
//         );
//     }
// }
