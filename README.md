# 🎓 Trang Web Lời Mời Tốt Nghiệp

Một trang web responsive đẹp mắt để gửi lời mời tốt nghiệp, được thiết kế dựa trên layout mẫu với 3 khối chính trong 1 trang.

## ✨ Tính năng

- **Responsive Design**: Tối ưu cho cả mobile và desktop
- **Tùy chỉnh dễ dàng**: Chỉnh sửa thông tin trong file `config.js`
- **Giao diện đẹp**: Thiết kế hiện đại với gradient và animation
- **Form tương tác**: Form nhập tên và lời nhắn với validation
- **Tích hợp Google Maps**: Nút xem địa điểm trên Google Maps
- **Animation mượt**: Hiệu ứng fade-in và hover đẹp mắt

## 📁 Cấu trúc thư mục

```
FrontEnd/
├── index.html          # File HTML chính
├── styles.css          # File CSS responsive
├── script.js           # File JavaScript xử lý logic
├── config.js           # File cấu hình thông tin cá nhân
├── images/             # Thư mục chứa hình ảnh
│   ├── bach-khoa-logo.png
│   └── graduate-photo.jpg
└── README.md           # File hướng dẫn này
```

## 🚀 Cách sử dụng

### 1. Chuẩn bị hình ảnh

Đặt các hình ảnh sau vào thư mục `images/`:
- `bach-khoa-logo.png`: Logo trường Đại học Bách Khoa Hà Nội
- `graduate-photo.jpg`: Ảnh của bạn (hình tròn, kích thước khuyến nghị 400x400px)

### 2. Tùy chỉnh thông tin

Mở file `config.js` và chỉnh sửa các thông tin:

```javascript
const CONFIG = {
    // Thông tin cá nhân
    personalInfo: {
        name: "TÊN CỦA BẠN",
        major: "CHUYÊN NGÀNH",
        degree: "Tân kỹ sư / cử nhân",
        personalMessage: "Lời nhắn cá nhân của bạn...",
        photo: "images/graduate-photo.jpg"
    },
    
    // Thông tin trường học
    university: {
        name: "TÊN TRƯỜNG",
        nameEn: "UNIVERSITY NAME",
        logo: "images/bach-khoa-logo.png"
    },
    
    // Thông tin sự kiện
    event: {
        title: "LỄ TỐT NGHIỆP",
        titleEn: "Graduation Ceremony",
        year: "2025",
        date: "16:00 27/09/2025",
        location: "Địa điểm tổ chức",
        googleMapsUrl: "https://maps.google.com/?q=địa+điểm"
    },
    
    // Thông tin liên hệ
    contact: {
        phone: "SỐ ĐIỆN THOẠI",
        email: "email@example.com"
    }
};
```

### 3. Chạy trang web

Mở file `index.html` trong trình duyệt web hoặc sử dụng local server:

```bash
# Sử dụng Python (nếu có)
python -m http.server 8000

# Hoặc sử dụng Node.js (nếu có)
npx serve .

# Hoặc mở trực tiếp file index.html
```

## 🎨 Tùy chỉnh giao diện

### Màu sắc

Trong file `config.js`, bạn có thể thay đổi màu sắc:

```javascript
ui: {
    primaryColor: "#FF3B30",    // Màu đỏ chính
    secondaryColor: "#50E3C2",  // Màu xanh lá
    accentColor: "#FFD700",     // Màu vàng
    darkColor: "#28303D",       // Màu tối
    lightColor: "#FFFFFF"       // Màu sáng
}
```

### Responsive

Trang web tự động responsive với các breakpoint:
- **Mobile**: ≤ 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: > 1024px

## 📱 Tính năng responsive

- **Mobile**: Layout dọc, font size nhỏ hơn, padding giảm
- **Tablet**: Layout linh hoạt, kích thước trung bình
- **Desktop**: Layout đầy đủ với hiệu ứng đẹp nhất

## 🔧 Tính năng JavaScript

- **Form validation**: Kiểm tra tên và giới hạn ký tự
- **Character counter**: Đếm ký tự trong textarea
- **Google Maps integration**: Mở địa điểm trên Google Maps
- **Responsive handling**: Tự động điều chỉnh theo kích thước màn hình
- **Animation**: Hiệu ứng fade-in khi scroll
- **Notification**: Thông báo khi submit form

## 📝 Lưu ý

1. **Hình ảnh**: Đảm bảo ảnh có chất lượng tốt và kích thước phù hợp
2. **Google Maps**: Cập nhật link Google Maps chính xác
3. **Thông tin**: Kiểm tra kỹ tất cả thông tin trước khi sử dụng
4. **Testing**: Test trên nhiều thiết bị khác nhau

## 🎯 Cách tùy chỉnh nâng cao

### Thay đổi font chữ

Trong file `styles.css`, tìm và thay đổi:

```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Thêm animation

Trong file `config.js`:

```javascript
animation: {
    enableAnimations: true,
    animationDuration: 300 // Thời gian animation (ms)
}
```

### Tùy chỉnh form

```javascript
form: {
    maxMessageLength: 280,
    enableCharacterCount: true,
    enableFormValidation: true
}
```

## 🚀 Deploy

Để deploy lên web hosting:

1. Upload tất cả files lên server
2. Đảm bảo đường dẫn hình ảnh chính xác
3. Test trên nhiều thiết bị
4. Cập nhật thông tin liên hệ

## 📞 Hỗ trợ

Nếu có vấn đề gì, hãy kiểm tra:
1. Console trong Developer Tools (F12)
2. Đường dẫn hình ảnh có đúng không
3. File config.js có lỗi syntax không
4. Trình duyệt có hỗ trợ JavaScript không

---

**Chúc mừng tốt nghiệp! 🎉**
