# 🎵 Spotify Clone (Turborepo)

Dự án **Spotify Clone** được xây dựng với:
- **Monorepo**: [Turborepo](https://turbo.build/repo)
- **Backend**: Node.js (Express/NestJS) + MongoDB
- **Frontend**: Next.js (React)
- **Auth**: [Clerk](https://clerk.com/)
- **Cloudinary**: Lưu trữ media (ảnh, nhạc)

---

## 🚀 Cấu trúc dự án
```
.
├── apps
│   ├── backend     # Node.js + MongoDB (API)
│   └── frontend    # Next.js (client)
├── package.json    # Scripts để chạy toàn bộ dự án
├── turbo.json      # Turbo pipeline config
└── README.md
```

---

## ⚙️ Yêu cầu môi trường
- Node.js >= 18
- npm >= 9
- MongoDB (local hoặc Atlas)
- Tài khoản [Clerk](https://clerk.com/) để quản lý user authentication
- Tài khoản [Cloudinary](https://cloudinary.com/) để upload media

---

## 📦 Cài đặt

### 1. Clone project
```bash
git clone https://github.com/quangnguyentan/spotify_clone.git
cd spotify_clone
```

### 2. Cài đặt dependencies
```bash
npm install
```

---

## ⚙️ Cấu hình môi trường

Tạo file `.env` trong thư mục `apps/backend/.env`:

```env
# Server
PORT=8080

# MongoDB
MONGODB_URI=your_mongodb_connection_uri
MONGODB_DB_NAME=spotify_clone

# Clerk (Auth)
CLERK_API_KEY=your_clerk_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

---

## 🚀 Chạy dự án

Chạy tại thư mục root:
```bash
npm run dev
```

- **Backend**: `http://localhost:8080`
- **Frontend**: `http://localhost:3000`

Turbo sẽ tự động chạy song song cả **frontend** và **backend**.

---

## 🖼️ Tích hợp Cloudinary
- Đăng ký tài khoản [Cloudinary](https://cloudinary.com/)
- Lấy `CLOUD_NAME`, `API_KEY`, `API_SECRET`
- Cập nhật vào `apps/backend/.env`

---

## 🔑 Tích hợp Clerk
- Đăng ký tài khoản [Clerk](https://clerk.com/)
- Lấy `CLERK_API_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_FRONTEND_API`
- Cập nhật vào `apps/backend/.env`

---

