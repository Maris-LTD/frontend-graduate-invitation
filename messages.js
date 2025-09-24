// messages.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Starting message fetch process...");
    fetchAndDisplayMessages();
});

async function fetchAndDisplayMessages() {
    console.log("fetchAndDisplayMessages function called.");
    const messagesContainer = document.querySelector('.messages-container');
    let apiMessages = [];

    try {
        if (typeof CONFIG === 'undefined' || !CONFIG.api || !CONFIG.api.baseUrl) {
            throw new Error('Cấu hình API (CONFIG.api.baseUrl) không được tìm thấy.');
        }

        const apiUrl = `${CONFIG.api.baseUrl}/messages/public`;
        console.log(`Đang gọi API tại: ${apiUrl}`);

        // Thay đổi endpoint theo đúng docs API
        const response = await fetch(apiUrl);
        console.log("API response received:", response);


        if (response.ok) {
            apiMessages = await response.json();
            console.log("Lấy dữ liệu API thành công:", apiMessages);
        } else {
            console.warn(`API không phản hồi thành công (status: ${response.status}). Sẽ sử dụng dữ liệu mẫu.`);
        }

    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        console.warn('Do lỗi API, sẽ chuyển sang sử dụng dữ liệu mẫu.');
    }

    // Lấy tin nhắn mẫu từ config
    const sampleMessages = (CONFIG && Array.isArray(CONFIG.messages)) ? CONFIG.messages : [];
    
    // Kết hợp tin nhắn từ API và tin nhắn mẫu (ưu tiên API)
    // Loại bỏ tin nhắn trùng lặp dựa trên content
    const allMessages = [...apiMessages, ...sampleMessages];
    const uniqueMessages = allMessages.filter((message, index, self) =>
        index === self.findIndex((m) => m.content === message.content)
    );

    if (uniqueMessages.length > 0) {
        displayMessages(uniqueMessages);
    } else {
        displayNoMessagesInfo(messagesContainer, 'Hiện tại chưa có lời nhắn nào.');
    }
}

function displayMessages(messages) {
    const messagesContainer = document.querySelector('.messages-container');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA', '#FF8C42', '#A9F0D1'];

    messages.forEach((msg, index) => {
        // Đổi tên thuộc tính 'name' thành 'author' để phù hợp với hàm createMessageCard
        const messageData = { author: msg.name, content: msg.content };
        const card = createMessageCard(messageData, index, colors);
        messagesContainer.appendChild(card);
        animateCard(card);
    });
}


function createMessageCard(msg, index, colors) {
    const card = document.createElement('div');
    card.className = 'message-card';
    
    // Nội dung card
    card.innerHTML = `
        <div class="message-author" style="color: ${colors[index % colors.length]}">${msg.author}</div>
        <div class="message-content">${msg.content}</div>
    `;
    
    // Set màu border top
    card.style.borderTopColor = colors[index % colors.length];

    // Set vị trí ban đầu ngẫu nhiên trong container
    const container = document.querySelector('.messages-container');
    const cardWidth = 250 + 40; // width + padding
    const cardHeight = 150; // Ước tính chiều cao
    
    const maxLeft = Math.max(0, container.offsetWidth - cardWidth);
    const maxTop = Math.max(0, container.offsetHeight - cardHeight);

    card.style.left = `${Math.random() * maxLeft}px`;
    card.style.top = `${Math.random() * maxTop}px`;
    card.style.zIndex = index;

    return card;
}

function animateCard(card) {
    const container = card.parentElement;
    let speedX = (Math.random() - 0.5) * 1.2; // Tăng tốc độ
    let speedY = (Math.random() - 0.5) * 1.2; // Tăng tốc độ

    function move() {
        if (!card.parentElement) return; // Dừng animation nếu card bị xóa

        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        let currentLeft = card.offsetLeft;
        let currentTop = card.offsetTop;

        // Đảo chiều khi chạm cạnh container
        if (currentLeft <= 10 && speedX < 0) {
            speedX *= -1;
        }
        if (currentLeft + cardWidth >= containerWidth - 10 && speedX > 0) {
            speedX *= -1;
        }
        if (currentTop <= -5 && speedY < 0) {
            speedY *= -1;
        }
        if (currentTop + cardHeight >= containerHeight + 5 && speedY > 0) {
            speedY *= -1;
        }
        
        // Cập nhật vị trí
        card.style.left = `${currentLeft + speedX}px`;
        card.style.top = `${currentTop + speedY}px`;
        
        // Chỉ gọi lại animation frame nếu card vẫn còn trong DOM
        if (card.closest('body')) {
            requestAnimationFrame(move);
        }
    }

    // Đảm bảo card nằm hoàn toàn trong container trước khi bắt đầu
    card.style.left = Math.max(0, Math.min(card.offsetLeft, container.offsetWidth - card.offsetWidth)) + 'px';
    card.style.top = Math.max(0, Math.min(card.offsetTop, container.offsetHeight - card.offsetHeight)) + 'px';

    move();
}

function displayNoMessagesInfo(container, text = 'Hiện tại chưa có lời nhắn nào được hiển thị.') {
    const info = document.createElement('p');
    info.textContent = text;
    info.style.textAlign = 'center';
    info.style.fontSize = '1.2rem';
    info.style.marginTop = '50px';
    container.appendChild(info);
}
