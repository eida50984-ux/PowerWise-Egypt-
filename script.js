// PowerWise Egypt

// زر إدخال قراءة العداد
const meterButton = document.querySelector("#meterButton");

if (meterButton) {
    meterButton.addEventListener("click", function () {
        const reading = prompt("من فضلك أدخل قراءة عداد الكهرباء:");

        if (reading === null || reading.trim() === "") {
            alert("من فضلك أدخل قراءة صحيحة.");
            return;
        }

        const number = Number(reading);

        if (!Number.isFinite(number) || number < 0) {
            alert("القراءة لازم تكون رقم صحيح أكبر من أو يساوي صفر.");
            return;
        }

     const usageValue = document.querySelector("#usageValue");

if (usageValue) {
    usageValue.textContent = number;
}

alert("تم تسجيل قراءة العداد: " + number + " كيلو وات ساعة");   
    });
}

console.log("PowerWise Egypt is running!");
