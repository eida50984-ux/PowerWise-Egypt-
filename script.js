// PowerWise Egypt

const meterButton = document.querySelector("#meterButton");
const readingInput = document.querySelector("#meterReadingInput");
const usageValue = document.querySelector("#usageValue");
const historyTable = document.querySelector("#meterHistory");
const historyCount = document.querySelector("#historyCount");

const imageInput = document.querySelector("#meterImageInput");
const imagePreview = document.querySelector("#meterImagePreview");

// استرجاع القراءات المحفوظة
let meterHistory = JSON.parse(
    localStorage.getItem("meterHistory") || "[]"
);

// استرجاع آخر قراءة
const savedReading = localStorage.getItem("meterReading");

if (savedReading !== null && usageValue) {
    usageValue.textContent = savedReading;
}

// عرض سجل القراءات
function displayMeterHistory() {
    if (!historyTable) return;

    if (historyCount) {
        historyCount.textContent = meterHistory.length + " قراءة";
    }

    if (meterHistory.length === 0) {
        historyTable.innerHTML = `
            <tr>
                <td colspan="5">لا توجد قراءات مسجلة حتى الآن</td>
            </tr>
        `;
        return;
    }

    historyTable.innerHTML = "";

    meterHistory.forEach(function (item, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.date || "—"}</td>
            <td>${item.time || "—"}</td>
            <td>${item.reading} كيلو وات</td>
            <td><span class="reading-status">مسجلة</span></td>
        `;

        historyTable.appendChild(row);
    });
}

// حفظ قراءة جديدة
if (meterButton) {
    meterButton.addEventListener("click", function () {

        const reading = readingInput.value.trim();

        if (reading === "") {
            alert("من فضلك أدخل قراءة العداد أولاً.");
            return;
        }

        const number = Number(reading);

        if (!Number.isFinite(number) || number < 0) {
            alert("من فضلك أدخل قراءة صحيحة.");
            return;
        }

        const now = new Date();

        const newReading = {
            reading: number,
            date: now.toLocaleDateString("ar-EG"),
            time: now.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        meterHistory.unshift(newReading);

        localStorage.setItem(
            "meterHistory",
            JSON.stringify(meterHistory)
        );

        localStorage.setItem("meterReading", number);

        if (usageValue) {
            usageValue.textContent = number;
        }

        readingInput.value = "";

        displayMeterHistory();

        alert("تم حفظ القراءة بنجاح!");
    });
}

// معاينة صورة العداد
if (imageInput) {
    imageInput.addEventListener("change", function () {

        const file = imageInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("من فضلك اختر ملف صورة.");
            imageInput.value = "";
            return;
        }

        const imageURL = URL.createObjectURL(file);

        imagePreview.innerHTML = `
            <img src="${imageURL}" alt="صورة عداد الكهرباء">
        `;
    });
}

// عرض السجل عند فتح الموقع
displayMeterHistory();

console.log("PowerWise Egypt is running!");
