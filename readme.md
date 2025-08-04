# CDIMEX QR Code Generator

Ứng dụng tạo QR code đơn giản và hiệu quả với hai chức năng chính:

## 🚀 Tính năng

### 1. URL QR Code Generator (`index.html`)
- Tạo QR code cho URL website
- Tùy chỉnh kích thước QR code
- Tải xuống QR code dưới dạng hình ảnh PNG

### 2. WiFi QR Code Generator (`wifi.html`) ⭐ MỚI
- Tạo QR code cho WiFi với khả năng tự động kết nối
- Hỗ trợ các loại bảo mật: WPA/WPA2/WPA3, WEP, và không bảo mật
- Hỗ trợ WiFi ẩn (Hidden SSID)
- Khi quét QR code, điện thoại sẽ tự động kết nối vào WiFi với mật khẩu đã cấu hình

## 📱 Cách sử dụng WiFi QR Code

1. **Truy cập trang WiFi QR Code**: Mở `wifi.html`
2. **Nhập thông tin WiFi**:
   - Tên WiFi (SSID)
   - Mật khẩu (nếu có)
   - Loại bảo mật
   - Chọn nếu WiFi ẩn
3. **Tạo QR Code**: Nhấn "Tạo WiFi QR Code"
4. **Quét và kết nối**: Sử dụng camera điện thoại quét QR code để tự động kết nối WiFi

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS
- **QR Code Library**: qrcodejs
- **Font**: Poppins (Google Fonts)

## 📁 Cấu trúc dự án

```
qr/
├── index.html          # Trang chính - URL QR Code
├── wifi.html           # Trang WiFi QR Code
├── js/
│   ├── script.js       # Logic cho URL QR Code
│   └── wifi.js         # Logic cho WiFi QR Code
├── img/
│   ├── logocdimex-removebg-preview.png
│   ├── qr-code.svg
│   ├── screen.png
│   └── spinner.svg
└── README.md
```

## 🔧 Cài đặt và chạy

1. Clone hoặc tải xuống dự án
2. Mở file `index.html` trong trình duyệt
3. Hoặc sử dụng local server:
   ```bash
   # Sử dụng Python
   python -m http.server 8000
   
   # Sử dụng Node.js
   npx serve .
   ```

## 📋 Định dạng WiFi QR Code

QR code WiFi sử dụng định dạng chuẩn:
```
WIFI:S:<SSID>;T:<WPA|WEP|nopass>;P:<password>;H:<true|false>;;
```

Ví dụ:
- WiFi thường: `WIFI:S:MyWiFi;T:WPA;P:mypassword123;;`
- WiFi không mật khẩu: `WIFI:S:OpenWiFi;T:nopass;;`
- WiFi ẩn: `WIFI:S:HiddenWiFi;T:WPA;P:password;H:true;;`

## 🎨 Giao diện

- Thiết kế responsive, tương thích với mobile và desktop
- Giao diện hiện đại với gradient và animation
- UX thân thiện với người dùng
- Hỗ trợ tiếng Việt

## 📄 License

© 2024 CDIMEX - QR Code Generator
