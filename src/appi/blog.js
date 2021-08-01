import request from "./request";

// 博客分类
export async function getblogtypes() {
    return await request.get("/api/blogtype");
}

// 博客文章
// page 当前页面
// limit 页容量
// categoryid 所属分类 -1表示全部
export async function getblogs(page = 1, limit = 10, categoryid = -1) {
    // console.log(page, limit, categoryid)
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            categoryid
        }
    });
}

// 获取单个博客
export async function getblog(id) {
    return await request.get(`/api/blog/${id}`);
}

// 提交评论
export async function postComment(commentInfo) {
    return await request.post('/api/comment', commentInfo)
}

// 分页获取评论
export async function getCommentType(blogid, page = 1, limit = 10) {
    return await request.get('/api/comment', {
        params: {
            page,
            limit,
            blogid
        }
    });
}