import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      {
        blogs?.length < 1
          ? <p>Loading...</p>
          : <table className='table table-dark table table-striped'>
            <tbody>
              {
                blogs?.map(blog =>
                  <tr key={blog.id.toString()}>
                    <td className='py-3'>
                      <Link className='m-0 fs-5 link-primary' to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
      }
    </>
  )
}

export default BlogList