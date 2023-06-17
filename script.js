var currentDay = "26.05.23";
var pathImage =
  "https://res.cloudinary.com/dkfd7hcwo/image/upload/w_600,h_400,c_scale/tenisyraquetas/";

var circlePositionsWeb = [
  { top: "5%", left: "15.5%", image: "1.jpg" },
  { top: "7.3%", left: "23.7%", image: "2.jpg" },
  { top: "22%", left: "19%", image: "3.jpg" },
  { top: "27%", left: "24.8%", image: "4.jpg" },
  { top: "49.3%", left: "38.3%", image: "5.jpg" },
  { top: "32.5%", left: "43.8%", image: "6.jpg" },
  { top: "25.6%", left: "54.4%", image: "7.jpg" },
  { top: "6.8%", left: "57%", image: "8.jpg" },
  { top: "6.5%", left: "62%", image: "9.jpg" },
  { top: "24.5%", left: "65.9%", image: "10.jpg" },
  { top: "32%", left: "63.3%", image: "11.jpg" },
  { top: "31%", left: "68.8%", image: "12.jpg" },
  { top: "56.8%", left: "71.5%", image: "13.jpg" },
  { top: "62.5%", left: "64%", image: "14.jpg" },
  { top: "31.5%", left: "73.6%", image: "15.jpg" },
  { top: "27.2%", left: "92.3%", image: "16.jpg" },
  { top: "9%", left: "92.5%", image: "17.jpg" },
  { top: "6%", left: "94.2%", image: "18.jpg" },
  { top: "33.8%", left: "89.5%", image: "19.jpg" },
  { top: "60%", left: "86.7%", image: "20.jpg" },
  { top: "59%", left: "89.5%", image: "21.jpg" },
  { top: "64%", left: "90.5%", image: "22.jpg" },
];

var circlePositionsMobile = [
  { top: "5%", left: "15.4%", image: "1.jpg" },
  { top: "7.5%", left: "23.8%", image: "2.jpg" },
  { top: "22.8%", left: "19.3%", image: "3.jpg" },
  { top: "27.6%", left: "25.1%", image: "4.jpg" },
  { top: "49.5%", left: "38.45%", image: "5.jpg" },
  { top: "33%", left: "43.8%", image: "6.jpg" },
  { top: "26%", left: "54.4%", image: "7.jpg" },
  { top: "7.6%", left: "57%", image: "8.jpg" },
  { top: "7.4%", left: "62%", image: "9.jpg" },
  { top: "25.2%", left: "65.8%", image: "10.jpg" },
  { top: "32.6%", left: "63.2%", image: "11.jpg" },
  { top: "31.4%", left: "68.6%", image: "12.jpg" },
  { top: "56.8%", left: "71.2%", image: "13.jpg" },
  { top: "62.5%", left: "64%", image: "14.jpg" },
  { top: "32%", left: "73.4%", image: "15.jpg" },
  { top: "27.8%", left: "92%", image: "16.jpg" },
  { top: "9.8%", left: "92.3%", image: "17.jpg" },
  { top: "7.2%", left: "93.9%", image: "18.jpg" },
  { top: "34.2%", left: "89.2%", image: "19.jpg" },
  { top: "60%", left: "86.5%", image: "20.jpg" },
  { top: "59%", left: "89.2%", image: "21.jpg" },
  { top: "64%", left: "90%", image: "22.jpg" },
];

var circlePositions = circlePositionsWeb;
var daySelect = document.getElementById("day-select");
var selectedCircleIndex;

document.addEventListener("DOMContentLoaded", function () {
  generateCircles();

  daySelect.addEventListener("change", function () {
    changeImages(daySelect.value);
  });

  var circlesContainer;

  function generateCircles() {
    var backgroundImage = document.querySelector(".background-image img");
    circlesContainer = document.querySelector(".circles-container");
    circlesContainer.innerHTML = "";
    circlesContainer.appendChild(backgroundImage);

    for (var i = 0; i < circlePositions.length; i++) {
      var circle = document.createElement("div");
      circle.className = "circle";
      circle.style.top = circlePositions[i].top;
      circle.style.left = circlePositions[i].left;
      circle.dataset.image =
        pathImage + currentDay + "/" + circlePositions[i].image;
      circle.dataset.index = i;
      circle.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      circlesContainer.appendChild(circle);

      var lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.dataset.index = i;
      circle.dataset.index = i;
      var image = document.createElement("img");
      image.src = pathImage + currentDay + "/" + circlePositions[i].image;
      lightbox.appendChild(image);
      circlesContainer.appendChild(lightbox);

      circle.addEventListener("click", function () {
        selectedCircleIndex = parseInt(this.dataset.index);
        changeToNextDay();
      });

      circle.addEventListener("mouseenter", function () {
        var lightbox = this.nextSibling;
        lightbox.style.display = "block";
      });

      circle.addEventListener("mouseleave", function () {
        var lightbox = this.nextSibling;
        lightbox.style.display = "none";
      });
    }
  }

  function changeImages(day) {
    if (day === currentDay) return;

    currentDay = day;

    var circles = document.getElementsByClassName("circle");
    var circlesArray = Array.from(circles);

    circlesArray.forEach(function (circle) {
      circle.classList.remove("highlighted");
      var lightbox = circle.nextSibling;
      lightbox.style.display = "none";
      var image = lightbox.querySelector("img");
      var circleIndex = parseInt(circle.dataset.index); // Obtener el índice del círculo
      var newImagePath =
        pathImage + currentDay + "/" + circlePositions[circleIndex].image; // Obtener el nuevo enlace de la imagen
      circle.dataset.image = newImagePath; // Actualizar el atributo data-image del círculo
      image.src = newImagePath; // Actualizar la fuente de la imagen
    });

    var selectedCircle = document.querySelector(
      ".circle[data-image='" +
        pathImage +
        currentDay +
        "/" +
        circlePositions[selectedCircleIndex].image +
        "']"
    );
    if (!selectedCircle) {
      var selectedIndex = selectedCircle.dataset.index;
      selectedCircle = document.querySelector(
        ".circle[data-index='" + selectedIndex + "']"
      );
    }
    selectedCircle.classList.add("highlighted");
    var selectedLightbox = selectedCircle.nextSibling;
    selectedLightbox.style.display = "block";
  }

  function changeToNextDay() {
    var currentIndex = daySelect.selectedIndex;
    if (currentIndex < daySelect.options.length - 1) {
      daySelect.selectedIndex = currentIndex + 1;
    } else {
      daySelect.selectedIndex = 0;
    }

    var previousLightbox = document.querySelector(".lightbox.active");
    if (previousLightbox) {
      previousLightbox.style.display = "none";
      previousLightbox.classList.remove("active");
    }

    changeImages(daySelect.value);

    // Agregar la clase para refrescar el efecto hover
    var container = document.querySelector(".circles-container");
    container.classList.add("hover-effect");

    var selectedCircle = document.querySelector(".circle.highlighted");
    if (selectedCircle) {
      selectedCircle.classList.remove("highlighted");
    }

    var selectedIndex = selectedCircle.dataset.index; // Obtener el índice del círculo resaltado actualmente
    selectedCircle = document.querySelector(
      ".circle[data-index='" + selectedIndex + "']"
    );

    var selectedLightbox = selectedCircle.nextSibling;
    selectedLightbox.style.display = "block";
    selectedLightbox.classList.add("active");
  }

  function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      circlePositions = circlePositionsMobile;
    } else {
      circlePositions = circlePositionsWeb;
    }

    generateCircles();
  }

  mediaQuery.addEventListener("change", handleMediaQueryChange);
  handleMediaQueryChange(mediaQuery);
});

document.addEventListener("click", function (event) {
  var target = event.target;
  var isCircle = target.classList.contains("circle");
  var isLightbox = target.classList.contains("lightbox");

  if (!isCircle && !isLightbox) {
    var lightboxes = document.querySelectorAll(".lightbox.active");
    lightboxes.forEach(function (lightbox) {
      lightbox.style.display = "none";
      lightbox.classList.remove("active");
    });
  }
});

function changeImages2(day) {
  if (day === currentDay) return;

  currentDay = day;

  var circles = document.getElementsByClassName("circle");
  var circlesArray = Array.from(circles); // Convertir la colección en un array

  circlesArray.forEach(function (circle) {
    circle.classList.remove("highlighted");
    var lightbox = circle.nextSibling;
    lightbox.style.display = "none";
    var image = lightbox.querySelector("img");
    image.src =
      pathImage +
      currentDay +
      "/" +
      circlePositions[circle.dataset.index].image;
  });
}

changeImages(document.getElementById("day-select").value);
