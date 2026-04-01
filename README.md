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

## Database Design

ระบบนี้ออกแบบฐานข้อมูลแบบเรียบง่าย (Single Table) เพื่อรองรับการจัดการข้อมูลบุคคล
### Tables

#### 1. PersonInfo

| Column Name | Data Type | Description |
|------------|----------|-------------|
| Id         | int (PK) | รหัสข้อมูลบุคคล (Primary Key, Auto Increment) |
| Name       | string   | ชื่อ |
| LastName   | string   | นามสกุล |
| Address    | string   | ที่อยู่ |
| BirthDate  | datetime | วันเกิด |

---

### Primary Key

- ใช้ `Id` เป็น Primary Key
- เป็น Auto Increment

---

### Data Handling

- `Id` จะถูก Encode เป็น Base64 ก่อนส่งไปยัง Frontend
- เมื่อมีการ Update จะ Decode กลับเป็นค่าเดิมก่อนใช้งาน

---

### Derived Data

- `Age` **ไม่ได้ถูกเก็บในฐานข้อมูล**
- คำนวณจาก: Age = CurrentYear - BirthYear

---

### Notes

- ใช้ SQLite เป็นฐานข้อมูลหลัก
- โครงสร้างถูกออกแบบให้เรียบง่าย เหมาะสำหรับ CRUD application

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
