// ===========================================
// JAVASCRIPT - LỜI MỜI TỐT NGHIỆP
// ===========================================

// Khởi tạo khi DOM đã load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Khởi tạo ứng dụng
function initializeApp() {
    loadConfig();
    setupEventListeners();
    setupAnimations();
    setupFormValidation();
    setupResponsiveFeatures();
}

// Load config và cập nhật giao diện
function loadConfig() {
    if (typeof CONFIG === 'undefined') {
        console.error('Config file not found!');
        return;
    }

    // Cập nhật thông tin cá nhân
    updatePersonalInfo();
    
    // Cập nhật thông tin trường học
    updateUniversityInfo();
    
    // Cập nhật thông tin sự kiện
    updateEventInfo();
    
    // Cập nhật thông tin liên hệ
    updateContactInfo();
    
    // Cập nhật màu sắc
    updateColorScheme();
}

// Cập nhật thông tin cá nhân (không cần thiết vì sử dụng ảnh)
function updatePersonalInfo() {
    // Không cần cập nhật vì sử dụng ảnh có sẵn
    console.log('Sử dụng ảnh card có sẵn, không cần cập nhật thông tin cá nhân');
}

// Cập nhật thông tin trường học (không cần thiết vì sử dụng ảnh)
function updateUniversityInfo() {
    // Không cần cập nhật vì sử dụng ảnh có sẵn
    console.log('Sử dụng ảnh card có sẵn, không cần cập nhật thông tin trường học');
}

// Cập nhật thông tin sự kiện
function updateEventInfo() {
    const elements = {
        'event-title-vi': CONFIG.event.title,
        'event-title-en': CONFIG.event.titleEn,
        'event-year': CONFIG.event.year,
        'time-display': CONFIG.event.date,
        'location-info': CONFIG.event.location,
        'terminal-location': CONFIG.event.location
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Cập nhật thông tin liên hệ
function updateContactInfo() {
    const phoneElement = document.getElementById('phone-number');
    if (phoneElement) {
        phoneElement.textContent = `SDT: ${CONFIG.contact.phone}`;
    }

    const facebookLink = document.getElementById('facebook-link');
    const facebookUrlText = document.getElementById('facebook-url-text');

    if (facebookLink && facebookUrlText && CONFIG.contact.facebookUrl) {
        facebookLink.href = CONFIG.contact.facebookUrl;
        facebookUrlText.textContent = CONFIG.contact.facebookUrl;
    }
}

// Cập nhật màu sắc
function updateColorScheme() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', CONFIG.ui.primaryColor);
    root.style.setProperty('--secondary-color', CONFIG.ui.secondaryColor);
    root.style.setProperty('--accent-color', CONFIG.ui.accentColor);
    root.style.setProperty('--dark-color', CONFIG.ui.darkColor);
    root.style.setProperty('--light-color', CONFIG.ui.lightColor);
}

// Setup event listeners
function setupEventListeners() {
    // Google Maps button
    const mapBtn = document.getElementById('map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', openGoogleMaps);
    }

    // Form buttons
    const acceptBtn = document.getElementById('accept-btn');
    const declineBtn = document.getElementById('decline-btn');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', handleAccept);
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', handleDecline);
    }

    // Character counter
    const messageTextarea = document.getElementById('guest-message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', updateCharacterCount);
    }

    // Form validation
    const nameInput = document.getElementById('guest-name');
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
    }
}

// Mở Google Maps
function openGoogleMaps() {
    if (CONFIG.event.googleMapsUrl) {
        window.open(CONFIG.event.googleMapsUrl, '_blank');
    } else {
        alert('Link Google Maps chưa được cấu hình!');
    }
}

// Xử lý nút Đồng ý
function handleAccept() {
    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();

    if (!name) {
        alert('Vui lòng nhập tên của bạn!');
        document.getElementById('guest-name').focus();
        return;
    }
    
    // Gửi dữ liệu
    sendResponseData(true, name, message);
    
    // Reset form
    resetForm();
}

// Xử lý nút Từ chối
function handleDecline() {
    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();

    if (!name) {
        alert('Vui lòng nhập tên của bạn!');
        document.getElementById('guest-name').focus();
        return;
    }

    // Gửi dữ liệu
    sendResponseData(false, name, message);
    
    // Reset form
    resetForm();
}

// Gửi dữ liệu phản hồi
async function sendResponseData(attending, name, message) {
    const isPublicCheckbox = document.getElementById('is-public');
    
    // Debug logging để kiểm tra checkbox
    console.log('isPublicCheckbox element:', isPublicCheckbox);
    console.log('isPublicCheckbox checked:', isPublicCheckbox ? isPublicCheckbox.checked : 'checkbox not found');
    
    const isPublicValue = isPublicCheckbox ? isPublicCheckbox.checked : true;
    
    const data = {
        name: name,
        content: message,
        isPublic: isPublicValue,
        attending: attending
    };
    
    // Debug logging để kiểm tra dữ liệu gửi đi
    console.log('Data being sent to API:', data);

    try {
        console.log('Sending request to:', `${CONFIG.api.baseUrl}/messages`);
        
        const response = await fetch(`${CONFIG.api.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            // Lấy thêm chi tiết lỗi từ API nếu có
            const errorData = await response.json().catch(() => ({ message: 'Không thể gửi dữ liệu. Vui lòng thử lại.' }));
            throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);
        console.log('isPublic value in response:', result.isPublic);
        
        // Hiển thị thông báo thành công dựa trên phản hồi
        const publicStatus = isPublicValue ? 'công khai' : 'riêng tư';
        if (attending) {
            showNotification(`Cảm ơn bạn đã xác nhận tham dự! 🎉 Lời nhắn của bạn đã được lưu (${publicStatus})`, 'success');
        } else {
            showNotification(`Cảm ơn bạn đã phản hồi! 😊 Lời nhắn của bạn đã được lưu (${publicStatus})`, 'info');
        }

    } catch (error) {
        console.error('API Error:', error);
        // Hiển thị thông báo lỗi cho người dùng
        showNotification(`Lỗi: ${error.message}`, 'error');
    }
}

// Cập nhật đếm ký tự
function updateCharacterCount() {
    const textarea = document.getElementById('guest-message');
    const counter = document.getElementById('char-count');
    
    if (textarea && counter) {
        const count = textarea.value.length;
        const maxLength = CONFIG.form.maxMessageLength || 280;
        
        counter.textContent = count;
        
        // Thay đổi màu sắc khi gần giới hạn
        if (count > maxLength * 0.9) {
            counter.style.color = '#FF3B30';
        } else if (count > maxLength * 0.7) {
            counter.style.color = '#FFA500';
        } else {
            counter.style.color = '#999';
        }
    }
}

// Validate tên
function validateName() {
    const nameInput = document.getElementById('guest-name');
    const name = nameInput.value.trim();
    
    if (name && name.length < 2) {
        showFieldError(nameInput, 'Tên phải có ít nhất 2 ký tự');
        return false;
    }
    
    clearFieldError(nameInput);
    return true;
}

// Hiển thị lỗi field
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#FF3B30';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#FF3B30';
}

// Xóa lỗi field
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e1e5e9';
}

// Reset form
function resetForm() {
    document.getElementById('guest-name').value = '';
    document.getElementById('guest-message').value = '';
    
    // Reset checkbox về trạng thái checked mặc định
    const isPublicCheckbox = document.getElementById('is-public');
    if (isPublicCheckbox) {
        isPublicCheckbox.checked = true;
    }
    
    updateCharacterCount();
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style thông báo
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#34C759' : type === 'error' ? '#FF3B30' : '#50E3C2'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Thêm animation CSS
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Setup animations
function setupAnimations() {
    if (!CONFIG.animation.enableAnimations) return;

    // Bắt đầu animation cho terminal
    animateTerminal();

    // Intersection Observer cho scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Quan sát các elements
    const animatedElements = document.querySelectorAll('.invitation-card, .info-card, .contact-form-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity ${CONFIG.animation.animationDuration}ms ease-out, transform ${CONFIG.animation.animationDuration}ms ease-out`;
        observer.observe(el);
    });
}

// Animation gõ chữ cho terminal
function animateTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    const infoCards = document.querySelectorAll('.info-card');
    const loadingIndicator = document.querySelector('.loading-indicator');

    if (!terminalLines.length || !infoCards.length || !loadingIndicator) return;

    let totalDelay = 500;
    let lastLineDuration = 0;
    let lastLineDelay = 0;

    terminalLines.forEach(line => {
        const text = line.textContent;
        const typingDuration = text.length * 50;
        lastLineDuration = typingDuration;
        lastLineDelay = totalDelay;

        line.style.setProperty('--chars', text.length);

        setTimeout(() => {
            line.style.visibility = 'visible';
            line.classList.add('typing-animation');
            line.style.animationDuration = `${typingDuration}ms`;

            setTimeout(() => {
                line.style.borderRight = 'none';
            }, typingDuration);
            
        }, totalDelay);

        totalDelay += typingDuration + 300;
    });

    // Tính toán thời điểm kết thúc animation cuối cùng
    const finalAnimationEndTime = lastLineDelay + lastLineDuration;

    // Bắt đầu chuỗi animation cho info cards
    setTimeout(() => {
        loadingIndicator.classList.add('visible');

        // Sau 2 giây, ẩn loading và hiện cards
        setTimeout(() => {
            loadingIndicator.classList.remove('visible');

            // Hiện các card tuần tự
            let cardDelay = 300; // Đợi loading mờ đi
            infoCards.forEach(card => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, cardDelay);
                cardDelay += 200; // Mỗi card cách nhau 0.2s
            });

        }, 2000); // Thời gian hiển thị loading

    }, finalAnimationEndTime + 500); // Bắt đầu sau khi terminal kết thúc 0.5s
}

// Setup form validation
function setupFormValidation() {
    if (!CONFIG.form.enableFormValidation) return;

    const form = document.querySelector('.form-container');
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.id === 'guest-name') {
                validateName();
            }
        });
    });
}

// Setup responsive features
function setupResponsiveFeatures() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Initial call
    handleResize();
}

// Handle window resize
function handleResize() {
    const width = window.innerWidth;
    const isMobile = width <= CONFIG.responsive.mobileBreakpoint;
    const isTablet = width <= CONFIG.responsive.tabletBreakpoint && width > CONFIG.responsive.mobileBreakpoint;

    // Update body class for responsive styling
    document.body.className = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    // Adjust photo container size on mobile
    const photoContainer = document.querySelector('.photo-container');
    if (photoContainer) {
        if (isMobile) {
            photoContainer.style.width = '120px';
            photoContainer.style.height = '120px';
        } else if (isTablet) {
            photoContainer.style.width = '150px';
            photoContainer.style.height = '150px';
        } else {
            photoContainer.style.width = '200px';
            photoContainer.style.height = '200px';
        }
    }
}

// Utility functions
const utils = {
    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        loadConfig,
        showNotification,
        utils
    };
}
