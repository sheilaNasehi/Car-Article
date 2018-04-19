$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


  $(".add-comment-btn").on("click", () => {
    // Get _id of comment to be deleted
    let articleId = $(this).data("id");

    // URL root (so it works in eith Local Host for Heroku)
    let baseURL = window.location.origin;

    // Get Form Data by Id
    let form = $('#' + "form-add-" + articleId);

    // AJAX Call to delete Comment
    $.ajax({
      url: baseURL + '/article/comment/add/' + articleId,
      type: 'POST',
      data: form.serialize(),
    })
    .done(function() {
      // Refresh the Window after the call is done
      location.reload();
    });
    
    // Prevent Default
    return false;
  });
});
