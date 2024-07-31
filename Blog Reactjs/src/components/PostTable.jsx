/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import apiService from "../services/apiService";
import { toast } from 'react-toastify';


export default function PostTable({ data, setData, loading }) {

    async function onDeleteHandler(id) {
        var confirm = window.confirm("Delete?");

        if (confirm) {
            const result = await apiService.deleteData(`/api/posts/${id}`);
            if (result) {
                setData(prev => prev.filter(p => p.id != id));
                toast.success("Xoá thành công");
            }
        }
    }

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
        <>
            <div className="card">
                <div className="card-header">
                    List Blog
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Tin</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Vị trí</th>
                                <th scope="col">Ngày public</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loading &&
                                data.map(post =>
                                    <tr key={post.id}>
                                        <td scope="row">{post.id}</td>
                                        <td>{post.title}</td>
                                        <td className="text-center">
                                            {
                                                post.image &&
                                                <img src={`${import.meta.env.VITE_API_HOST}/${post.image}`} className="rounded" height={150}></img>
                                            }
                                        </td>
                                        <td>{post.category}</td>
                                        <td>{post.position.join(', ')}</td>
                                        <td>{dateFormat(post.publishDate, "dd/mm/yyyy")}</td>
                                        <td>
                                            <Link type="button" to={`/edit/${post.id}`} className="btn btn-outline-primary me-1">Edit</Link>
                                            <button type="button" onClick={() => { onDeleteHandler(post.id) }} className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

