// ===========================================
// CONFIG THÔNG TIN CÁ NHÂN - LỜI MỜI TỐT NGHIỆP
// ===========================================
// Chỉnh sửa các thông tin dưới đây để tùy chỉnh lời mời của bạn

const CONFIG = {
    // Thông tin cá nhân (không cần thiết vì sử dụng ảnh card có sẵn)
    personalInfo: {
        // Thông tin đã có trong ảnh card
        cardImage: "images/Card.jpeg" // Đường dẫn đến ảnh card lời mời
    },

    // Thông tin trường học (không cần thiết vì sử dụng ảnh card có sẵn)
    university: {
        // Thông tin đã có trong ảnh card
    },

    // Thông tin sự kiện
    event: {
        title: "LỄ TỐT NGHIỆP",
        titleEn: "Graduation Ceremony",
        year: "2025",
        date: "16:00 27/09/2025",
        location: "Đại học Bách Khoa Hà Nội",
        googleMapsUrl: "https://maps.google.com/?q=Đại+học+Bách+Khoa+Hà+Nội"
    },

    // Thông tin liên hệ
    contact: {
        phone: "0355641490",
        facebookUrl: "https://bitly.li/8vnk", // Thêm link Facebook của bạn ở đây
        email: "your-email@example.com" // Thêm email nếu cần
    },

    // Cài đặt giao diện
    ui: {
        primaryColor: "#FF3B30", // Màu đỏ chính
        secondaryColor: "#50E3C2", // Màu xanh lá
        accentColor: "#FFD700", // Màu vàng
        darkColor: "#28303D", // Màu tối
        lightColor: "#FFFFFF" // Màu sáng
    },

    // Cài đặt responsive
    responsive: {
        mobileBreakpoint: 768, // Điểm chuyển đổi mobile (px)
        tabletBreakpoint: 1024 // Điểm chuyển đổi tablet (px)
    },

    // Cài đặt animation
    animation: {
        enableAnimations: true,
        animationDuration: 300 // Thời gian animation (ms)
    },

    // Cài đặt form
    form: {
        maxMessageLength: 280,
        enableCharacterCount: true,
        enableFormValidation: true
    },

    // Cài đặt API
    api: {
        baseUrl: "http://localhost:8080/api" // Thay đổi nếu API của bạn host ở nơi khác
    }
};

// Export config để sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
