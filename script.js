// PowerWise Egypt

const meterButton = document.querySelector("#meterButton");
const usageValue = document.querySelector("#usageValue");

// استرجاع آخر قراءة محفوظة عند فتح الموقع
const savedReading = localStorage.getItem("meterReading");

if (savedReading !== null && usageValue) {
    usageValue.textContent = savedReading;
}

// إدخال قراءة جديدة
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

        // تحديث الرقم على لوحة التحكم
        if (usageValue) {
            usageValue.textContent = number;
        }

        // حفظ القراءة في المتصفح
        localStorage.setItem("meterReading", number);

        alert("تم حفظ قراءة العداد بنجاح: " + number);
    });
}

console.log("PowerWise Egypt is running!");
// سجل قراءات العداد
let meterHistory = JSON.parse(
    localStorage.getItem("meterHistory") || "[]"
);

const historyTable = document.querySelector("#meterHistory");

// عرض القراءات المحفوظة
function displayMeterHistory() {
    if (!historyTable) return;

    if (meterHistory.length === 0) {
        historyTable.innerHTML = `
            <tr>
                <td colspan="2">لا توجد قراءات مسجلة حتى الآن</td>
            </tr>
        `;
        return;
    }

    historyTable.innerHTML = "";

    meterHistory.forEach(function (item) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.reading} كيلو وات</td>
        `;

        historyTable.appendChild(row);
    });
}

// عرض السجل عند فتح الموقع
displayMeterHistory();
