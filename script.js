document.getElementById('questionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const question = document.getElementById('question').value;
    if (question) {
        fetch('http://localhost:5001/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('answer').innerText = data.answer;
            addToHistory(question, data.answer);
        })
        .catch(error => console.error('Error:', error));
    }
});

function addToHistory(question, answer) {
    fetch('http://localhost:5002/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question, answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        loadHistory();
    })
    .catch(error => console.error('Error:', error));
}

function loadHistory() {
    fetch('http://localhost:5002/history')
    .then(response => response.json())
    .then(data => {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.question} - ${item.answer} 
            <button class="edit-btn" data-id="${item.id}" onclick="editHistory(${item.id}, '${item.question}', '${item.answer}')">Editar</button>
            <button class="delete-btn" onclick="deleteHistory(${item.id})">Excluir</button>`;
            historyList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteHistory(id) {
    fetch(`http://localhost:5002/history/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        loadHistory();
    })
    .catch(error => console.error('Error:', error));
}

function editHistory(id, question, answer) {
    document.getElementById('question').value = question;
    document.getElementById('answer').innerText = answer;
    document.getElementById('questionForm').dataset.editId = id;
}

function updateHistory(id, question, answer) {
    fetch(`http://localhost:5002/history/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question, answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('questionForm').dataset.editId = '';
        document.getElementById('question').value = '';
        document.getElementById('answer').innerText = '';
        loadHistory();
    })
    .catch(error => console.error('Error:', error));
}

// Carregar histórico ao iniciar a página
document.addEventListener('DOMContentLoaded', loadHistory);
