import usePosts from "../hooks/usePosts";
import PostTable from "../components/PostTable";




export default function PostList() {

    const { data, setData ,loading } = usePosts();


    return (
        <PostTable data={data} setData={setData} loading={loading}/>
    )
}

