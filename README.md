# Sacramento Shuttle Web App (Vite)

Project React + Vite sẵn để đưa lên GitHub rồi deploy Railway.

## 1) Chạy local

```bash
npm install
npm run dev
```

## 2) Build local

```bash
npm run build
npm run preview
```

## 3) Cấu hình

Copy `.env.example` thành `.env` rồi sửa thông tin:

```bash
cp .env.example .env
```

Quan trọng nhất:
- `VITE_BOOKING_ENDPOINT`
- `VITE_PHONE_RAW`
- `VITE_WHATSAPP_RAW`
- `VITE_BUSINESS_EMAIL`

## 4) Đưa lên GitHub

```bash
git init
git add .
git commit -m "Initial Railway deploy"
```

## 5) Deploy Railway

- Tạo project mới trên Railway
- Chọn **Deploy from GitHub repo**
- Chọn repo này
- Vào **Variables** trên Railway và thêm các biến từ `.env.example`
- Railway sẽ tự build và chạy

## 6) Public domain

- Vào service trên Railway
- Mở tab **Settings / Networking**
- Generate Domain

## Ghi chú

- Form booking và nút test booking gửi POST tới Google Apps Script bằng cách mở tab mới.
- Nếu tab mới trả `ok:true` thì backend đã nhận request.
- Nếu tab mới trả `ok:false` thì kiểm tra lại Apps Script `doPost`.
