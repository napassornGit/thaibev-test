# Person Info Management System

ระบบจัดการข้อมูลบุคคล (Person Info) พัฒนาโดยใช้  
- Backend: ASP.NET Core Web API (.NET 9)  
- Frontend: Angular + Angular Material  

---

## Features

- แสดงรายการข้อมูลบุคคล (Table)
- เพิ่มข้อมูลบุคคล
- ดูรายละเอียดข้อมูล
- แก้ไขข้อมูล
- คำนวณอายุ (ปีปัจจุบัน - ปีเกิด)
- เข้ารหัส Id (Base64)

---

## Tech Stack

### Backend
- .NET 9 (ASP.NET Core Web API)
- Entity Framework Core
- SQLite

### Frontend
- Angular
- Angular Material
- Bootstrap (Grid Layout)

---

## 📂 Project Structure
backend/
├── Data/
├── Models/
├── Services/
├── Controllers/

frontend/
├── components/
├── services/
├── models/


---

## Installation

### Backend
- cd backend
- dotnet restore
- dotnet run

### Frontend
- cd frontend
- npm install
- ng serve

---
