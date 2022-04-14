import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ProductAction } from '../actions/product.action'
import { PRODUCT_CONSTANT } from '../constants/product.constant'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ProductEditScreen = ({ match, history }) => {
  const { id: productId } = useParams()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categoryGetList = useSelector((state) => state.categoryGetList)
  const { categories } = categoryGetList

  const brandGetList = useSelector((state) => state.brandGetList)
  const { brands } = brandGetList

  const productGetDetails = useSelector((state) => state.productGetDetails)
  const { loading, error, product } = productGetDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_CONSTANT.UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(ProductAction.getDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, productId, product, successUpdate, navigate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      ProductAction.updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5 justify-content-center'>
          <div className='col-lg-5 col-md-8'>
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Thông Tin Sản Phẩm</span>
              </h2>
            </div>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <form onSubmit={submitHandler}>
                <div className='form-group'>
                  <label>Tên</label>
                  <input
                    className='form-control bg-secondary'
                    type='text'
                    placeholder='Nhập tên...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Thể loại</label>
                  <div>
                    <select
                      className='form-control bg-secondary'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Thương hiệu</label>
                  <div>
                    <select
                      className='form-control bg-secondary'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Hình ảnh</label>
                  <input
                    className='form-control bg-secondary'
                    type='text'
                    placeholder='Nhập url hình ảnh...'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <input
                    className='form-control bg-secondary'
                    type='file'
                    onChange={uploadFileHandler}
                  />
                  {uploading && <Loader />}
                </div>

                <div className='form-group'>
                  <label>Giá</label>
                  <input
                    className='form-control bg-secondary'
                    type='number'
                    placeholder='Nhập giá...'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Số lượng tồn</label>
                  <input
                    className='form-control bg-secondary'
                    type='number'
                    placeholder='Nhập số lượng tồn...'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label>Mô tả</label>
                  <textarea
                    className='form-control bg-secondary'
                    rows='3'
                    placeholder='Nhập mô tả sản phẩm...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* <div className='form-group'>
                  <label>Mô tả</label>
                  <CKEditor
                    className='bg-primary'
                    editor={classNameicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setDescription(data)
                    }}
                  />
                </div> */}

                <div className='form-group'>
                  <button className='btn btn-primary py-2 px-4' type='submit'>
                    Cập nhật thông tin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductEditScreen
