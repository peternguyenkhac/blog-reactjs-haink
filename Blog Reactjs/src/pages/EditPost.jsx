import { useNavigate, useParams } from "react-router-dom";
import useForm from "../hooks/useForm"
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import apiService from "../services/apiService";
import { toast } from 'react-toastify';

export default function EditPost() {
    const { id } = useParams();
    const { data, resetData, loading } = usePost(id);
    const { inputs, setInputs, file, handleChange } = useForm(data);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setInputs(data)
        }
    }, [data, setInputs])


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (const key in inputs) {
            if (Array.isArray(inputs[key])) { // position array
                inputs[key].forEach((item) => formData.append(key, item));
            } else {
                formData.append(key, inputs[key]);
            }
        }
        if (file) { //image
            formData.append('imageUpload', file);
        }

        try {
            if (id) {
                const result = await apiService.putData(`/api/posts/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (result.status == 204) {
                    toast.success("Cập nhật thành công");
                    navigate("/");
                } else {
                    toast.error("Thất bại");
                }
            } else {
                const result = await apiService.postData(`/api/posts`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (result.status == 204) {
                    toast.success("Thêm mới thành công");
                    navigate("/");
                } else {
                    toast.error("Thất bại");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }


    return (
        <div className="card">
            <div className="card-header">
                {id ? "Edit Post" : "New Post"}
            </div>
            <div className="card-body">
                <form id="postForm" onSubmit={handleSubmit}>
                    <div className="htmlForm-group mb-3">
                        <label htmlFor="title">Tiêu đề</label>
                        <input required type="text" className="form-control" id="title" name="title" value={inputs.title || ""} onChange={handleChange} />
                    </div>
                    <div className="htmlForm-group mb-3">
                        <label htmlFor="description">Mô tả</label>
                        <textarea required className="form-control" id="description" name="description" value={inputs.description || ""} rows={3} onChange={handleChange} />

                    </div>
                    <div className="htmlForm-group mb-3">
                        <label htmlFor="content">Chi tiết</label>
                        <textarea required className="form-control" id="content" name="content" rows={5} value={inputs.content || ""} onChange={handleChange}></textarea>

                    </div>
                    <div className="htmlForm-group mb-3">
                        <label htmlFor="formFile" className="Form-label">Hình ảnh</label>
                        <input className="form-control mb-3" type="file" name="imageUpload" id="formFile" accept="image/*" onChange={handleChange} />
                        {(inputs.updateImage || inputs.image) &&
                            <img src={inputs.updateImage || `${import.meta.env.VITE_API_HOST}/${inputs.image}`} className="rounded" height={200} alt="..."></img>
                        }
                    </div>
                    <div className="Form-group mb-3">
                        <label className="Form-label">Vị trí</label>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="checkbox" id="pVietNam" name="position" value="Việt Nam" onChange={handleChange} checked={inputs.position?.includes('Việt Nam')} />
                            <label className="Form-check-label ms-2" htmlFor="pVietNam">Việt Nam</label>
                        </div>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="checkbox" id="pTrungQuoc" name="position" value="Trung Quốc" onChange={handleChange} checked={inputs.position?.includes('Trung Quốc')} />
                            <label className="Form-check-label ms-2" htmlFor="pTrungQuoc">Trung Quốc</label>
                        </div>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="checkbox" id="pChauAu" name="position" value="Châu Âu" onChange={handleChange} checked={inputs.position?.includes('Châu Âu')} />
                            <label className="Form-check-label ms-2" htmlFor="pChauAu">Châu Âu</label>
                        </div>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="checkbox" id="pChauA" name="position" value="Châu Á" onChange={handleChange} checked={inputs.position?.includes('Châu Á')} />
                            <label className="Form-check-label ms-2" htmlFor="pChauA">Châu Á</label>
                        </div>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="checkbox" id="pChauMy" name="position" value="Châu Mỹ" onChange={handleChange} checked={inputs.position?.includes('Châu Mỹ')} />
                            <label className="Form-check-label ms-2" htmlFor="pChauMy">Châu Mỹ</label>
                        </div>
                    </div>
                    <div className="Form-group mb-3">
                        <label className="Form-label">Public</label>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="radio" id="public" name="isPublic" value="true" onChange={handleChange} checked={inputs.isPublic.toString() == "true"} />
                            <label className="Form-check-label ms-2" htmlFor="public">Yes</label>
                        </div>
                        <div className="Form-check htmlForm-check-inline">
                            <input className="Form-check-input" type="radio" id="public2" name="isPublic" value="false" onChange={handleChange} checked={inputs.isPublic.toString() == "false"} />
                            <label className="Form-check-label ms-2" htmlFor="public2">No</label>
                        </div>


                    </div>
                    <div className="row mb-3">

                        <div className="htmlForm-group col-md-6">
                            <label htmlFor="category">Loại</label>
                            <select id="category" name="category" required className="form-select" value={inputs.category || ""} onChange={handleChange}>
                                <option value="" disabled>Select</option>
                                <option value="Du lịch">Du lịch</option>
                                <option value="Ẩm thực">Ẩm thực</option>
                                <option value="Giải trí">Giải trí</option>
                            </select>
                        </div>
                        <div className="htmlForm-group col-md-6">
                            <label htmlFor="publishDate">Ngày public</label>
                            <input type="datetime-local" className="form-control" id="publishDate" name="publishDate" defaultValue={inputs.publishDate || ""} required onChange={handleChange} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer text-center">
                <button type="submit" className="btn btn-success me-2" form="postForm">Submit</button>
                <button type="button" className="btn btn-primary" onClick={resetData}>Clear</button>
            </div>
        </div>

    )
}