document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const serviceRadios = document.querySelectorAll("[name=serviceType]");
  const optionsSelect = document.getElementById("optionsSelect");
  const propertyCheckbox = document.getElementById("hasProperty");
  const totalPriceSpan = document.getElementById("totalPrice");

  const secondTypeOptions = [
    { label: "Вариант A", price: 50 },
    { label: "Вариант B", price: 75 },
    { label: "Вариант C", price: 100 },
  ];

  function updateUI(typeValue) {
    if (typeValue === "type1") {
      optionsSelect.classList.add("hidden");
      propertyCheckbox.parentNode.classList.add("hidden");
    } else if (typeValue === "type2") {
      populateOptions(secondTypeOptions);
      optionsSelect.classList.remove("hidden");
      propertyCheckbox.parentNode.classList.add("hidden");
    } else if (typeValue === "type3") {
      optionsSelect.classList.add("hidden");
      propertyCheckbox.parentNode.classList.remove("hidden");
    }

    calculateTotal();
  }

  function populateOptions(optionsData) {
    let optionHTML = "";
    optionsData.forEach((opt) => {
      optionHTML += `<option value="${opt.price}">${opt.label}</option>`;
    });
    optionsSelect.innerHTML = optionHTML;
  }

  function calculateTotal() {
    const selectedServiceRadio = Array.from(serviceRadios).find(
      (radio) => radio.checked
    );
    const basePrice = parseInt(selectedServiceRadio.value.match(/\d+/)[0]) || 0;
    let additionalCost = 0;

    switch (selectedServiceRadio.value) {
      case "type1":
        break;
      case "type2":
        additionalCost = parseFloat(optionsSelect.value);
        break;
      case "type3":
        additionalCost = propertyCheckbox.checked ? 15 : 0;
        break;
    }

    const finalPrice = Math.round(
      (basePrice + additionalCost) * quantityInput.value
    );
    totalPriceSpan.textContent = `${finalPrice} руб.`;
  }

  serviceRadios.forEach((radio) => {
    radio.addEventListener("change", () => updateUI(radio.value));
  });

  quantityInput.addEventListener("input", calculateTotal);
  optionsSelect.addEventListener("change", calculateTotal);
  propertyCheckbox.addEventListener("change", calculateTotal);
});
