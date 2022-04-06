$(document).ready(function () {

  //Burger
  $('.burger').on('click', function() {
    $(this).toggleClass("active");
    $('.header__nav').toggleClass('active');
    $(document.documentElement).toggleClass('lock');
  });

  $(".reviews__slider").slick({
    slidesToShow: 5,
    infinite: false,
    prevArrow: ".reviews__slider-prev",
    nextArrow: ".reviews__slider-next",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 998,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          dots: true,
          appendDots: ".reviews__slider-dots",
          dotsClass: "reviews__dots",
        },
      },
    ],
  });


  let reviewsText = [];

  $(".reviews__slider-item").each((i, slide) => {
    const textElem = $(slide).find(".reviews__slider-descr");
    const textValue = textElem.text();
    const textLength = textValue.length;

    if (textLength > 250) {
      reviewsText[i] = textValue;

      const croppedText = textValue.substr(0, 250);
      const indexLastSpace = croppedText.lastIndexOf(" ");

      textElem.text(croppedText.slice(0, indexLastSpace) + " ");
      textElem.append(
        '<a href="#" class="reviews__slider-more more"> ... Далее</a>'
      );
    }
  });

  $(".reviews__slider").on("click", ".reviews__slider-more", function (e) {
    e.preventDefault();

    const slide = $(this).parents(".reviews__slider-item");
    const slideIndex = slide.index();
    console.log(slideIndex);
    const textElem = slide.find(".reviews__slider-descr");
    const heightBefore = textElem.height();

    textElem.text(reviewsText[slideIndex]);
    const heightAfter = textElem.height();

    textElem.css("height", heightBefore + "px");

    setTimeout(() => textElem.css("height", heightAfter + "px"));
    setTimeout(() => textElem.css("height", "auto"), 500);
  });

  let advantagesText = [];

  $(".advantages__item").each((i, slide) => {
    const textElem = $(slide).find(".advantages__item-descr");
    const textValue = textElem.text();
    const textLength = textValue.length;

    if (textLength > 250) {
      advantagesText[i] = textValue;

      const croppedText = textValue.substr(0, 250);
      const indexLastSpace = croppedText.lastIndexOf(" ");

      textElem.text(croppedText.slice(0, indexLastSpace) + " ");
      textElem.append(
        '<a href="#" class="advantages__item-more more"> ... Далее</a>'
      );
    }
  });

  $(".advantages__items").on("click", ".advantages__item-more", function (e) {
    e.preventDefault();

    const slide = $(this).parents(".advantages__item");
    const slideIndex = slide.index();
    console.log(slideIndex);
    const textElem = slide.find(".advantages__item-descr");
    const heightBefore = textElem.height();

    textElem.text(advantagesText[slideIndex]);
    const heightAfter = textElem.height();

    textElem.css("height", heightBefore + "px");

    setTimeout(() => textElem.css("height", heightAfter + "px"));
    setTimeout(() => textElem.css("height", "auto"), 500);
  });

  //Accordion
  function addAccordion(items, item, text) {
    $(items).on("click", item, function (e) {
      const target = e.currentTarget;

      $(target).toggleClass("active");
      $(target).find(text).slideToggle("active");
    });
  }

  addAccordion(".faq__items", ".faq__item", ".faq__item-text");

  // Validate forms
  $(".subscribe__form").validate({
    rules: {
      email: {
        email: true,
      },
    },
    messages: {
      email: {
        email: "Введите email",
        required: "Это обязательное поле email",
      },
    },
    // callback submit form
    submitHandler: function () {},
  });

  //Show All

  let counter = 12;
  const trainingItems = $(".training__card");

  if (window.innerWidth <= 480) {
    counter = 4;

    showItems(trainingItems, counter);
  } else {
    showItems(trainingItems, counter);
  }

  function showItems(items, count) {
    const parent = $(items).parent().text("");
    for (let i = 0; i < count; i++) {
      parent.append(items[i]);
    }
  }

  $(".training__btn ").on("click", function (e) {
    e.preventDefault();

    counter = trainingItems.length;
    showItems(trainingItems, counter);
    $(this).hide();
  });
});