import './styles.css';

import $ from 'jquery';
import Chat from './Chat';

const talk = new Chat({
    onMessage: addCircle, 
    onStart: addMyCircle,
});

const $otherCircles = [];

const $container = $('#container');
const $colorInput = $('#color');
const $sizeInput = $('#size');

const $myCircle = {
    id:  Date.now(),
    size: $sizeInput.val() ? parseInt($sizeInput.val()) : 50,
    color: $colorInput.val() ? $colorInput.val() : "red",
    top: 100,
    left: 50
}

$('body').on('click', onBodyClick);

function onBodyClick(e) {
    console.log('11111', e.target.nodeName); // возвращает имя текущего узла и возвращает его
    
    //$('#'+$circleElId).css({ top:  e.pageY, left: e.pageX });
    if (e.target.nodeName == 'DIV') {
        $myCircle.top = e.pageY;
        $myCircle.left = e.pageX;
        $myCircle.size = parseInt($sizeInput.val());
        $myCircle.color = $colorInput.val();
        //updateCircle($myCircle); // Не обязательно
        sendMessage('update', $myCircle);
    }
}


talk.initConnection();

function addMyCircle () {
    console.log('addMyCircle')
    sendMessage('add', $myCircle)
}


function addCircle({ payload }) { 
    if ($otherCircles.indexOf(payload.id) > -1) { // прилетел уже известный шарик
        updateCircle(payload)
    } else if (payload.id) { // новый шарик
        initNewCircle($container, payload)
    }
    
    console.log('$otherCircles', $otherCircles)
    console.log('payload', payload);
    
}

function initNewCircle (container, circle) {
    console.log('initNewCircle',circle)
    const newCircle = $('<div></div>');
    newCircle.addClass('circle');
    newCircle.attr("id", circle.id);
    newCircle.css("height", parseInt(circle.size));
    newCircle.css("width", parseInt(circle.size));
    newCircle.css('background-color', circle.color);
    newCircle.css({ top: parseInt(circle.top), left: parseInt(circle.left) });
    container.append(newCircle);
    $otherCircles.push(circle.id);
}

function updateCircle(circle) {

  //$circle.css(`left`, payload.left - parseInt(payload.size) / 2);
  //$circle.css(`top`, payload.top - parseInt(payload.size) / 2);
    $('#'+circle.id)
    .css({ top: parseInt(circle.top), left: parseInt(circle.left) })
    .css("height", parseInt(circle.size))
    .css("width", parseInt(circle.size))
    .css('background-color', circle.color);
}

function sendMessage(type, payload) { 
    talk.send(type, payload);
}



// import './style.css';

// import $ from 'jquery';
// import Chat from './Chat';

// const talk = new Chat({ //talk это обьект который отвечает за
//     onMessage: addLog, //в talk  мы передали config , когда  приходит новое смс выз мотод onMessage в котором есть ф-я addLog и она вызывается
// });

// const $log = $('#log'); //полностью весь контейнер
// const $messageInput = $('#message');
// const $authorInput = $('#author'); // имя пользователя который отправл смс

// $('#chatForm').on('submit', (e) => { //chatForm вся форма
//     e.preventDefault();
//     sendMessage(); // когда кликрули по форме формируется отправка смс
// });

// talk.initConnection();

// function addLog({ payload }) { //payload это обьект который хранит в себе username и massage
//     const $message = $(`<div>${payload.username}: ${payload.message}</div>`); // сощдали ДОМ елемент в дереве
//     $log.append($message); //поместили его в контейнер для общего чата
//     setTimeout(() => { //возвели в setTimeout для только что бы выполнилась асинхронно, она попадает в web API , для анимации, плавное появления которое мы стилизовали в css
//         $message.addClass('message'); // класс для стилизации
//     });
// }

// function sendMessage() { //
//     talk.send($authorInput.val(), $messageInput.val()); //send это ф-я, а не метод websocket, первым передаем имя, потом смс 
//     $messageInput.val(''); //затем обнуляем строку для ввода смс
// }
