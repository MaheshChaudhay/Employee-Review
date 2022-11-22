const $star_rating = $(".star-rating .fa-star");
const starRating = $(".star-rating");
const reviewForms = $(".review-form");

starRating.each(function () {
  const ratingBatches = $(`#${$(this).data("id")} .fa-star`);
  ratingBatches.on("click", function () {
    ratingBatches.siblings("input.rating-value").val($(this).data("rating"));
    return SetRatingStar(ratingBatches);
  });
});

const SetRatingStar = function (ratingBatches) {
  return ratingBatches.each(function () {
    if (
      parseInt(ratingBatches.siblings("input.rating-value").val()) >=
      parseInt($(this).data("rating"))
    ) {
      return $(this).removeClass("fa-regular").addClass("fa-solid");
    } else {
      return $(this).removeClass("fa-solid").addClass("fa-regular");
    }
  });
};

reviewForms.on("submit", function (e) {
  e.preventDefault();
  const formElement = $(this);
  $.ajax({
    url: $(formElement).attr("action"),
    type: "POST",
    data: $(formElement).serialize(),
    success: function (data) {
      $(`#${data.data.id}`).remove();
    },
    error: function (err) {
      console.log(err.responseText);
    },
  });
});

SetRatingStar();
$(document).ready(function () {});
