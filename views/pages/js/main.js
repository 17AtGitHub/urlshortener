$(document).ready(function() {
  $('.delete-btn').on('click', function() {
    const shortId = $(this).data('shortId');
    if (confirm("Are you sure you want to delete this URL?")) {
      $.ajax({
        url: `/url/${shortId}`,
        type: 'DELETE',
        success: function(result) {
          window.location.reload();
        },
        error: function(xhr, status, error) {
          alert('Failed to delete the URL');
          console.error('Error:', error);
        }
      });
    }
  });
});
