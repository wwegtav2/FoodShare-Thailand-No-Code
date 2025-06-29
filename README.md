# FoodShare Thailand

## ฟูดแชร์ไทยแลนด์

**A web app to reduce food waste by connecting surplus-food sellers with nearby buyers.**  
**แอปพลิเคชันสำหรับลดขยะอาหาร โดยเชื่อมต่อผู้ขายอาหารส่วนเกินกับผู้ซื้อในชุมชนใกล้เคียง**

---

## 📋 Overview / ภาพรวม

- **English**: FoodShare Thailand helps farmers, restaurants, and markets post surplus food that’s still edible. Buyers nearby browse, chat, and arrange pickups—all in one place.
- **ไทย**: ฟูดแชร์ไทยแลนด์ ช่วยให้เกษตรกร ร้านอาหาร และตลาดสด โพสต์ขายอาหารส่วนเกินที่ยังรับประทานได้ ผู้ซื้อในพื้นที่สามารถค้นหา แชท นัดรับสินค้า ได้สะดวกในเว็บเดียว

---

## 🤖 AI-Assisted & Open Source / สร้างด้วย AI และโอเพนซอร์ส

- All code was generated and refined with AI tools (Bolt.new’s AI Builder, prompt-driven).
- Fully **open-source**: feel free to fork, adapt, and extend.
- **โค้ดทั้งหมดสร้างด้วย AI** (Bolt.new AI Builder) และโครงการนี้เป็น **โอเพนซอร์ส** ใครก็สามารถนำไปพัฒนาต่อได้

---

## 🛠️ Tech Stack / เทคโนโลยีที่ใช้

- TypeScript
- JavaScript
- CSS
- SDL (Schema Definition Language on Bolt.new)

---

## 📊 Evidence: Thailand’s Food Waste Trends / หลักฐานแนวโน้มขยะอาหารในไทย

Thailand’s Pollution Control Department reports food waste ≈ 39% of municipal solid waste (~9.7 million tonnes/year).  
ข้อมูลจากกรมควบคุมมลพิษ: ขยะอาหารคิดเป็น ~39% ของขยะมูลฝอย (~9.7 ล้านตัน/ปี)

| Year / ปี | Food Waste (million tonnes) / ปริมาณขยะอาหาร (ล้านตัน) |
| --------- | -----------------------------------------------------: |
| 2000      |                                                   6.38 |
| 2023      |                                                   9.70 |

---

## 📈 Visualizing the Data / การสร้างกราฟแสดงข้อมูล

```html
<!-- Include Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="wasteChart" width="600" height="300"></canvas>
<script>
  const ctx = document.getElementById("wasteChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2000", "2023"], // ปรับปีเพิ่มได้
      datasets: [
        {
          label: "Food Waste (million tonnes)", // หรือ 'ขยะอาหาร (ล้านตัน)'
          data: [6.38, 9.7],
          fill: false,
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Million Tonnes per Year / ล้านตันต่อปี",
          },
        },
        x: {
          title: {
            display: true,
            text: "Year / ปี",
          },
        },
      },
    },
  });
</script>
```
