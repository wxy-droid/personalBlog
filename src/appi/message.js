import request from "./request";

// 提交评论
export async function postMessage(commentInfo) {
    return await request.post('/api/message', commentInfo)
}

// 分页获取评论
export async function getMessageType(page = 1, limit = 10) {
    return await request.get('/api/message', {
        params: {
            page,
            limit,
        }
    });
}