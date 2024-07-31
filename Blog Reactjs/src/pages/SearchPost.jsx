import { useSearchParams } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import { useState } from "react";
import PostTable from "../components/PostTable";




export default function SearchPost() {

    let [searchString, setSearchString] = useSearchParams();

    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (searchInput != "") {
            setSearchString({ searchString: searchInput });
        } else {
            setSearchString();
        }
    }

    const { data, setData ,loading } = usePosts(searchString);



    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    Search Blog
                </div>
                <div className="card-body">
                    <form className="flex-column text-center" onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex flex-row align-items-center gap-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" name="searchString" className="form-control" id="title" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <PostTable data={data} setData={setData} loading={loading}/>
        </>
    )
}

