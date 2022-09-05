const postComment = async (event) => {
    event.preventDefault();
    alert('in post comment func')
    if (event.target.hasAttribute('data-id')) {
        const blog_id = event.target.getAttribute('data-id');
        const content = document.querySelector(`#comment${id}`).value;
        
        if (title && content) {
            const response = await fetch(`/api/blog/${id}`, {
              method: 'POST',
              body: JSON.stringify({ content, blog_id  }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to create blog');
            }
        }
    }
}

document
    .querySelector('.commentSection')
    .addEventListener('submit', postComment);
