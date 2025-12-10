# แบบทดสอบ Technical Skill [ชุดที่ 7] Thaibev

## Fratures
- เพิ่ม / ลบ / ค้นหาสินค้า
- Validate รหัสสินค้าแบบ 6 กลุ่ม ตัวอักษรพิมพ์ใหญ่และตัวเลข คามยาว 30 ตัวอักษร โดยรหัสสินค้าห้ามซ้ำกัน
- ใช้ Entity Framework Core + SQLite
- มีไฟล์ฐานข้อมูลจริง (app.db) ขนาดเล็กสำหรับทดสอบ
- แสกน QRCode ได้
  > ใช้โปรแกรมนอกแสกน QR จะได้เป็น url จากนั้นเปิด url นั้น
  > แก้ไขจากการ link ไปที่ localhost เป็น IP จากนั้นใช้โทรศัพท์แสกนได้ เนื่องจากเป็น localhost จึงใช้โทรศัพท์แสกนโดยตรงไม่ได้
  > หรือเปิด url ตามนี้ http://localhost:4200/product-detail?id=${id}&code=${code}

## Tech Stack
- Backend: ASP.NET Core 9, Enity Framework Core, SQLite
- Frontend: Angular version 20.0.0, Node.js version 22.18.0, Bootstrap version 5.3.8
- Database: SQLite (ไฟล์ app.db)

## Installation
- git clone https://github.com/napassornGit/thaibev-test.git
# Backend Setup
- cd thaibev-test-api
- dotnet build
- dotnet run
# Frontend Setup
- npm install -g @angular/cli
- npm install
- ng serve or ng serve -o
- หมายเหตุ หากไม่สามารถเชื่อมต่อ API ได้ เมื่อรัน server แล้ว ตรวจสอบ port ของ serverUrl ที่ environment.ts

  

