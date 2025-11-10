function updatePrice() {
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }

  // Скрываем или показываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = select.value == "2" ? "block" : "none";

  // Смотрим какая товарная опция выбрана.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  // Скрываем или показываем чекбоксы.
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = select.value != "3" ? "none" : "block";

  // Смотрим какие товарные свойства выбраны.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });

  const quantityInput = document.getElementById("quantity");
  const resultDiv = document.getElementById("result");
  const quantityError = document.getElementById("quantityError");
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity < 1) {
    quantityError.style.display = "block";
    resultDiv.classList.remove("show");
    return;
  } else {
    quantityError.style.display = "none";
  }

  const total = price * quantity;
  const formattedTotal = total.toLocaleString("ru-RU");

  const totalPriceSpan = document.getElementById("totalPrice");
  totalPriceSpan.textContent = formattedTotal;
  resultDiv.classList.add("show");

  let prodPrice = document.getElementById("prodPrice");
  prodPrice.innerHTML = price + " рублей";
}

function getPrices() {
  return {
    prodTypes: [100, 200, 150],
    prodOptions: {
      option2: 10,
      option3: 5,
    },
    prodProperties: {
      prop1: 1,
      prop2: 2,
    },
  };
}

window.addEventListener("DOMContentLoaded", function (event) {
  // Скрываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";

  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик на изменение select.
  select.addEventListener("change", function (event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });

  // Назначаем обработчик радиокнопок.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

  // Назначаем обработчик радиокнопок.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  updatePrice();
});

/*document.addEventListener("DOMContentLoaded", function () {
  const productSelect = document.getElementById("product");
  const quantityInput = document.getElementById("quantity");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultDiv = document.getElementById("result");
  const totalPriceSpan = document.getElementById("totalPrice");
  const quantityError = document.getElementById("quantityError");

  function calculateTotal() {
    const price = parseFloat(productSelect.value);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      quantityError.style.display = "block";
      resultDiv.classList.remove("show");
      return;
    } else {
      quantityError.style.display = "none";
    }

    const total = price * quantity;

    const formattedTotal = total.toLocaleString("ru-RU");

    totalPriceSpan.textContent = formattedTotal;
    resultDiv.classList.add("show");
  }

  calculateBtn.addEventListener("click", calculateTotal);

  quantityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      calculateTotal();
    }
  });

  quantityInput.addEventListener("input", function () {
    const quantity = parseInt(this.value);
    if (isNaN(quantity) || quantity < 1) {
      quantityError.style.display = "block";
    } else {
      quantityError.style.display = "none";
    }
  });
});
*/
