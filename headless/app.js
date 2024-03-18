//Create an array where the message along with it's ID will be stored.
let messageOut = [];
let messageIn = [];
// if we want color to be changed from Genesys and other features such as co-browse
function getConfig(){
    Genesys("registerPlugin", "Plugin", function(Plugin) {
        Plugin.command("GenesysJS.configuration").then( (data) => { console.log("Deployment configuration", data)} );
      });
};

// This fuction will enables us to add the message to the DOM
function addMessage(text){
    //Object where message will be stored
    const chat = {
        text,
        id: Date.now()
    }

    // render msg
    messageOut.push(chat);
    const list = document.querySelector('.messagesOut');
    list.insertAdjacentHTML('beforeend', 
        `<p class="message-item" data-key="${chat.id}">
            <span>${chat.text}</span>
        </p>`

    );

    Genesys("command", "MessagingService.sendMessage", {
        message: chat.text
    },
        function() {
            /*fulfilled callback*/
        },
        function() {
            /*rejected callback*/
        }
    );
}

function receiveMessage(chat){
    /*const chat = {
        text,
        id: Date.now()
    }*/
    if (chat.direction=="Outbound"){
    messageIn.push(chat);
    const list = document.querySelector('.messagesIn');
    list.insertAdjacentHTML('beforeend', 
        `<p class="message-item" data-key="${chat.id}">
            <span>${chat.text}</span>
        </p>`

    );
    }
}

//Create event listener to detect when a message has been submitted
const form = document.querySelector('.message-form');
form.addEventListener('submit', event => {
    event.preventDefault();

    //input to save the message itself
    const input = document.querySelector('.typedMessage');

    //This helps us to detect empty messages and ignore them
    const text = input.value.trim();

    if(text !== ''){
        addMessage(text);
        input.value = '';
        input.focus();

    }
});

Genesys("subscribe", "MessagingService.messagesReceived", function({ data }) {
    console.log("********************");
    console.log(data);

    for(let i =0; i < data.messages.length; ++i){
        console.log("msg sent to fun" + data.messages[i])
        receiveMessage(data.messages[i]);
    }

});