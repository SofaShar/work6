// Базовая стоимость для каждого типа услуги
const basePrices = {
  basic: 100,
  standard: 200,
  premium: 350,
};

// Модификаторы стоимости для опций
const optionModifiers = {
  option1: 0,
  option2: 50,
  option3: 100,
};

// Модификаторы стоимости для свойств
const propertyModifiers = {
  property: 50,
};

// Описания услуг
const serviceDescriptions = {
  basic: "Базовая услуга: 100 руб. за единицу",
  standard: "Стандартная услуга: 200 руб. за единицу",
  premium: "Премиум услуга: 350 руб. за единицу",
};

// Получение элементов DOM
const quantityInput = document.getElementById("quantity");
const serviceTypeRadios = document.querySelectorAll(
  'input[name="serviceType"]'
);
const optionsGroup = document.getElementById("options-group");
const optionsSelect = document.getElementById("options");
const propertyGroup = document.getElementById("property-group");
const propertyCheckbox = document.getElementById("property");
const totalPriceElement = document.getElementById("total-price");
const serviceDescriptionElement = document.getElementById(
  "service-description"
);

// Функция для расчета стоимости
function calculatePrice() {
  // Получение выбранного типа услуги
  let selectedType;
  for (const radio of serviceTypeRadios) {
    if (radio.checked) {
      selectedType = radio.value;
      break;
    }
  }

  // Получение количества
  const quantity = parseInt(quantityInput.value) || 1;

  // Базовая стоимость
  let price = basePrices[selectedType];

  // Добавление стоимости опции (если применимо)
  if (
    selectedType === "standard" &&
    !optionsGroup.classList.contains("hidden")
  ) {
    const selectedOption = optionsSelect.value;
    price += optionModifiers[selectedOption];
  }

  // Добавление стоимости свойства (если применимо)
  if (
    selectedType === "premium" &&
    !propertyGroup.classList.contains("hidden") &&
    propertyCheckbox.checked
  ) {
    price += propertyModifiers.property;
  }

  // Обновление отображаемой цены
  totalPriceElement.textContent = price * quantity + " руб.";

  // Обновление описания услуги
  serviceDescriptionElement.textContent = serviceDescriptions[selectedType];
}

// Функция для обновления видимости элементов формы
function updateFormVisibility() {
  // Получение выбранного типа услуги
  let selectedType;
  for (const radio of serviceTypeRadios) {
    if (radio.checked) {
      selectedType = radio.value;
      break;
    }
  }

  // Управление видимостью элементов формы в зависимости от типа услуги
  switch (selectedType) {
    case "basic":
      optionsGroup.classList.add("hidden");
      propertyGroup.classList.add("hidden");
      break;
    case "standard":
      optionsGroup.classList.remove("hidden");
      propertyGroup.classList.add("hidden");
      break;
    case "premium":
      optionsGroup.classList.add("hidden");
      propertyGroup.classList.remove("hidden");
      break;
  }
}

// Назначение обработчиков событий
quantityInput.addEventListener("input", calculatePrice);

for (const radio of serviceTypeRadios) {
  radio.addEventListener("change", function () {
    updateFormVisibility();
    calculatePrice();
  });
}

optionsSelect.addEventListener("change", calculatePrice);
propertyCheckbox.addEventListener("change", calculatePrice);

// Инициализация формы
updateFormVisibility();
calculatePrice();
