const Blog = ({ blog }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <p style={{ margin: "0" }}>{blog.title}, <em>by {blog.author}</em></p>
      <p style={{ margin: "0" }}>URL: <a href="#">{blog.url}</a></p>
    </div>  
  )
}

export default Blog