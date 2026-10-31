// PowerWise Egypt

const meterButton = document.querySelector("#meterButton");
const usageValue = document.querySelector("#usageValue");
const historyTable = document.querySelector("#meterHistory");

// استرجاع البيانات المحفوظة
let meterHistory = JSON.parse(
    localStorage.getItem("meterHistory") || "[]"
);

const savedReading = localStorage.getItem("meterReading");

// عرض آخر قراءة محفوظة
if (savedReading !== null && usageValue) {
    usageValue.textContent = savedReading;
}

// عرض سجل القراءات
function displayMeterHistory() {
    if (!historyTable) return;

    const historyCount = document.querySelector("#historyCount");

    if (historyCount) {
        historyCount.textContent = meterHistory.length + " قراءة";
    }

    if (meterHistory.length === 0) {
        historyTable.innerHTML = `
            <tr>
                <td colspan="4">لا توجد قراءات مسجلة حتى الآن</td>
            </tr>
        `;
        return;
    }

    historyTable.innerHTML = "";

    meterHistory.forEach(function (item, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.date}</td>
            <td>${item.reading} كيلو وات</td>
            <td><span class="reading-status">مسجلة</span></td>
        `;

        historyTable.appendChild(row);
    });
}
// تسجيل قراءة جديدة
if (meterButton) {
    meterButton.addEventListener("click", function (event) {
        event.preventDefault();

        const reading = prompt("من فضلك أدخل قراءة عداد الكهرباء:");

        if (reading === null || reading.trim() === "") {
            return;
        }

        const number = Number(reading);

        if (!Number.isFinite(number) || number < 0) {
            alert("من فضلك أدخل قراءة صحيحة.");
            return;
        }

        // تحديث لوحة التحكم
        if (usageValue) {
            usageValue.textContent = number;
        }

        // حفظ آخر قراءة
        localStorage.setItem("meterReading", number);

        // إضافة القراءة للسجل
        const newReading = {
            reading: number,
            date: new Date().toLocaleString("ar-EG")
        };

        meterHistory.unshift(newReading);

        localStorage.setItem(
            "meterHistory",
            JSON.stringify(meterHistory)
        );

        displayMeterHistory();

        alert("تم حفظ القراءة وإضافتها إلى السجل بنجاح!");
    });
}

// عرض السجل عند فتح الموقع
displayMeterHistory();

console.log("PowerWise Egypt is running!");
