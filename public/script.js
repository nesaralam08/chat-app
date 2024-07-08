const socket = io();
socket.on('newuser',(data)=>{
    io.emit('connecteduser',data)
})
socket.on('connecteduser', (data) => {
    const onlineshow = document.getElementById('online-show');
    onlineshow.innerText = `${data} is online.`;
    setTimeout(() => {
        onlineshow.innerText = "";
    }, 3000);
});
// 1110
socket.on('leftuser', (data) => {
    const onlineshow = document.getElementById('online-show');
    if (data!='' && data!=null)
        onlineshow.innerText = `${data} is left.`;
    setTimeout(() => {
        onlineshow.innerText = "";
    }, 3000);
});
socket.on('receiveMessage', (data) => {
    const messageBox = document.getElementById('message-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('me');
    messageElement.innerHTML = `
        <h4>${data.name}</h4>
        <p>${data.message}</p>
    `;
    messageBox.appendChild(messageElement);
});

document.getElementById('submit').addEventListener('click',()=>{
    const userform = document.getElementById('user-form');
    const chatbox = document.getElementById('chat-box');
    userform.style.display = "none";
    chatbox.style.display = "block";
    const nameInput = document.getElementById('name');
    const name = nameInput.value;
    localStorage.setItem('name',name);
    socket.emit('newuser',name)
    nameInput.value = '';
})
document.getElementById('exit')
.addEventListener('click',()=>{
    const userform = document.getElementById('user-form');
    const chatbox = document.getElementById('chat-box');
    userform.style.display = "flex";
    chatbox.style.display = "none";
    let name = localStorage.getItem('name');
    socket.emit('userleft',name)
})
// Nesar Alam
document.getElementById('send-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    const name = localStorage.getItem('name');
    socket.emit('message', { name: name, message: message });
    
    messageInput.value = "";
});
document.getElementById('message').addEventListener('keypress',(event) =>{
    if (event.keyCode === 13) {
        const messageInput = document.getElementById('message');
        const message = messageInput.value;
        const name = localStorage.getItem('name');
        socket.emit('message', { name: name, message: message });
        
        messageInput.value = "";
    }
});
document.getElementById('name').addEventListener('keypress',(event) =>{
    if (event.keyCode === 13) {
        const userform = document.getElementById('user-form');
        const chatbox = document.getElementById('chat-box');
        userform.style.display = "none";
        chatbox.style.display = "block";
        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        localStorage.setItem('name',name);
        socket.emit('newuser',name)
        nameInput.value = '';
    }
});
